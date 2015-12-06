import fs from 'fs';
import {CSVtoJSON} from '../server/helpers/json'


export function createMappedJSON(){

  fs.readFile(__dirname + '/../static/us_stocks.csv', function (err, data) {
    if (err) {
      throw err;
    }

    data = data.toString().replace(/['"]+/g, '|');

    let allStocks = data.split("\n");

    let firstLine = allStocks[0].slice(0, -1).split('|,|');
    firstLine = firstLine.map(el => {
      return el.replace(/['|]+/g, '').replace(/[']+/g, '');
    })

    allStocks = allStocks.splice(1);
    let mappedStocks = {};

    allStocks.map(singleLine => {
      let singleStock = singleLine.slice(0, -1).split("|,|").reduce((prev, curr, i) => {
        if (i !== 2 && i !== 3 && i !== 4 && i !== 7) prev[firstLine[i]] = curr.replace(/['|]+/g, '').replace(/'/g, '"');
        return prev;
      }, {});
      mappedStocks[singleStock.Symbol] = singleStock;
    });

    fs.writeFile(__dirname + '/../static/mapped_stocks.json', JSON.stringify(mappedStocks), function(err) {
      if(err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });


  });
}



let counter = 0;
let tickers = [];


export function parseTickerCSVs(){
  fs.readFile(__dirname + '/../static/all_tickers.json', function (err, data) {
    if (err) {
      throw err;
    }

    data = JSON.parse(data);
    tickers = data.tickers;
    tickers = tickers.filter(ticker =>{
      if(ticker.indexOf("^") == -1) return ticker;
    })


    //let list = ['AAPL','ABBV'];


    doTicker(tickers[counter]);


  });
}


function doTicker(ticker){

  console.log('doing ticker', ticker);
  fs.readFile(__dirname + '/../static/data/' + ticker + '.csv',"utf-8", function (err, data) {
    if (err) {
      console.log(err);
      counter++;
      doTicker(tickers[counter]);
    }
    if(data.indexOf('html') === -1) {
      let entries = JSON.parse(CSVtoJSON(data));


      let orderedData = {}

      entries.map((entry, i) => {
        //if(i ===7423) console.log(entry);
        let date = entry.Date.split("-");
        let year = date[0];
        let month = date[0] + '-' + date[1];
        if (!orderedData[year]) orderedData[year] = [];
        orderedData[year].push(entry);
        if (!orderedData[month]) orderedData[month] = [];
        orderedData[month].push(entry);
      })

      let keys = Object.keys(orderedData);

      let string = 'Date,avg,low,high,adjusted_avg,adj_low,adj_high'
      keys.map(key => {
        if (key) {
          let average = calculateAverage(orderedData[key]);
          string += '\n' + key + ',' + average.total + ',' + average.realMin + ',' + average.realMax + ',' + average.adj_total + ',' + average.min + ',' + average.max;
        }
      })

      fs.writeFile(__dirname + '/analysed/' + ticker + '.csv', string, function (err) {
        if (err) {
           console.log(err);
          counter++;
          doTicker(tickers[counter]);
        }
        console.log(ticker + ' saved. (' + counter + '/' + tickers.length + ')');
        counter++;
        setTimeout(()=>{doTicker(tickers[counter])},200);
      });

    }else{
      counter++;
      doTicker(tickers[counter]);
    }
  });
}

function calculateAverage(month){

  let min = 1000000000;
  let max = 0;
  let total = 0;
  let adj_total =0;
  let realMin = 0;
  let realMax = 0;

  let length = month.length;
  month.map(day =>{
    let adj_close = parseFloat(day['Adj Close']);
    let adj_close_perc = adj_close / day.Close;

    let adj_max = adj_close_perc * day.High;
    let adj_min = adj_close_perc * day.Low;

    adj_total += parseFloat(adj_close);
    total += parseFloat(day['Close']);

    if(adj_max > max) {
      max = adj_max;
      realMax = day.High;
    }
    if(adj_min < min) {
      min = adj_min;
      realMin = day.Low;
    }
  })

  total = total/length;
  adj_total = adj_total/length;

  return {total, adj_total, max, min, realMax, realMin};

}


