
export function filterSymbols(entries, filter){
  if(!filter || filter == "all") return entries;
  if(filter === 'profit'){
    return entries.filter(entry => {if(entry.performance.profitLoss >= 0) return 1});
  }
  if(filter === 'loss'){
    return entries.filter(entry => {if(entry.performance.profitLoss < 0) return 1});
  }
}
