import {round} from '../formatting';
import {sortByKey} from '../sorting';
import assign from 'object-assign';

export function getDividendChart(portfolio, historical, add = false) {

  let info_per_date = {};

  let div_tickers = {};

  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends.length > 0){
      // Use object as a collection so use they keys as unique values
      div_tickers[entry.ticker] = 0;
      entry.receivedDividends.forEach(orig_div =>{
        let div = assign({},orig_div);
        div.date = normaliseDivDate(div.date);
        div.ticker = entry.ticker;
        div.amount = entry.amount;
        let info_for_this_date = info_per_date[div.date];
        if (!info_for_this_date) info_for_this_date = {};
        // Div per ticker
        if (!info_for_this_date[entry.ticker]) info_for_this_date[entry.ticker] = 0;
        info_for_this_date[entry.ticker] += round(div.amount * div.price, 2);
        info_per_date[div.date] = info_for_this_date;

      })
    }
  });

  // Use object as a collection so use they keys as unique values
  div_tickers = Object.keys(div_tickers);

  // Change the info per date object to a iterable array
  let array_of_dates = Object.keys(info_per_date).map(date => {
    return ( {date, data: info_per_date[date]});
  })

  // Add cost base as a 'ticker' so we can parse it with the rest
  let tickers = div_tickers;

  let chart = tickers.map(ticker => {
    let ticker_array = [];
    array_of_dates.forEach(date => {
      let value = round(date.data[ticker]);
      if (!value) value = 0;
      ticker_array.push(value);
    })
    ticker_array.reverse();
    ticker_array.unshift(ticker)
    return ticker_array;
  });


  //THIS CONVERTS TO ACCUMULATIVE DIVIDENDS
  if(add){
    chart = chart.map(arr => {
      let ticker = arr[0];

      let new_arr = arr.reduce((prev,curr) => {
        if(prev.length > 0){
          let previous = prev[prev.length -1];
          if(previous === ticker) previous = 0;
          prev.push(round(curr + previous));
        }else{
          prev.push(ticker);
        }
        return prev;
      },[]);
      return new_arr;
    });
  }


  // Set up the labels for the x-axis
  let month_labels = Object.keys(info_per_date);
  month_labels.reverse();
  month_labels.unshift('x');
  let columns = [month_labels];
  columns = columns.concat(chart);

  let styling = getStyling(tickers,portfolio);

  return {columns, ...styling};

}

function normaliseDivDate(date){
  // Group per Q
  if(date.month() < 3) return date.format('YYYY' + '-03-01');
  if(date.month() < 6) return date.format('YYYY' + '-06-01');
  if(date.month() < 9) return date.format('YYYY' + '-09-01');
  if(date.month() < 12) return date.format('YYYY' + '-12-01');
  // Group per year
  return date.format('YYYY' + '-01-01');
}

function getStyling(tickers,portfolio){

  // Set the styles for all the tickers except the Cost Base

  let types = tickers.reduce((prev, curr) => {
    prev[curr] = 'bar';
    return prev;
  }, {});

  types["Cost Base"] = 'bar';

  // Group the tickers together
  let groups = [tickers];

  let color = {};
  // Set the colour for the Cost Base
  let colors = {
    "Cost Base": d3.rgb(230, 230, 230),
  }

  let axis = {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m'
      }
    },
    y : {
      tick: {
        format: function (d) { return "$ " + d; }
      }
    }
  }

  return {groups,types,colors, axis, color};
}
