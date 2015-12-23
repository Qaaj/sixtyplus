import loadUser from './user/LoadUser';
import addPortfolioEntry from './portfolio/AddEntry';
import loadPortfolio from './portfolio/LoadPortfolio';
import saveUserSettings from './user/SaveUserSettings';
import loadUserFinancialProfile from './user/LoadFinancialProfile';

import getStockPrice from './stocks/GetPrice';
import getStockPrices from './stocks/GetPrices';
import getStockData from './stocks/GetData';
import getStockSuggestions from './stocks/GetStockSuggestions';
import getHistoricalData from './stocks/GetHistoricalData';
import getStocksNews from './news/GetStockNews';
import saveAnalystRatings from './maintenance/SaveAnalystRatings';

export default {
  loadUser,
  addPortfolioEntry,
  loadPortfolio,
  saveUserSettings,
  loadUserFinancialProfile,

  getStockPrice,
  getStockPrices,
  getStockSuggestions,
  getStockData,
  getHistoricalData,
  getStocksNews,
  saveAnalystRatings,
};
