import StockSymbol from './StockSymbol';
import StockEntry from './StockEntry';
import HistoricalData from '../stores/HistoricalStore';
import {round} from '../../shared/helpers/formatting';
import { Map, fromJS } from 'immutable';
let _symbolMap = new Map();


class StockPortfolio {

  constructor(rawUserDataObject) {

    this.mapEntriesBySymbol(rawUserDataObject);
  }

  updateHistoricalPrices({symbol,option,result}) {
    let stockSymbol = _symbolMap.get(symbol);
    if (stockSymbol) {
      let newSS = StockSymbol.copy(stockSymbol);  // Create a copy of the symbol class for the immutability
      newSS[option] = JSON.parse(result);
      _symbolMap = _symbolMap.set(symbol, newSS);
    }
  }

  updatePortfolioWithRTData(data) {
    let stockSymbol = _symbolMap.get(data.symbol);
    if (stockSymbol) {
      let newSS = StockSymbol.copy(stockSymbol);  // Create a copy of the symbol class for the immutability
      newSS.updateEntriesWithRTData(data);
      _symbolMap = _symbolMap.set(data.symbol, newSS);
    }
  }

  updatePortfolioWithDividends(symbol, dividends) {
    let stockSymbol = _symbolMap.get(symbol);
    if (stockSymbol) {
      let newSS = StockSymbol.copy(stockSymbol);  // Create a copy of the symbol class for the immutability
      newSS.calculateDividends({dividends});
      _symbolMap = _symbolMap.set(symbol, newSS);
    }
  }

  mapEntriesBySymbol(data) {
    data.map(entry => {
      let stockEntry = new StockEntry(entry);
      if (!_symbolMap.get(entry.symbol)) {
        _symbolMap = _symbolMap.set(entry.symbol, new StockSymbol(entry.symbol));
      }
      _symbolMap.get(entry.symbol).addEntry(stockEntry);
    });
  }

  get allStockEntries() {
    let list = [];
    _symbolMap.forEach(symbol => {
      list = list.concat(symbol.entries.toJS());
    })
    return list;
  }

  get symbols() {
    return _symbolMap;
  }

  get symbolsArray() {
    return _symbolMap.toArray();
  }

  getSymbol(symbol) {
    return _symbolMap.get(symbol);
  }

  get flatsymbolList() {
    return Object.keys(_symbolMap.toJS());
  }

  get firstBuyDate(){
    let firstBuy = this.symbolsArray.reduce((prev, curr) => {
      if (curr.firstBuyEntry.isBefore(prev)) prev = curr.firstBuyEntry;
      return prev;
    }, moment('29991212', 'YYYYMMDD'));

    let minusOneMonth = firstBuy.clone().subtract(1, 'months');
    return minusOneMonth;
  }

  portfolioStats(withDiv = false) {

    let performance = 'performance';
    if(withDiv) performance = 'performanceWithDividends'

    let portfolio = this.symbols.reduce((prev, curr) => {
      prev.costBase += curr[performance].costBase;
      prev.marketValue += curr[performance].marketValue;
      prev.totalReturns += curr[performance].costBase + curr[performance].profitLoss;
      return prev;
    }, {costBase: 0, marketValue: 0, totalReturns: 0});

    portfolio.profitLoss = round(portfolio.totalReturns - portfolio.costBase);
    portfolio.percent_change = round(100 * (portfolio.profitLoss / portfolio.costBase));

    portfolio.costBase = round(portfolio.costBase);
    portfolio.marketValue = round(portfolio.marketValue);
    portfolio.totalReturns = round(portfolio.totalReturns);
    portfolio.percent_change_string = portfolio.percent_change + '%';

    return portfolio;
  }

}

export default StockPortfolio;
