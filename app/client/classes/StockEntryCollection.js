import StockEntry from './StockEntry';

class StockEntryCollection {

  constructor(entries) {
    this.lastData = {};
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

  get totalChangePercentageString(){
    if(this.totalChangePercentage >= 0) return  '+' + this.totalChangePercentage + '%';
    return this.totalChangePercentage + '%';
  }

  calculateProfitLoss(data){
    this.lastData = data;
    this.lastPrice = data.lastTradePriceOnly;
    this.marketValue = (Math.round(100 * parseFloat(this.lastPrice) * parseFloat(this.amount))) / 100;
    this.profitLoss = this.marketValue - this.costBase;
    this.profitLoss = Math.round(this.profitLoss * 100)/ 100;
    this.style = 'success';
    if(this.profitLoss < 0) this.style = 'danger';
    if(this.profitLoss < 0 && Math.abs(this.profitLoss) < 100) this.style = 'warning';
    this.totalChangePercentage =  100 * Math.round((this.profitLoss/this.costBase) * 10000) / 10000;

  }

}

export default StockEntryCollection;
