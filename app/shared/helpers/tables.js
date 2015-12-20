
import {sortByKey} from './sorting';

export function createDividendTableData(portfolio, historical){

  let divvies = {};

  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends){
      entry.receivedDividends.forEach(orig_div =>{
        let div = Object.assign({},orig_div);
        div.ticker = entry.ticker;
        div.amount = entry.amount;
        if(!divvies[orig_div.date.format()]) {
          divvies[orig_div.date.format()] = div;
        }else{
          divvies[orig_div.date.format()].amount += entry.amount;
        }
      })
    }
  });

  let divs = Object.keys(divvies).map(key => divvies[key]);
  console.log(divs);
  return sortByKey(divs,'date');

}
