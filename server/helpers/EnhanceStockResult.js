import DataStore from '../stores/DataStore'


export function enhanceStock(stockObject) {


  if (stockObject && stockObject.symbol) {
    let stockMap = DataStore.getData().stockData;
    let moreInfo = stockMap[stockObject.symbol];

    if (moreInfo) {
      stockObject.name = moreInfo.Name;
      stockObject.sector = moreInfo.Sector;
      if (!moreInfo.Sector || moreInfo.Sector === "") stockObject.sector = 'na';
      stockObject.industry = moreInfo.industry;
    } else {
      stockObject.sector = 'N/A';
      stockObject.industry = 'N/A';
    }

  }

  return stockObject;
}
