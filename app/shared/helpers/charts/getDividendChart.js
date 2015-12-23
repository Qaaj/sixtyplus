import {round} from '../formatting';
import {sortByKey} from '../sorting';
import assign from 'object-assign';

export function getDividendChart(portfolio, historical, add = false) {

  let info_per_date = {};

  let div_symbols = {};

  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends.length > 0){
      // Use object as a collection so use they keys as unique values
      div_symbols[entry.symbol] = 0;
      entry.receivedDividends.forEach(orig_div =>{
        let div = assign({},orig_div);
        div.date = normaliseDivDate(div.date);
        div.symbol = entry.symbol;
        div.amount = entry.amount;
        let info_for_this_date = info_per_date[div.date];
        if (!info_for_this_date) info_for_this_date = {};
        // Div per symbol
        if (!info_for_this_date[entry.symbol]) info_for_this_date[entry.symbol] = 0;
        info_for_this_date[entry.symbol] += round(div.amount * div.price, 2);
        info_per_date[div.date] = info_for_this_date;

      })
    }
  });

  // Use object as a collection so use they keys as unique values
  div_symbols = Object.keys(div_symbols);

  // Change the info per date object to a iterable array
  let array_of_dates = Object.keys(info_per_date).map(date => {
    return ( {date, data: info_per_date[date]});
  })

  // Add cost base as a 'symbol' so we can parse it with the rest
  let symbols = div_symbols;

  let chart = symbols.map(symbol => {
    let symbol_array = [];
    array_of_dates.forEach(date => {
      let value = round(date.data[symbol]);
      if (!value) value = 0;
      symbol_array.push(value);
    })
    symbol_array.reverse();
    symbol_array.unshift(symbol)
    return symbol_array;
  });


  //THIS CONVERTS TO ACCUMULATIVE DIVIDENDS
  if(add){
    chart = chart.map(arr => {
      let symbol = arr[0];

      let new_arr = arr.reduce((prev,curr) => {
        if(prev.length > 0){
          let previous = prev[prev.length -1];
          if(previous === symbol) previous = 0;
          prev.push(round(curr + previous));
        }else{
          prev.push(symbol);
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

  let styling = getStyling(symbols,portfolio);

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

function getStyling(symbols,portfolio){

  // Set the styles for all the symbols except the Cost Base

  let types = symbols.reduce((prev, curr) => {
    prev[curr] = 'bar';
    return prev;
  }, {});

  types["Cost Base"] = 'bar';

  // Group the symbols together
  let groups = [symbols];

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
