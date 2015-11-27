import StockEntry from './StockEntry';

class StockEntryCollection {

  constructor(entries) {

    this.totalPrice = 0;
    this.amount = 0;

    this.entries = entries.map(entry =>{
      this.ticker = entry.ticker;
      this.amount += entry.amount;
      this.totalPrice += entry.price * entry.amount;
      let amount = entry.amount;
      let price = entry.price;
      let ticker = entry.ticker;
      let date = entry.date;
      let name = entry.name;
      return new StockEntry({ amount, price,ticker,date,name});
    });

    this.averagePrice = (Math.round(100 * parseFloat(this.totalPrice) / parseFloat(this.amount))) / 100;
  }

}

export default StockEntryCollection;
