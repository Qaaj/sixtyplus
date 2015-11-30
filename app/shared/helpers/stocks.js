import defaults from '../../client/config/Defaults';
import StockEntryCollection from '../../client/classes/StockEntryCollection';


export function collectionsToPortfolioMap(stockEntryCollections) {

  let portfolio = {};

  stockEntryCollections.map((entryCollection) => {

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

export function mapByTicker(array) {

  let sortedStocks = {};

  try {
    array.map(tx => {
      if (!sortedStocks[tx.ticker]) sortedStocks[tx.ticker] = [];
      sortedStocks[tx.ticker].push(tx);
    });

  } catch (err) {

    console.error("Something went wrong mapping the stocks: ", array)
    return {};
  }

  return sortedStocks;

}

// Update the collection of stock transactions with latest realtime data

export function updateArrayOfEntryCollectionsWithRT(entries, rt) {

  return entries.map((entry) => {
    let ticker = entry.ticker;

    if (rt && rt[ticker]) {
      entry.sector = rt[ticker].sector;
      entry.industry = rt[ticker].industry;
      entry.name = rt[ticker].name;
      entry.calculateProfitLoss(rt[ticker]);
    }

    entry.entries.map(single => {
      single.updateWithReltimeData(rt);
    })

    return entry;
  });

}

export function updateSingeEntryCollectionWithRT(entry, rt) {


  let ticker = entry.ticker;

  if (rt && rt[ticker]) {
    entry.sector = rt[ticker].sector;
    entry.industry = rt[ticker].industry;
    entry.name = rt[ticker].name;
    entry.calculateProfitLoss(rt[ticker]);
  }

  entry.entries.map(single => {
    single.updateWithReltimeData(rt);
  })

  return entry;


}

export function createEntriesFromUserObjectPortfolio(portfolio) {

  let collection = [];
  for (let key in portfolio) {
    collection.push(new StockEntryCollection(portfolio[key]));
  }

  return collection;
}

export function createPortfolioStats(entries) {

  let portfolio = entries.reduce((prev, curr) => {
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

