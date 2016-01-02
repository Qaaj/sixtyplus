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
    if(nextProps.portfolio.flatsymbolList.length !== this.props.portfolio.flatsymbolList.length) return true;
    if(nextState.news !== this.state.news) return true;
    return false;
  }

  render() {

    if (!this.state.news || !this.props.portfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let filterItems = this.props.portfolio.flatsymbolList;

    let news = this.state.news;
    let symbols = this.state.filter;
    if(!symbols || symbols.length == 0) symbols = news.symbols;

    let allItems = [];

    symbols.forEach(symbol => {
      allItems = allItems.concat(news.getNewsBysymbol(symbol).items);
    })

    allItems = sortByKey({array:allItems,key:'date', reverse:true});

    let newsitems = allItems.map((news,i) => {
      return (<NewsItem key={"newsitem_"+i} lang={this.props.lang} news={news} />);
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
