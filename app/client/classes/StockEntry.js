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

}

export default StockEntry;
