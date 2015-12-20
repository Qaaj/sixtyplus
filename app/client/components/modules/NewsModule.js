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
    if(this.props.user.stockPortfolio){
      if(nextProps.user.stockPortfolio.flatTickerList.length === this.props.user.stockPortfolio.flatTickerList.length){
        if(nextState.news !== this.state.news || nextState.filter !== this.state.filter) return true;
        return false;
      } else{
        return true;
      }
    }else{
      return true;
    }
  }

  render() {

    if (!this.state.news || !this.props.user.stockPortfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let filterItems = ['All'];
    filterItems = filterItems.concat(this.props.user.stockPortfolio.flatTickerList);

    let news = this.state.news;
    let tickers = [this.state.filter];
    if(!this.state.filter || this.state.filter == "All") tickers = news.tickers;

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

        <Filter keys={filterItems} onSelect={this.onClickFilter.bind(this)} lang={this.props.lang} translate={false} vertical={true}/>
        <div className="news_item_list">
          <h1>News <HelpIcon placement="right" title={'Hello'} icon="help_outline"
                             content={'Sup'}/></h1>
          {newsitems}
        </div>
      </Grid>
        </div>

    );
  }
}

NewsModule.displayName = 'NewsModule';

export default NewsModule;
