import DataStore from '../stores/DataStore'


export function enhanceStock(stockObject){


  if(stockObject && stockObject.symbol){
    let stockMap = DataStore.getData().stockData;
    let moreInfo = stockMap[stockObject.symbol];

    if(moreInfo){
      stockObject.name = moreInfo.Name;
      stockObject.sector = moreInfo.Sector;
      stockObject.industry = moreInfo.industry;
    }

  }

  return stockObject;
}
