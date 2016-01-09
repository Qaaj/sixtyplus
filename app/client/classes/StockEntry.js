import moment from 'moment';
import {round} from '../../shared/helpers/formatting';

class StockEntry {

  constructor({ amount, date, price, symbol}) {
    this.amount = amount;
    this.date = moment(date,'YYYYMMDD');
    if(date.indexOf('/') !== -1) this.date = moment(date,'MM/YY/YYYY');
    this.price = price;
    this.symbol = symbol;
    this.name = "NO NAME";
    this.sector = "NO SECTOR";
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
