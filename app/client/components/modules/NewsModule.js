import { Input,Button,Grid } from 'react-bootstrap';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import NewsStore from '../../stores/NewsStore';
import {getStockNews} from '../../utils/ApiUtils';

class NewsModule extends React.Component {

  constructor(props) {
    super(props);
    this.store = NewsStore;
    this.state = this.getStateFromStore();
    getStockNews(["BX"]);
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

  render() {

    if (!this.state.news.hasNews) return (<Grid style={{'textAlign':'center','padding':'20px'}}>
      <div className="loader"></div>
    </Grid>);

    let newsitems = this.state.news.BX.map((news,i) => {
      return <div><Button key={i}>{news.title}</Button></div>;
    })

    return (<Grid>{newsitems}</Grid>

    );
  }
}

NewsModule.displayName = 'NewsModule';

export default NewsModule;
