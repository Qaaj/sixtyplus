import StockEntryCollection from './StockEntryCollection';
import StockSymbol from './StockSymbol';
import StockEntry from './StockEntry';
import HistoricalData from '../stores/HistoricalStore';
import HistoricalActions from '../actions/HistoricalActionCreators';
import {round} from '../../shared/helpers/formatting';
import {getStockNews} from '../api/StockAPI';
import { Map, fromJS } from 'immutable';
let _symbolMap = new Map();


class StockPortfolio {

  constructor(rawUserDataObject) {

    this.mapEntriesBySymbol(rawUserDataObject);


    let firstBuy = this.symbolsArray.reduce((prev, curr) => {
      if (curr.firstBuyEntry.isBefore(prev)) prev = curr.firstBuyEntry;
      return prev;
    }, moment('29991212', 'YYYYMMDD'));

    let minusOneMonth = firstBuy.clone().subtract(1, 'months');

    // TODO: Move this logic out of here
    // Get dividend info for existing portfolio
    getStockNews(this.flatsymbolList);

    this.flatsymbolList.forEach(symbol => {
      HistoricalActions.getHistoricalDividends({symbol});
      HistoricalActions.getHistoricalPrices({symbol, options: 'monthly', from: minusOneMonth.format("DD-MM-YYYY")});
    });
  }

  updateHistoricalPrices({symbol,option,result}) {
    let stockSymbol = _symbolMap.get(symbol);
    if (stockSymbol) {
      stockSymbol[option] = JSON.parse(result);
      _symbolMap = _symbolMap.set(symbol, stockSymbol);
    }
    _symbolMap = fromJS(_symbolMap.toJS()); // More information came in so force an immutable redraw
  }

  updatePortfolioWithRTData(data) {
    let stockSymbol = _symbolMap.get(data.symbol);
    if (stockSymbol) {
      stockSymbol.updateEntriesWithRTData(data);
      _symbolMap = _symbolMap.set(data.symbol, stockSymbol);
    }
    _symbolMap = fromJS(_symbolMap.toJS());
  }

  updatePortfolioWithDividends(symbol, dividends) {
    let stockSymbol = _symbolMap.get(symbol);
    if (stockSymbol) {
      stockSymbol.calculateDividends({dividends});
      _symbolMap = _symbolMap.set(symbol, stockSymbol);
    }
    _symbolMap = fromJS(_symbolMap.toJS());
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


  finishStatCalculations(portfolio) {

    portfolio.profitLoss = round(portfolio.totalReturns - portfolio.costBase);
    portfolio.percent_change = round(100 * (portfolio.profitLoss / portfolio.costBase));

    portfolio.costBase = round(portfolio.costBase);
    portfolio.marketValue = round(portfolio.marketValue);
    portfolio.totalReturns = round(portfolio.totalReturns);
    portfolio.percent_change_string = portfolio.percent_change + '%';

    return portfolio;
  }


  get portfolioStats() {

    let portfolio = this.symbols.reduce((prev, curr) => {
      prev.costBase += curr.costBase;
      prev.marketValue += curr.marketValue;
      prev.totalReturns += curr.marketValue;
      return prev;
    }, {costBase: 0, marketValue: 0, totalReturns: 0});

    portfolio = this.finishStatCalculations(portfolio)

    return portfolio;
  }

  get portfolioStatsWithDividends() {

    let portfolio = this.symbols.reduce((prev, curr) => {
      prev.costBase += curr.costBase;
      prev.marketValue += curr.marketValue;
      prev.totalReturns += curr.marketValue;
      if (curr.total_dividends) prev.totalReturns += curr.total_dividends;
      return prev;
    }, {costBase: 0, marketValue: 0, totalReturns: 0});

    portfolio = this.finishStatCalculations(portfolio)

    return portfolio;
  }


}

export default StockPortfolio;
