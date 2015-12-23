import loadUser from './user/LoadUser';
import addPortfolioEntry from './portfolio/AddEntry';

import saveUserData from './user/SaveData';
import deleteUserPortfolioData from './user/DeleteUserPortfolioData';
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

  saveUserData,
  deleteUserPortfolioData,
  getStockPrice,
  getStockPrices,
  getStockSuggestions,
  getStockData,
  getHistoricalData,
  getStocksNews,
  saveAnalystRatings,
};
