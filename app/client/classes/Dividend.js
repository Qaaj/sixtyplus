import moment from 'moment';

class Dividend {

  constructor({ date, price }) {
    this.date = moment(date);
    this.price = price;
  }

}

export default Dividend;
