
export function createDividendTableData(portfolio, historical){
  let divvies = [];
  portfolio.allStockEntries.forEach(entry =>{
    if(entry.receivedDividends) entry.receivedDividends.forEach(div =>{
      div.ticker = entry.ticker;
      div.amount = entry.amount;
      divvies.push(div);
    })
  });
  return divvies;
}
