
import {sortByKey} from './sorting';
import {round} from './formatting';
import assign from 'object-assign';

export function createDividendTableData(portfolio){

  let divvies = {};


  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends && entry.receivedDividends.length > 0){

      entry.receivedDividends.forEach(orig_div =>{
        let div = assign({},orig_div);
        let date = entry.symbol + orig_div.date.format("YYYY-MM-DD");
        div.symbol = entry.symbol;
        div.amount = round(entry.amount);
        if(!divvies[date]) {
          divvies[date] = div;
        }else{
          divvies[date].amount += entry.amount;
        }
      })
    }

  });

  let divs = Object.keys(divvies).map(key => divvies[key]);
  return sortByKey(divs,'date');

}
