import {round} from '../formatting';
import {sortByKey} from '../sorting';

export function getProfitLossChart(portfolio, historical) {

  let tickers = portfolio.flatTickerList;
  let info_per_date = {};

  // Go over all the tickers and collect their value per month
  tickers.forEach(ticker => {

    // get the current monthly prices of this ticke. curr = ticker
    let monthly = JSON.parse(historical[ticker].monthly);

    //  get all of the data for this ticker
    monthly.forEach(month => {

      // Normalised Date (Some dates are on a different day of the month)
      let date = month.Date.substring(0, 7) + '-01';
      // Amount of stock at that date
      let amount = portfolio.getEntryCollectionByTicker(ticker).getAmountAtDate(month);
      // Price of the stock at that date
      let res = amount * parseFloat(month['Adj Close']);

      // Save this information for this stock in an object holding data for all the stocks on that date
      let info_for_this_date = info_per_date[date];
      if (!info_for_this_date) info_for_this_date = {};
      if (!info_for_this_date['Cost Base']) info_for_this_date['Cost Base'] = 0;
      info_for_this_date['Cost Base'] += round(portfolio.getEntryCollectionByTicker(ticker).getAmountAtDate(month) * portfolio.getEntryCollectionByTicker(ticker).averagePrice, 2);
      if(!info_for_this_date['P&L']) info_for_this_date['P&L'] = 0;
      info_for_this_date['P&L'] += round(res);
      info_per_date[date] = info_for_this_date;
    });

  });

  // Change the info per date object to a iterable array
  let array_of_dates = Object.keys(info_per_date).map(date => {
    let thisdate = info_per_date[date];
    let costBase = thisdate['Cost Base'];
    let PL = thisdate['P&L'];
    let percent = round( 100 * (PL - costBase) / costBase)
    return ( {date, percent});
  })

  // Add cost base as a 'ticker' so we can parse it with the rest
  tickers = ['P&L']

  const chart = tickers.map(ticker => {
    let ticker_array = [];
    array_of_dates.forEach(date => {
      let value = date.percent;
      if (!value) value = 0;
      ticker_array.push(value);
    })
    ticker_array.reverse();
    ticker_array.unshift(ticker)
    return ticker_array;
  });


  // Set up the labels for the x-axis
  let month_labels = Object.keys(info_per_date);
  month_labels.reverse();
  month_labels.unshift('x');
  let columns = [month_labels];
  columns = columns.concat(chart);

  let styling = getStyling(tickers,portfolio);

  return {columns, ...styling};

}

function getStyling(tickers,portfolio){

  // Set the styles for all the tickers except the Cost Base

  let types = tickers.reduce((prev, curr) => {
    prev[curr] = 'line';
    return prev;
  }, {});


  // Group the tickers together
  let groups = [portfolio.flatTickerList];

  let color = function (color,object) {
    if(object.value < 0) return '#DD332A';
    if(object.value > 0) return '#77ad1a';
    return d3.rgb(200, 200, 200);
  };

  // Set the colour for the Cost Base
  let colors = {
    "P&L": '#0277BD',
  }

  let labels = {
    format: {
      'P&L': (v) => v+'%'
      }
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
        format: function (d) { return d + " %"; }
      }
    }
  }

  return {groups,types,colors, axis, color};
}
