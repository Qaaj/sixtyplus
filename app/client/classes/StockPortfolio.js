import StockEntryCollection from './StockEntryCollection';
import StockEntry from './StockEntry';
import HistoricalData from '../stores/HistoricalStore';
import HistoricalActions from '../actions/HistoricalActionCreators';
import {round} from '../../shared/helpers/formatting';
import {getStockNews} from '../api/StockAPI';

class StockPortfolio {

  constructor(rawUserDataObject) {

    this.entryCollectionList = [];

    let entriesPerSymbol = {};

    rawUserDataObject.map(entry =>{
      let stockEntry = new StockEntry(entry);
      if(!entriesPerSymbol[entry.symbol]) entriesPerSymbol[entry.symbol] = []
      entriesPerSymbol[entry.symbol].push(stockEntry);
    })

    for (let key in entriesPerSymbol) {
      this.entryCollectionList.push(new StockEntryCollection(entriesPerSymbol[key]));
    }

    let firstBuy = this.entryCollectionList.reduce((prev,curr) =>{
      if(curr.firstBuyEntry.isBefore(prev)) prev = curr.firstBuyEntry;
      return prev;
      }, moment('29991212','YYYYMMDD'));

    let minusOneMonth = firstBuy.clone().subtract(1, 'months');

    // TODO: Move this logic out of here
    // Get dividend info for existing portfolio
    getStockNews(this.flatsymbolList);
    HistoricalActions.getHistoricalPrices({ symbol:'VTI', options:'monthly'});

    this.flatsymbolList.forEach(symbol =>{
      HistoricalActions.getHistoricalDividends({ symbol});
      HistoricalActions.getHistoricalPrices({ symbol, options:'monthly', from:minusOneMonth.format("DD-MM-YYYY")});
    });
  }

  checkIfCollectionExists(newEntryCollection){
    let existingCollection = this.entryCollectionList.filter(currentEntryCollection =>{
      if(currentEntryCollection.symbol === newEntryCollection.symbol) {
        currentEntryCollection.addEntries(newEntryCollection.entries);
        return 1;
      }
    })

    if(existingCollection.length > 0) return true;
    return false;

  }

  getEntryCollectionBysymbol(symbol){
    return this.entryCollectionList.filter(entries =>{
      if(entries.symbol === symbol) return true;
    })[0];
  }

  addStockEntryCollection(stockEntryCollection){

    let newEntryCollection = stockEntryCollection.filter(newEntries =>{
      if(!this.checkIfCollectionExists(newEntries)) return newEntries;
    })

    if(newEntryCollection.length > 0) this.entryCollectionList = this.entryCollectionList.concat(newEntryCollection);
  }

  finishStatCalculations(portfolio){

    portfolio.profitLoss = portfolio.totalReturns - portfolio.costBase;
    portfolio.percent_change = 100 * (portfolio.profitLoss / portfolio.costBase)

    portfolio.costBase = round(portfolio.costBase);
    portfolio.marketValue = round(portfolio.marketValue);
    portfolio.totalReturns = round(portfolio.totalReturns);
    portfolio.profitLoss = round(portfolio.profitLoss);
    portfolio.percent_change = round(portfolio.percent_change);
    portfolio.percent_change_string = portfolio.percent_change + '%';

    return portfolio;
  }

  get collectionList() {
    return this.entryCollectionList;
  }


  get portfolioStats() {

    let portfolio = this.entryCollectionList.reduce((prev, curr) => {
      prev.costBase += curr.costBase;
      prev.marketValue += curr.marketValue;
      prev.totalReturns += curr.marketValue;
      return prev;
    }, {costBase: 0, marketValue: 0, totalReturns: 0});

    portfolio = this.finishStatCalculations(portfolio)

    return portfolio;
  }

  get portfolioStatsWithDividends(){

    let portfolio = this.entryCollectionList.reduce((prev, curr) => {
      prev.costBase += curr.costBase;
      prev.marketValue += curr.marketValue;
      prev.totalReturns += curr.marketValue;
      if(curr.total_dividends) prev.totalReturns +=  curr.total_dividends;
      return prev;
    }, {costBase: 0, marketValue: 0, totalReturns: 0});

    portfolio = this.finishStatCalculations(portfolio)

    return portfolio;
  }

  get flatsymbolList(){
    return Object.keys(this.userDataObject);
  }

 get allStockEntries() {
   let list = [];
   this.collectionList.forEach(collection => {
     list = list.concat(collection.entries);
   })
   return list;
 }

  get userDataObject() {

    // THIS IS THE DATA THAT WILL BE SAVED TO THE BACKEND
    let portfolio = {};
    this.entryCollectionList.map((entryCollection) => {
      portfolio[entryCollection.symbol] = entryCollection.entries.map(entry => {
        let final = {};
        final.symbol = entry.symbol;
        final.price = entry.price;
        final.amount = entry.amount;
        final.date = entry.date.format();
        return final;
      })
    });

    return portfolio;
  }
}

export default StockPortfolio;
