import NewsItemCollection from './NewsItemCollection';

class News {

  constructor(news) {
    this.parseNews(news)
  }

  parseNews(news){

    this.symbols = Object.keys(news);

    this.news = this.symbols.map(symbol => {
      return new NewsItemCollection(news[symbol],symbol);
    })

  }

  getNewsBysymbol(symbol){
    return this.news.filter(newsItem =>{
      if(newsItem.symbol === symbol) return true;
    })[0];
  }


}

export default News;
