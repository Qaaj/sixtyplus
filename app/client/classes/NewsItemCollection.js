import NewsItem from './NewsItem';

class NewsItemCollection {

  constructor(news,ticker) {
    this.ticker = ticker;
    this.parseNews(news)
  }

  parseNews(news){

    this.items = news.map(newsItem =>{
      return new NewsItem({
        date: newsItem.date,
        title: newsItem.title,
        url: newsItem.link,
        summary: newsItem.summary,
        ticker: this.ticker,
      })
    });
  }

}

export default NewsItemCollection;
