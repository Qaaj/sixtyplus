import { Panel , Label, Button} from 'react-bootstrap';
import { get, post, put, del } from '../../../utils/RequestUtil';
import { pureRenderDecorator } from '../../../../shared/helpers/decorators';

@pureRenderDecorator
class SinglePreviewImportStock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {price: "N/A"};
  }

  componentWillReceiveProps(newProps) {
    let stockPrice = 0;
    if (newProps.rt) {
      stockPrice = newProps.rt[newProps.ticker];
    }
    if (stockPrice) this.setState({price: stockPrice.lastTradePriceOnly});
  }

  componentDidMount() {
    let stockPrice = 0;
    if (this.props.rt) {
      stockPrice = this.props.rt[this.props.ticker];
    }
    if (stockPrice) this.setState({price: stockPrice.lastTradePriceOnly});
  }

  getColor(value){
    //value from 0 to 1
    var hue=(value * 100).toString(10);
    return ["hsl(",hue,",65%,50%)"].join("");
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

    let name = this.props.entries[0].name;
    let sector ='0'
    if(this.props.rt && this.props.rt[this.props.ticker]){
      sector = this.props.rt[this.props.ticker].sector;
    }

    let style = {};

    if(sector){
      let energyColor = sector.split("").reduce((prev, curr, i) => {
        prev += curr.charCodeAt(0);
        return prev;
      }, 0);

      let percent = energyColor / 500.0;
      let color = this.getColor(percent);

      style = {
        backgroundColor: color,
        marginLeft: '20px'
      };

    }


    if (this.props.rt && this.props.rt[name]) name = this.props.rt[name].name;


    let body = (<div>
        <Panel className='singlestock-panel' collapsible defaultExpanded={false}
               header={<h4>{this.props.ticker} <span className="stockName">{name} | {totalAmount} @ {avg}</span>
          <div className="profitLoss">P/L: <Label bsStyle={cx}>{PL}</Label></div>
                                  <Label style={style} bsStyle={cx}>{sector}</Label>

          </h4>}>

          {list}

      </Panel>
      < / div >
    );

    return body;
  }
}

SinglePreviewImportStock.displayName = 'SinglePreviewImportStock';

export default SinglePreviewImportStock;
