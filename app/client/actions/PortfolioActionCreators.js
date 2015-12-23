import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserStore from '../stores/UserStore.js';
import { addEntry } from '../utils/api/PortfolioAPI';


var PortfolioActionCreators = {

  addStockEntryCollections(entry_collections, resultObject){

    if( !Array.isArray(entry_collections) ) entrycollection = [entry_collections];

    entry_collections.forEach(entryCollection =>{
      entryCollection.entries.forEach(entry => {
        this.addStockEntry({
          symbol: entry.ticker,
          amount: entry.amount,
          price: entry.price,
          date: entry.date.format('YYYY-MM-DD'),
        },resultObject);
      })
    })

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
