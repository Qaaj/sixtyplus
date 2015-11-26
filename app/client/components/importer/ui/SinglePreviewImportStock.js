import { Panel , Label, Button} from 'react-bootstrap';
import { get, post, put, del } from '../../../utils/RequestUtil';
import { pureRenderDecorator } from '../../../../shared/helpers/decorators';
import { getStockEntriesData } from '../../../../shared/helpers/stocks';
import {getUniqueColor, getClassBySector} from '../../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../../ui/SectorComponent';

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

  render() {

    if (!this.props.entries || this.props.entries.length == 0) return null;

    const data = getStockEntriesData(this.props.entries, this.props.rt);

    let list = this.props.entries.map((entry, i) => {
      return (<h5 key={'stock_entry_' + entry.name + i}>{entry.amount} @ {entry.price}</h5>);
    });

    let cx = data.profitLoss < 0 ? 'danger' : 'success';

    let sectorClass = '';

    if (data.sector) {
     sectorClass = getClassBySector(data.sector)
    }


    if (this.props.rt && this.props.rt[name]) name = this.props.rt[name].name;


    let body = (<div>
        <Panel className='singlestock-panel' collapsible defaultExpanded={false}
               header={<h4>{this.props.ticker} <span className="stockName">{data.name} | {data.totalAmount} @ {data.averagePrice}</span>
          <div className="profitLoss">P/L: <Label bsStyle={cx}>{data.profitLoss}</Label></div>
          <SectorComponent cx={sectorClass} sector={data.sector} />
          </h4>}>

          {list}

        </Panel>
      </div>
    );

    return body;
  }
}

SinglePreviewImportStock.displayName = 'SinglePreviewImportStock';

export default SinglePreviewImportStock;
