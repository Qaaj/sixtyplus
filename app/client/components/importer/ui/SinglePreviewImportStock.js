import { Panel , Label, Button} from 'react-bootstrap';
import { get, post, put, del } from '../../../utils/RequestUtil';
import { pureRenderDecorator } from '../../../../shared/helpers/decorators';
import { getStockEntriesData } from '../../../../shared/helpers/stocks';
import {getUniqueColor, getClassBySector} from '../../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../../ui/SectorComponent';
import {updateEntriesWithRT} from '../../../../shared/helpers/stocks'

@pureRenderDecorator
class SinglePreviewImportStock extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    if (!this.props.symbol || this.props.symbol.entries.count() == 0) return null;

    let symbol = this.props.symbol;

    symbol.updateEntriesWithRTData(this.props.rt[symbol.symbol]);

    let list = symbol.entries.map((entry, i) => {
      return (<h5 key={'stock_entry_' + entry.name + i}>{symbol.performance.amount} @ {symbol.performance.price}</h5>);
    });

    let cx = symbol.performance.profitLoss < 0 ? 'danger' : 'success';

    let sectorClass = '';

    if (symbol.performance.sector) {
      sectorClass = getClassBySector(symbol.performance.sector)
    }

    let name = symbol.performance.name;
    if (!symbol.performance.name) name = symbol.performance.symbol;

    let body = (<div>
        <Panel className='singlestock-panel' collapsible defaultExpanded={false}
               header={<h4>{this.props.symbol.symbol} <span className="stockName">{name} | {symbol.performance.amount} @ {symbol.performance.averagePrice}</span>
          <div className="profitLoss">P/L: <Label bsStyle={cx}>{symbol.performance.profitLoss}</Label></div>
          <SectorComponent cx={sectorClass} sector={symbol.performance.sector} />
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
