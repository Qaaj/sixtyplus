import { Panel , Label, Button} from 'react-bootstrap';
import { get, post, put, del } from '../../utils/RequestUtil';
import {getStockPrice  } from '../../actions/RealTimeActionCreators';

class SingleStock extends React.Component {


  constructor(props) {
    super(props);
    this.state = {price: "N/A"};
  }

  componentDidMount() {
    //let currentProtocol = window.location.protocol;
    //let baseUrl = window.location.host;

    //const API_URL = `${currentProtocol}//${baseUrl}/api`;
    //
    //let data = {ticker: this.props.ticker};
    //let url = `${API_URL}/getStockPrice`;
    //
    //this.timeOutID = setTimeout(()=> {
    //  post({url, data})
    //    .then(
    //      (response) => {
    //        console.log(response.body.lastTradePriceOnly);
    //        this.setState({price: response.body.lastTradePriceOnly})
    //      },
    //
    //      (error) => {
    //        console.error('Error: ', error);
    //      }
    //    );
    //}, 200);
    //getStockPrice(this.props.ticker);

  }

  componentWillUnmount(){

  }

  componentDidMount(){

  }

  componentWillReceiveProps(newProps) {
    let stockPrice = 0;
    if(newProps.rt) {
      stockPrice = newProps.rt[newProps.ticker];
    }
    if(stockPrice) this.setState({price: stockPrice.lastTradePriceOnly});
  }


  render() {

    let totalPrice = 0;
    let totalAmount = 0;
    if (!this.props.entries || this.props.entries.length == 0) return null;

    let list = this.props.entries.map((entry, i) => {
      totalPrice += (entry.price * entry.amount);
      totalAmount += entry.amount;
      return (<h5 key={'stock_entry_' + entry.name + i}>{entry.amount} @ {entry.price}</h5>);
    });


    let avg = Math.round((totalPrice / totalAmount) * 100) / 100;
    let PL = (this.state.price * totalAmount) - totalPrice;
    PL = Math.round((PL) * 100) / 100;
    if (this.state.price == "") PL = "N/A";
    let cx = 'success';
    if (PL < 0) cx = 'danger';


    let body = (<div>
        <Panel className='singlestock-panel' collapsible defaultExpanded={false}
               header={<h4>{this.props.ticker} ({this.props.entries[0].name})
                       Last price: <Label bsStyle={cx}>{this.state.price}</Label> -
                       Average price: <Label bsStyle={cx}>{avg}</Label> -
                       P/L: <Label bsStyle={cx}>{PL}</Label></h4>}>
          {list}

        </Panel>
      </div>
    );

    return body;
  }
}

SingleStock.displayName = 'SingleStock';

export default SingleStock;
