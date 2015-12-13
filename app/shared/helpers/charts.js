import {round} from './formatting'


export function getMonthlyChart(portfolio, historical) {

  let tickers = portfolio.flatTickerList;

  let allDates = {};
  let chart = tickers.reduce((prev, curr) => {

    // get the current monthly prices of this ticke. curr = ticker
    let monthly = JSON.parse(historical[curr].monthly);

    let obj = {};

    //  get all of the data for this ticker
    let all_ticker_data = monthly.map(month => {
      let amount = portfolio.getEntryCollectionByTicker(curr).getAmountAtDate(month);
      let res = amount * parseFloat(month['Adj Close']);
      obj.ticker = curr;
      obj[month.Date.substring(0,7)] = res;
      // gather all the dates in an object so we can extract the keys
      if (!allDates[month.Date]) allDates[month.Date] = 0;
      allDates[month.Date] += round(portfolio.getEntryCollectionByTicker(curr).getAmountAtDate(month) * portfolio.getEntryCollectionByTicker(curr).averagePrice);
      res = round(res, 1);

      return res;
    });
  console.log(obj);

    all_ticker_data.reverse();
    all_ticker_data.unshift(curr);

    prev.push(all_ticker_data);
    return prev;

  }, []);

  var sortedDates = Object.keys(allDates).sort((a,b)=> {
    if(a > b) return 1;
    return -1;
  });

  //console.log(sortedDates);

  var vals = sortedDates.map(function (key) {
    return allDates[key];
  });

  vals.unshift("Cost Base");

  //console.log(Object.keys(allDates));

  chart.push(vals);

  // total amount of months we have
  let maxMonths = 0;
  chart.forEach(months => {
    if (months.length > maxMonths) maxMonths = months.length;
  })

  // insert a zero if no info is available for this month
  chart = chart.map(month => {
    while (month.length < maxMonths) {
      month.splice(1,0,0);
    }
    return month;
  })

  let monthly = JSON.parse(historical[tickers[0]].monthly);

  let labels = monthly.map(month => {
    return month['Date'];
  });

  labels.reverse();
  labels.unshift('x');

  let columns = [labels];
  columns = columns.concat(chart);

  let types = tickers.reduce((prev, curr) => {
    prev[curr] = 'area-spline';
    return prev;
  }, {});

  types["Cost Base"] = 'bar';

  console.log(chart);

  let groups = [portfolio.flatTickerList,["Cost Base"]];

  return {columns, types, groups};
}
