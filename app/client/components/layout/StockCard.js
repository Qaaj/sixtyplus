import { Panel , Label, Button, ListGroup, ListGroupItem, Well} from 'react-bootstrap';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import {updateEntriesData} from '../../../shared/helpers/stocks';
import SectorComponent from '../ui/SectorComponent';

@pureRenderDecorator
class StockCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.entries || this.props.entries.length == 0) return null;

    let entries = this.props.entries;

    let sectorClass = '';
    let profitColorClass = getProfitLossClassname(entries.first.isUpToday);
    let changeString = entries.percent_change;
    if(entries.percent_change >= 0) changeString = '+' + changeString;
    changeString += '%';

    let dayChangeString = entries.first.percent_change;
    if(entries.first.percent_change >= 0) changeString = '+' + changeString;

    if (entries.sector) {
      sectorClass = getClassBySector(entries.sector)
    }


    let body = (<div className="stockCard">
        <h4>{entries.ticker} <span className="stockName">{entries.name} </span></h4>
        <div className="cardContent">
          <Well>
            <span className="lastPrice">{entries.lastPrice}</span> <span className={"tickerUpDown  " + profitColorClass}>{entries.first.changeString} ({entries.first.percentChangeString})</span>
          </Well>
          <ListGroup>
            <ListGroupItem>
              <span className="prop">Cost Base </span>
              <div className="val">{entries.costBase}</div>
            </ListGroupItem>
            <ListGroupItem>
              <span className="prop">Market Value </span>
              <div className="val">{entries.marketValue}</div>
            </ListGroupItem>
            <ListGroupItem bsStyle={entries.style}>
              <span className="prop">P/L </span>
              <div className="val">{entries.profitLoss} ({entries.totalChangePercentageString})</div>
            </ListGroupItem>
          </ListGroup>
        </div>
        <SectorComponent cx={sectorClass} sector={entries.sector}/>

      </div>
    );

    return body;
  }
}

StockCard.displayName = 'StockCard';

export default StockCard;
