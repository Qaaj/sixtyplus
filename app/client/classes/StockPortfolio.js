import StockEntryCollection from './StockEntryCollection';

class StockPortfolio {

  constructor(entryCollectionList) {
    this.entryCollectionList = entryCollectionList;
  }

  get collectionList() {
    return this.entryCollectionList;
  }


  get portfolioStats() {
    let portfolio = this.entryCollectionList.reduce((prev, curr) => {
      prev.costBase += curr.costBase;
      prev.marketValue += curr.marketValue;
      return prev;
    }, {costBase: 0, marketValue: 0});

    portfolio.profitLoss = portfolio.marketValue - portfolio.costBase;
    portfolio.percent_change = 100 * (portfolio.profitLoss / portfolio.costBase)

    portfolio.costBase = Math.round((portfolio.costBase) * 100) / 100;
    portfolio.marketValue = Math.round((portfolio.marketValue) * 100) / 100;
    portfolio.profitLoss = Math.round((portfolio.profitLoss) * 100) / 100;
    portfolio.percent_change = Math.round((portfolio.percent_change) * 100) / 100;
    portfolio.percent_change_string = portfolio.percent_change + '%';

    return portfolio;
  }

  get userDataObject() {

    // THIS IS THE DATA THAT WILL BE SAVED TO THE BACKEND
    let portfolio = {};
    this.entryCollectionList.map((entryCollection) => {
      portfolio[entryCollection.ticker] = entryCollection.entries.map(entry => {
        let final = {};
        final.ticker = entry.ticker;
        final.price = entry.price;
        final.amount = entry.amount;
        final.date = entry.date.format();
        return final;
      })
    });

    return portfolio;
  }

}

export default StockPortfolio;
