import AppDispatcher from '../dispatcher/AppDispatcher.js';
import RealTimeActionCreators from '../actions/RealTimeActionCreators';
import HistoricalActions from '../actions/HistoricalActionCreators';
import UserStore from '../stores/UserStore.js';
import { addEntry } from '../utils/api/PortfolioAPI';


var PortfolioActionCreators = {

  addStockEntryCollections(entry_collections, resultObject){

    if( !Array.isArray(entry_collections) ) entrycollection = [entry_collections];

    let listOfTickers = entry_collections.map(entryCollection =>{
      entryCollection.entries.forEach(entry => {
        this.addStockEntry({
          symbol: entry.ticker,
          amount: entry.amount,
          price: entry.price,
          date: entry.date.format('YYYY-MM-DD'),
        },resultObject);
      })
      return entryCollection.ticker;
    });

     //Get extensive stock data
    RealTimeActionCreators.getStockData(listOfTickers);
    
    listOfTickers.forEach(ticker =>{
      HistoricalActions.getHistoricalDividends({ticker});
      HistoricalActions.getHistoricalPrices({ ticker, options:'monthly', from:"01-01-2012"});
    });

  },

  addStockEntry({ symbol, amount, price, date, currency = 'USD', isBuy = true}, resultObject){
    let data = {
      "symbol": symbol,
      "amount": amount,
      "date": date,
      "price": price,
      "currency": currency,
      "isBuy": isBuy,
    }

    data.uid = UserStore.getUser().objectId;
    data.type = "STOCK";

    addEntry(data,resultObject);

  },

};

export default PortfolioActionCreators;
