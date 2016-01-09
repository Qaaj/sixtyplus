import { Panel , Label, Button} from 'react-bootstrap';
import { get, post, put, del } from '../../../utils/RequestUtil';
import { pureRenderDecorator } from '../../../../shared/helpers/decorators';
import { getStockEntriesData } from '../../../../shared/helpers/stocks';
import {getUniqueColor, getClassBySector} from '../../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../../ui/SectorComponent';
import { updateArrayOfEntryCollectionsWithRT, updateSingeEntryCollectionWithRT} from '../../../../shared/helpers/stocks';

@pureRenderDecorator
class SinglePreviewImportStock extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    if (!this.props.stockEntries || this.props.stockEntries.entries.length == 0) return null;

    let stockEntries = this.props.stockEntries;

    stockEntries = updateSingeEntryCollectionWithRT(stockEntries,this.props.rt);

    let list = stockEntries.entries.map((entry, i) => {
      return (<h5 key={'stock_entry_' + entry.name + i}>{entry.amount} @ {entry.price}</h5>);
    });

    let cx = stockEntries.profitLoss < 0 ? 'danger' : 'success';

    let sectorClass = '';

    if (stockEntries.sector) {
     sectorClass = getClassBySector(stockEntries.sector)
    }

    let name = stockEntries.name;
    if(!stockEntries.name) name = stockEntries.symbol;

    let body = (<div>
        <Panel className='singlestock-panel' collapsible defaultExpanded={false}
               header={<h4>{this.props.symbol} <span className="stockName">{name} | {stockEntries.amount} @ {stockEntries.averagePrice}</span>
          <div className="profitLoss">P/L: <Label bsStyle={cx}>{stockEntries.profitLoss}</Label></div>
          <SectorComponent cx={sectorClass} sector={stockEntries.sector} />
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
