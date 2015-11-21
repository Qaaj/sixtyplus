import fs from 'fs';

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
