import moment from 'moment';
import {round} from '../../shared/helpers/formatting';

class StockEntry {

  constructor({ amount, date, name, price, ticker, sector}) {
    this.amount = amount;
    this.date = moment(date,'YYYYMMDD');
    if(date.indexOf('/') !== -1) this.date = moment(date,'MM/YY/YYYY');
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

  updateWithRealtimeData(rt){

    let data = rt[this.ticker];

    if(data){
      this.change = data.change;
      this.industry = data.industry;
      this.previousClose = data.previousClose;
      this.percent_change =   round(100*(data.change/data.previousClose),2);
    }
  }

  calculateDividends(dividends){

    this.receivedDividends = dividends.filter(dividend =>{
        if(dividend.date.isAfter(this.date)) return true;
    });

    this.dividends_per_share = this.receivedDividends.reduce((prev,curr) =>{
      prev += parseFloat(curr.price);
      return prev;
    },0)

    this.dividends_per_share = round(this.dividends_per_share, 4);
    this.total_dividends = this.dividends_per_share * this.amount;
    this.total_dividends = round(this.total_dividends, 4) ;

  }

}

export default StockEntry;
