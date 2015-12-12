import StockEntryCollection from './StockEntryCollection';
import HistoricalData from '../stores/HistoricalStore';
import HistoricalActions from '../actions/HistoricalActionCreators';
class StockPortfolio {

  constructor(rawUserDataObject) {
    this.entryCollectionList = [];
    for (let key in rawUserDataObject) {
      this.entryCollectionList.push(new StockEntryCollection(rawUserDataObject[key]));
    }
    // Get dividend info for existing portfolio
    this.flatTickerList.forEach(ticker =>{
      HistoricalActions.getHistoricalDividends({ ticker});
      HistoricalActions.getHistoricalPrices({ ticker, options:'monthly', from:"01-01-2015"});
    });
  }

  checkIfCollectionExists(newEntryCollection){
    let existingCollection = this.entryCollectionList.filter(currentEntryCollection =>{
      if(currentEntryCollection.ticker === newEntryCollection.ticker) {
        currentEntryCollection.addEntries(newEntryCollection.entries);
        return 1;
      }
    })

    if(existingCollection.length > 0) return true;
    return false;

  }

  getEntryCollectionByTicker(ticker){
    return this.entryCollectionList.filter(entries =>{
      if(entries.ticker === ticker) return true;
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

    portfolio.costBase = Math.round((portfolio.costBase) * 100) / 100;
    portfolio.marketValue = Math.round((portfolio.marketValue) * 100) / 100;
    portfolio.totalReturns = Math.round((portfolio.totalReturns) * 100) / 100;
    portfolio.profitLoss = Math.round((portfolio.profitLoss) * 100) / 100;
    portfolio.percent_change = Math.round((portfolio.percent_change) * 100) / 100;
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

  get flatTickerList(){
    return Object.keys(this.userDataObject);
  }

  get chartData(){

  }

  get userDataObject() {

    // THIS IS THE DATA THAT WILL BE SAVED TO THE BACKEND
    let portfolio = {};
    this.entryCollectionList.map((entryCollection) => {
      portfolio[entryCollection.ticker] = entryCollection.entries.map(entry => {
        let final = {};
        final.ticker = entry.ticker;
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
