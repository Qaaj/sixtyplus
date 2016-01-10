import StockEntry from './StockEntry';
import {round} from '../../shared/helpers/formatting';
import assign from 'object-assign';
import { List } from 'immutable';
import {createPerformanceObjectFromEntries} from '../../shared/helpers/stocks'

class StockSymbol {

  constructor(symbol) {
    this.symbol = symbol;
    this._performance = {};
    this._performanceWithDividends = {};
    this.latestRT = null;
    this.entries = new List();
    return this;
  }

  addEntry(stockEntry) {
    this.entries = this.entries.push(stockEntry);
    this.updatePerformanceObjects();
  }

  get sector() {
    return this.first.sector;
  }

  updateEntriesWithRTData(data) {
    this.latestRT = data;
    this.updatePerformanceObjects();
  }

  get first() {
    return this.entries.get(0);
  }

  get firstBuyEntry() {
    return this.entries.reduce((prev, curr) => {
      if (curr.date.isBefore(prev)) prev = curr.date;
      return prev;
    }, moment('29991212', 'YYYYMMDD'));
  }

  get performance() {
    return this._performance;
  }
  get performanceWithDividends() {
    return this._performanceWithDividends;
  }

  getAmountAtDate(date) {
    let priceDate = moment(date.Date, 'YYYY-MM-DD');
    return this.entries.reduce((prev, curr) => {
      if (curr.date.isBefore(priceDate)) {
        prev += curr.amount;
      }
      return prev;
    }, 0);
  }

  getAveragePriceAtDate(date) {
    let priceDate = moment(date.Date, 'YYYY-MM-DD');
    let result = this.entries.reduce((prev, curr) => {
      if (curr.date.isBefore(priceDate)) {
        prev.amount += curr.amount;
        prev.costBase += curr.price * curr.amount;
      }
      return prev;
    }, {amount: 0, costBase: 0});

    let averagePrice = round(result.costBase / result.amount);
    if (result.amount === 0) averagePrice = 0;

    return averagePrice;
  }

  calculateDividends(data) {

    this.dividends = data.dividends;
    if (data.dividends) {
      this.entries = this.entries.map(entry => {
        entry.calculateDividends(data.dividends);
        return entry;
      })
    }

    this.total_dividends = this.entries.reduce((prev, curr) => {
      prev += curr.total_dividends;
      return prev;
    }, 0)

    this.total_dividends = round(this.total_dividends);

    this.updatePerformanceObjects();
  }

  updatePerformanceObjects(){
    this._performance = createPerformanceObjectFromEntries({entries: this.entries, rt: this.latestRT,
      dividends:this.total_dividends, symbol:this, doDiv:false});
    this._performanceWithDividends = createPerformanceObjectFromEntries({entries: this.entries, rt: this.latestRT,
      dividends:this.total_dividends, symbol:this, doDiv:true});
  }


  static copy(symbolclass) {
    let sc = new StockSymbol(symbolclass.symbol);
    assign(sc, symbolclass);
    return sc;
  }


}

export default StockSymbol;
