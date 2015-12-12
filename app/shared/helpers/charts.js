
export function getMonthlyChart(portfolio,historical){

  let tickers = portfolio.flatTickerList;


  let chart = tickers.reduce((prev,curr) =>{

    let monthly = JSON.parse(historical[curr].monthly);


    let tickr = monthly.map(month =>{
      let amount = portfolio.getEntryCollectionByTicker(curr).getAmountAtDate(month);
      let res =  amount * parseFloat(month['Adj Close']);
      res = Math.round((res) * 10) / 10;

      return res;
    });

    tickr.reverse();
    tickr.unshift(curr);

    prev.push(tickr);
    return prev;

  },[]);

  let maxMonths = 0;
  chart.forEach(months =>{
    if(months.length > maxMonths) maxMonths = months.length;
  })

  chart = chart.map(month =>{
    while(month.length < maxMonths){
      month.unshift(0);
    }
    return month;
  })

  let monthly = JSON.parse(historical[tickers[0]].monthly);

  let labels =  monthly.map(month =>{
    return month['Date'];
  });

  labels.reverse();
  labels.unshift('x');

  let columns = [labels];
  columns = columns.concat(chart);

  let types = tickers.reduce((prev,curr) =>{
    prev[curr] = 'area-spline';
    return prev;
  },{});

  let groups  = [portfolio.flatTickerList];

  return {columns,types,groups};
}
