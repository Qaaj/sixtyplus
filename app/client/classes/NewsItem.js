import moment from 'moment';

class NewsItem {

  constructor({ date, title, url, summary, symbol }) {
    this.date = moment(date);
    this.title = title.replace('&#39;', "'");
    this.url = url;
    this.summary = summary;
    this.symbol = symbol;
  }

}

export default NewsItem;
