import {round} from '../formatting';
import {sortByKey} from '../sorting';
import d3 from 'd3';
import numeral from 'numeral';
import stack from '../../utils/stack';


/**
 * @portfolio {StockPortfolio} somebody Somebody's name.
 * @historical {Array} Historical data.
 * @compound_divs {Boolean} Compound divs?.
 * @filterdataByTicker {Array} Tickername to filter chart results by.
 */
export function getPortfolioChart(portfolio, historical, compound_divs, filterByTickersArray = null) {

  let tickers;
  console.log(filterByTickersArray);
  if ( filterByTickersArray ){
    tickers = portfolio.flatTickerList.filter(function (ticker) {
      return filterByTickersArray.indexOf(ticker) > -1;
    });
  }else{
    tickers = portfolio.flatTickerList;
  }

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
      info_for_this_date[ticker] = round(res);
      info_per_date[date] = info_for_this_date;
    });

  });

  // Change the info per date object to a iterable array
  let array_of_dates = Object.keys(info_per_date).map(date => {
    return ( {date, data: info_per_date[date]});
  })

  // Add cost base as a 'ticker' so we can parse it with the rest
  tickers.push("Cost Base");

  const chart = tickers.map(ticker => {
    let ticker_array = [];
    array_of_dates.forEach(date => {
      let value = date.data[ticker];
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

  // Styling
  let styling = getStyling(tickers,portfolio);

  return {columns, ...styling};

}

function getStyling(tickers,portfolio){

  // Set the styles for all the tickers except the Cost Base
  let types = tickers.reduce((prev, curr) => {
    prev[curr] = 'area-spline';
    return prev;
  }, {});

  types["Cost Base"] = 'bar';

  // Group the tickers together
  let groups = [["Cost Base"], portfolio.flatTickerList];

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
        format: function (d) { return numeral(d).format('$ 0,0.00'); }
      }
    }
  }

  return {groups,types,colors, axis, color};
}
