
export function filterStockEntries(entries, filter){
  if(!filter || filter == "all") return entries;
  if(filter === 'profit'){
    return entries.filter(entry => {if(entry.profitLoss >= 0) return 1});
  }
  if(filter === 'loss'){
    return entries.filter(entry => {if(entry.profitLoss < 0) return 1});
  }
}
