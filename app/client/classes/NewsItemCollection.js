import NewsItem from './NewsItem';

class NewsItemCollection {

  constructor(news,symbol) {
    this.symbol = symbol;
    this.parseNews(news)
  }

  parseNews(news){

    this.items = news.map(newsItem =>{
      return new NewsItem({
        date: newsItem.date,
        title: newsItem.title,
        url: newsItem.link,
        summary: newsItem.summary,
        symbol: this.symbol,
      })
    });
  }

}

export default NewsItemCollection;
