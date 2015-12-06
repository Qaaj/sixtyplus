import Dividend from './Dividend';

class DividendCollection {

  constructor(dividends) {
    this.parseDividends(dividends)
  }

  parseDividends(dividends){

    dividends = JSON.parse(dividends);

    this.dividends = dividends.map(div =>{
        return new Dividend({
          date: div.Date,
          price: div.Dividends,
        })
    });
  }


}

export default DividendCollection;
