import moment from 'moment';

class StockEntry {

  constructor({ amount, date, name, price, ticker, sector}) {
    this.amount = amount;
    this.date = moment(date);
    this.name = name;
    this.price = price;
    this.ticker = ticker;
    this.sector = sector;
  }

  get dateString() {
    return this.date.format("LL");
  }

  get isUpToday(){
    if(this.change >= 0) return true;
    return false;
  }

  get percentChangeString(){
    return this.percent_change + '%';
  }
  get changeString(){
    if(this.percent_change >= 0) return  '+' + this.percent_change ;
    return this.percent_change;
  }

  updateWithReltimeData(rt){
    let data = rt[this.ticker];
    if(data){
      this.change = data.change;
      this.industry = data.industry;
      this.previousClose = data.previousClose;
      this.percent_change =  100 * Math.round((data.change/data.previousClose) * 10000) / 10000;
    }
  }

}

export default StockEntry;
