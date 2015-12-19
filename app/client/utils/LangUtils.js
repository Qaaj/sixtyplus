import UserStore from '../stores/UserStore';

let locale = "EN";
let DEBUG = false;

function TranslationText(props) {

  let cx = '';
  if (props.debug) cx = 'translation_debug'
  return (
    <span className={cx}>
      {props.text}
    </span>
  );
}

function HTMLTranslation(props) {

  let content = props.html.replace("html:", '');
  content = content.trim();
  const html = {__html: content};

  return <span dangerouslySetInnerHTML={html}></span>;
}

export function setLanguageMap(lang) {
  if (lang) {
    if (lang.toUpperCase() === 'EN') current = EN_translations;
    if (lang.toUpperCase() === 'DE') current = DE_translations;
    locale = lang;
  }
}

// Fix this for HTML translations
export function getTranslation(key, isText = false, templates) {

  let isHTML = false;

  // When NOT on stage, always return plain strings
  if (window.env !== 'stage') isText = true;
  let debugMode = DEBUG;

  //If there's no params, return the current language
  if (!key) return locale.toUpperCase();

  // Get the translation
  let translation = current[key];

  // Enable debug parameter
  if (window.location.hash.indexOf('debug_translations') !== -1) debugMode = true;

  //If debug mode, return the key
  if (debugMode) translation = '[' + key + ']';

  // If not found, use the key
  if (!translation) {
    translation = '[' + key + ']';
    debugMode = true;
  }

  // Do the templating
  if (templates) {

    translation = Object.keys(templates).reduce((final, templateKey) => {
      return final.replace(templateKey, templates[templateKey]);
    }, translation);

  }

  if (translation.indexOf('html') !== -1) {
    translation = translation.replace("[", "").replace("]", "");
    isText = false;
    isHTML = true;
    return <HTMLTranslation html={translation}/>;
  }


  // If requested, only return the string. OR
  // If we found the key, also just return the string
  if (isText || current[key]) return translation;


  return <TranslationText text={translation} debug={debugMode}/>;
}


let current = {
  "quickstart": "Quickstart",
  "planner": "Planner",
  "portfolio": "Portfolio",
  "import": "Import",
  "portfolio_graph_help": "html:<p><b>Click</b> on a label to toggle active state.</p><p><b>Alt + Click</b> on a label to disable other tickers.</p>",
  "portfolio_graph": "Portfolio Graph",
  "settings": "Settings",
  "news": "News",
  "sorted_by": "Sorted By",
  "profitLoss": "P&L",
  "marketValue": "Market Value",



  /**  PortfolioDetailModal ABOUT **/
  "sector": "Sector",
  "ticker": "Ticker",
  "total_dividends": "Total Dividends",
  "dividends": "Dividends",
  "amount": "# Shares",
  "all":"All",
  "profit":"Profit",
  "loss":"Loss",
  "symbol": "Symbol",
  "name": "Name",
  "lastTradeDate": "Last Trade Date",
  "ask": "Ask",
  "bid": "Bid",
  "askRealtime": "Ask Realtime",
  "bidRealtime": "Bid Realtime",
  "change": "Change",
  "changeRealtime": "Change Real Time",
  "dividendPerShare": "Dividend Per Share",
  "epsEstimateNextQuarter": "EPS Estimate Next Quarter",
  "daysLow": "Days Low",
  "daysHigh": "daysHigh",
  "peRatio": "P/E",
  "1YrTargetPrice": "1 Year Target Price",
  "bookValue": "Book Value",
  "52WeekHigh": "52 Week High",
  "52WeekLow": "52 Week Low",
  "changeFrom52WeekHigh": "Change From 52 Week High",
  "changeFrom52WeekLow": "Change From 52 Week Low",
  "earningsPerShare": "Earnings Per Share (EPS)",
  "epsEstimateCurrentYear": "Estimated EPS Current Year",
  "epsEstimateNextYear": "Estimated EPS Next Year",
  "50DayMovingAverage": "50 Day Moving Average",
  "200DayMovingAverage": "200 Day Moving Average",
  "changeFrom50DayMovingAverage": "Change From 50 Day Moving Avg.",
  "changeFrom200DayMovingAverage": "Change From 200 Day Moving Avg.",
  "open": "Open",
  "previousClose": "Previous Close",
  "pricePerSales": "Price Per Sale",
  "pricePerBook": "Price Per Book",
  "pegRatio": "Peg Ratio",
  "pricePerEpsEstimateCurrentYear": "Price Per EPS Estimate Current Year",
  "pricePerEpsEstimateNextYear": "Price Per EPS Estimate Next Year",
  "dividendYield": "Dividend Yield",
  "divsThisYear": "Dividends This Year",
  "divsLastYear": "Dividends Last Year",
  "estDivsNextYear": "Est Divs. next year",
  "lastTradePriceOnly": "Last Trade Price Only",
  "industry": "Industry",

};
