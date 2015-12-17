
import {sortByKey} from './sorting';

export function createDividendTableData(portfolio, historical){

  let divvies = {};
  let total = 0;

  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends){
      entry.receivedDividends.forEach(orig_div =>{
        let div = Object.assign({},orig_div);
        div.ticker = entry.ticker;
        div.amount = entry.amount;
        total += (entry.amount * orig_div.price);
        if(!divvies[orig_div.date.format()]) {
          divvies[orig_div.date.format()] = div;
        }else{
          divvies[orig_div.date.format()].amount += entry.amount;
        }
      })
    }
  });

  let divs = Object.keys(divvies).map(key => divvies[key]);
  return sortByKey(divs,'date');

}
