import StockEntry from './StockEntry';

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

    this.costBase = Math.round(this.costBase * 100)/ 100;
    this.marketValue = 0;
    this.averagePrice = (Math.round(100 * parseFloat(this.costBase) / parseFloat(this.amount))) / 100;

  }

  addEntries(newEntries){
    //TODO check for duplicates on price/amount/date
    this.entries = this.entries.concat(newEntries);
    this.refreshEntries(this.entries);
  }

  get first() {
    return this.entries[0];
  }

  get data(){

    let data = Object.assign({},this);
    data.first = this.first;
    data.totalChangePercentageString = this.totalChangePercentage + '%';
    if(data.totalChangePercentage >= 0) data.totalChangePercentageString = '+' + this.totalChangePercentage + '%';

    return data;
  }

  get dataWithDividends(){
    let data = Object.assign({},this);
    data.first = this.first;
    data.profitLoss = data.marketValue - data.costBase + this.total_dividends;
    data.profitLoss = Math.round(data.profitLoss * 100)/ 100;
    data.totalChangePercentage =  100 * Math.round((data.profitLoss/data.costBase) * 10000) / 10000;
    data.totalChangePercentageString = data.totalChangePercentage + '%';
    data.style = 'success';
    if(data.profitLoss < 0) data.style = 'danger';
    if(data.profitLoss < 0 && Math.abs(data.profitLoss) < 100) data.style = 'warning';
    if(data.totalChangePercentage >= 0) data.totalChangePercentageString = '+' + data.totalChangePercentage + '%';
    return data;
  }

  calculateProfitLoss(data){
    this.lastPrice = data.lastTradePriceOnly;
    this.marketValue = (Math.round(100 * parseFloat(this.lastPrice) * parseFloat(this.amount))) / 100;
    this.profitLoss = this.marketValue - this.costBase;
    this.profitLoss = Math.round(this.profitLoss * 100)/ 100;
    this.style = 'success';
    if(this.profitLoss < 0) this.style = 'danger';
    if(this.profitLoss < 0 && Math.abs(this.profitLoss) < 100) this.style = 'warning';
    this.totalChangePercentage =  100 * Math.round((this.profitLoss/this.costBase) * 10000) / 10000;
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

    this.total_dividends = Math.round((this.total_dividends) * 10000) / 10000;
    this.profitLoss_div = this.marketValue - this.costBase + this.total_dividends;
    this.totalChangePercentageWithDividends =  100 * Math.round((this.totalReturns/this.costBase) * 10000) / 10000;




  }

}

export default StockEntryCollection;
