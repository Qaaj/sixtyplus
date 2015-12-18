import { Input,Button,Grid } from 'react-bootstrap';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import NewsStore from '../../stores/NewsStore';
import {getStockNews} from '../../utils/ApiUtils';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import HelpIcon from '../ui/HelpIcon';
import Filter from '../ui/FilterButtons';

class NewsModule extends React.Component {

  constructor(props) {
    super(props);
    this.store = NewsStore;
    this.state = this.getStateFromStore();

    this.stocks = ['BX', 'MO'];

    getStockNews(this.stocks);


    this._onClick = this._onClick.bind(this);
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

  _onClick(news) {
    ModalActionCreators.setModal({
      isVisible: true,
      type: ModalConstants.NEWS_ITEM,
      data: news
    });
  }

  render() {


    if (!this.state.news.hasNews || !this.props.user.stockPortfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let filterItems = ['All'];
    filterItems = filterItems.concat(this.props.user.stockPortfolio.flatTickerList);

    let tickers = Object.keys(this.state.news.items);
    let allItems = [];

    tickers.forEach(ticker => {
      allItems = allItems.concat(this.state.news.items[ticker]);
    })

    let newsitems = allItems.map((news, i) => {
      let date = moment(news.date);
      return (<div key={'newsitem_' + i}>
        <HelpIcon placement="right" title={news.title} icon="remove_red_eye"
                  content={this.props.lang('html:' + news.summary)}/>
        <a style={{'marginLeft':'5px','cursor':'pointer'}} onClick={this._onClick.bind(this,news)}>{date.format("HH:MM") + ' - ' + news.title + ' ' + date.format("(dd DD/MM)")}</a>
      </div>);
    })

    return (
      <div className="news_module">
      <Grid>
        <Filter keys={filterItems} lang={this.props.lang} translate={false} vertical={true}/>
        <div className="news_item_list">
          {newsitems}
        </div>
      </Grid>
        </div>

    );
  }
}

NewsModule.displayName = 'NewsModule';

export default NewsModule;
