
export function getStockEntriesData(entries,rt){

  let data = {};
  let ticker = entries[0].name;

  if(rt && rt[ticker]){
    data.sector = rt[ticker].sector;
    data.price = rt[ticker].lastTradePriceOnly;
  }

  data.totalAmount = 0;
  data.totalPrice = 0;

  entries.map((entry, i) => {
    data.totalPrice += (entry.price * entry.amount);
    data.totalAmount += entry.amount;
  });

  data.averagePrice = Math.round((data.totalPrice / data.totalAmount) * 100) / 100;
  data.profitLoss = (data.price * data.totalAmount) - data.totalPrice;
  data.profitLoss = Math.round((data.profitLoss) * 100) / 100;
  if (data.price == 0)  data.profitLoss = "N/A";
  data.name = entries[0].name;

  return data;
}
