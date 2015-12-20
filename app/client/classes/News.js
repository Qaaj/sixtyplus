import NewsItemCollection from './NewsItemCollection';

class News {

  constructor(news) {
    this.parseNews(news)
  }

  parseNews(news){

    this.tickers = Object.keys(news);

    this.news = this.tickers.map(ticker => {
      return new NewsItemCollection(news[ticker],ticker);
    })

  }

  getNewsByTicker(ticker){
    return this.news.filter(newsItem =>{
      if(newsItem.ticker === ticker) return true;
    })[0];
  }


}

export default News;
