import { Input,Button,Grid } from 'react-bootstrap';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import NewsStore from '../../stores/NewsStore';
import NewsItem from '../layout/NewsItem';
import HelpIcon from '../ui/HelpIcon';
import Filter from '../ui/FilterButtons';
import {sortByKey} from '../../../shared/helpers/sorting';

class NewsModule extends React.Component {

  constructor(props) {
    super(props);
    this.store = NewsStore;
    this.state = this.getStateFromStore();
    this.state.filter = [];
  }

  getStateFromStore() {
    return {
      news: this.store.getNews(),
    };
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  componentDidMount() {
    this.store.addChangeListener(this._onChange.bind(this));
  }

  onClickFilter(filter){
    this.setState({
      filter:filter
    });
  }

  // Enhance the rendering time
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.filter.length !== this.state.filter.length) return true;
    if(!this.props.portfolio) return true;
    if(nextProps.portfolio.flatTickerList.length !== this.props.portfolio.flatTickerList.length) return true;
    if(nextState.news !== this.state.news) return true;
    return false;
  }

  render() {

    if (!this.state.news || !this.props.portfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let filterItems = this.props.portfolio.flatTickerList;

    let news = this.state.news;
    let tickers = this.state.filter;
    if(!tickers || tickers.length == 0) tickers = news.tickers;

    let allItems = [];

    tickers.forEach(ticker => {
      allItems = allItems.concat(news.getNewsByTicker(ticker).items);
    })

    allItems = sortByKey(allItems,'date', true);

    let newsitems = allItems.map((news) => {
      return (<NewsItem lang={this.props.lang} news={news} />);
    })



    return (
      <div className="news_module">
      <Grid>

        <Filter toggle={true} keys={filterItems} onSelect={this.onClickFilter.bind(this)} lang={this.props.lang} translate={false} vertical={true}/>
        <div className="news_item_list">
          <h1>News <HelpIcon placement="right" title={this.props.lang('news')} icon="help_outline"
                             content={this.props.lang('news_info')}/></h1>
          {newsitems}
        </div>
      </Grid>
        </div>

    );
  }
}

NewsModule.displayName = 'NewsModule';

export default NewsModule;
