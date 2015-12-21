import StockEntry from './StockEntry';
import {round} from '../../shared/helpers/formatting';
import assign from 'object-assign';

class StockEntryCollection {

  constructor(entries) {
    this.refreshEntries(entries)
  }

  refreshEntries(entries){

    this.costBase = 0;
    this.amount = 0;

    this.entries = entries.map(entry =>{
      this.sector = entry.sector;
      this.ticker = entry.ticker;
      this.amount += entry.amount;
      this.costBase += entry.price * entry.amount;
      if(entry instanceof StockEntry) return entry;
      let amount = entry.amount;
      let price = entry.price;
      let ticker = entry.ticker;
      let date = entry.date;
      let name = entry.name;
      return new StockEntry({ amount, price,ticker,date,name});
    });

    this.costBase = round(this.costBase);
    this.marketValue = 0;
    this.averagePrice = round(this.costBase/this.amount);

  }

  addEntries(newEntries){
    //TODO check for duplicates on price/amount/date
    this.entries = this.entries.concat(newEntries);
    this.refreshEntries(this.entries);
  }

  get first() {
    return this.entries[0];
  }

  get firstBuyEntry(){
   return this.entries.reduce((prev,curr) =>{
      if(curr.date.isBefore(prev)) prev = curr.date;
      return prev;
    },moment('29991212','YYYYMMDD'));
  }

  get data(){

    let data = assign({},this);
    data.first = this.first;
    data.totalChangePercentageString = this.totalChangePercentage + '%';
    if(data.totalChangePercentage >= 0) data.totalChangePercentageString = '+' + this.totalChangePercentage + '%';

    return data;
  }

  get dataWithDividends(){
    let data = assign({},this);
    data.first = this.first;
    data.profitLoss = data.marketValue - data.costBase + this.total_dividends;
    data.profitLoss = round(data.profitLoss);
    data.totalChangePercentage =  round(100*data.profitLoss/data.costBase,1)
    data.totalChangePercentageString = data.totalChangePercentage + '%';
    data.style = 'success';
    if(data.profitLoss < 0) data.style = 'danger';
    if(data.profitLoss < 0 && Math.abs(data.profitLoss) < 100) data.style = 'warning';
    if(data.totalChangePercentage >= 0) data.totalChangePercentageString = '+' + data.totalChangePercentage + '%';
    return data;
  }

  getAmountAtDate(date){
    let priceDate = moment(date.Date,'YYYY-MM-DD');
    return this.entries.reduce((prev,curr) => {
      if(curr.date.isBefore(priceDate)){
        prev += curr.amount;
      }
      return prev;
    },0);
  }

  calculateProfitLoss(data){
    this.lastPrice = data.lastTradePriceOnly;
    this.marketValue = round(this.lastPrice*this.amount);
    this.profitLoss = round(this.marketValue - this.costBase);
    this.style = 'success';
    if(this.profitLoss < 0) this.style = 'danger';
    if(this.profitLoss < 0 && Math.abs(this.profitLoss) < 100) this.style = 'warning';
    this.totalChangePercentage =  round(100*this.profitLoss/this.costBase);
  }

  calculateDividends(data){

    if(data.dividends){
      this.entries.map(entry =>{
        entry.calculateDividends(data.dividends.dividends);
      })
    }

    this.total_dividends = this.entries.reduce((prev,curr) =>{
      prev += curr.total_dividends;
      return prev;
    },0)

    this.total_dividends = round(this.total_dividends);
    this.profitLoss_div = this.marketValue - this.costBase + this.total_dividends;
    this.totalChangePercentageWithDividends =  round(100*this.totalReturns/this.costBase);
  }

}

export default StockEntryCollection;
