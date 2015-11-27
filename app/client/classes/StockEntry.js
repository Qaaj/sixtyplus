import moment from 'moment';

class StockEntry {

  constructor({ amount, date, name, price, ticker}) {
    this.amount = amount;
    this.date = moment(date);
    this.name = name;
    this.price = price;
    this.ticker = ticker;
  }

  get dateString() {
    return this.date.format("LL");
  }

}

export default StockEntry;
