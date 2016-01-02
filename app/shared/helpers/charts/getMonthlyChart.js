import {round} from '../formatting';
import {sortByKey} from '../sorting';
import d3 from 'd3';

export function getMonthlyChart(portfolio, historical) {

  let symbols = portfolio.flatsymbolList;
  let info_per_date = {};

  // Go over all the symbols and collect their value per month
  symbols.forEach(symbol => {

    // get the current monthly prices of this ticke. curr = symbol
    let monthly = JSON.parse(historical[symbol].monthly);

    //  get all of the data for this symbol
    monthly.forEach(month => {

      let symbolClass = portfolio.getSymbol(symbol);
      // Normalised Date (Some dates are on a different day of the month)
      let date = month.Date.substring(0, 7) + '-01';
      // Amount of stock at that date
      let amount = symbolClass.getAmountAtDate(month);
      // Price of the stock at that date
      let res = amount * parseFloat(month['Adj Close']);

      // Save this information for this stock in an object holding data for all the stocks on that date
      let info_for_this_date = info_per_date[date];
      if (!info_for_this_date) info_for_this_date = {};
      if (!info_for_this_date['Cost Base']) info_for_this_date['Cost Base'] = 0;
      info_for_this_date['Cost Base'] += round(symbolClass.getAmountAtDate(month) * symbolClass.getAveragePriceAtDate(month), 2);
      info_for_this_date[symbol] = round(res);
      info_per_date[date] = info_for_this_date;
    });

  });

  // Change the info per date object to a iterable array
  let array_of_dates = Object.keys(info_per_date).map(date => {
    return ( {date, data: info_per_date[date]});
  })

  // Add cost base as a 'symbol' so we can parse it with the rest
  symbols.push("Cost Base");

  const chart = symbols.map(symbol => {
    let symbol_array = [];
    array_of_dates.forEach(date => {
      let value = date.data[symbol];
      if (!value) value = 0;
      symbol_array.push(value);
    })
    symbol_array.reverse();
    symbol_array.unshift(symbol)
    return symbol_array;
  });

  // Set up the labels for the x-axis
  let month_labels = Object.keys(info_per_date);
  month_labels.reverse();
  month_labels.unshift('x');
  let columns = [month_labels];
  columns = columns.concat(chart);

  return {columns, symbols, portfolio};

}
