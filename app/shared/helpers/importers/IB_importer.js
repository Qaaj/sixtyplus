import defaults from '../../../client/config/Defaults';
import moment from 'moment';
import StockEntry from '../../../client/classes/StockEntry'

const firstLine = "STK_LOT,account,ticker,name,currency,date,time,amount,commission,price,total,commission_eur".split(",");

export function doImport(rawText) {

  let allStocks = rawText.split("\n").map(singleLine => {
    let obj = singleLine.split("|").reduce((prev, curr, i) => {
      prev[firstLine[i]] = curr;
      return prev;
    }, {});
    if(obj.amount && obj.price && obj.date && obj.ticker) return new StockEntry({
      ticker: obj.ticker,
      amount: parseFloat(obj.amount),
      price: parseFloat(obj.price),
      date: obj.date,
      name: obj.name
    });
  });

  allStocks = allStocks.filter(entry =>{
    if(entry && entry.amount && entry.price && entry.date && entry.ticker) return 1;
  })


  console.log(allStocks);

  return allStocks;
}
