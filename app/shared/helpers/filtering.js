
export function filterStockEntries(entries, filter){
  if(!filter || filter == "All") return entries;
  if(filter === 'Profit'){
    return entries.filter(entry => {if(entry.profitLoss >= 0) return 1});
  }
  if(filter === 'Loss'){
    return entries.filter(entry => {if(entry.profitLoss < 0) return 1});
  }
}
