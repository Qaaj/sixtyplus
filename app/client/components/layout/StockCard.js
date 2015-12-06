import { Panel , Label, Button, ListGroup, ListGroupItem, Well, Col} from 'react-bootstrap';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import {updateArrayOfEntryCollectionsWithRT} from '../../../shared/helpers/stocks';
import SectorComponent from '../ui/SectorComponent';

@pureRenderDecorator
class StockCard extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      expanded: false
    }

  }

  handleClick(){

  }

  render() {

    if (!this.props.entries || this.props.entries.length == 0) return null;

    //let entries = this.props.entries;
    let entries = this.props.entries.data;
    if(this.props.includeDiv) entries = this.props.entries.dataWithDividends;

    let sectorClass = '';
    let profitColorClass = getProfitLossClassname(entries.first.isUpToday);

    if (entries.sector) {
      sectorClass = getClassBySector(entries.sector)
    }

    let column = {xs: 6, md: 4};
    let sector = entries.sector;


    let body = (
      <Col onClick={this.handleClick.bind(this)} xs={column.xs} md={column.md} >
        <div className={"stockCard"}>
            <h4>{entries.ticker} <span className="stockName">{entries.name} </span></h4>
          <div className={"basics"}>

          <div className="cardContent">
              <Well>
                <span className="lastPrice">{entries.lastPrice}</span> <span
                className={"tickerUpDown  " + profitColorClass}> {entries.first.changeString} ({entries.first.percentChangeString})</span>
              </Well>
              <ListGroup>
                <ListGroupItem>
                  <span className="prop">Average Price</span>
                  <div className="val">{entries.averagePrice} (x {entries.amount})</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Cost Base </span>
                  <div className="val">{entries.costBase}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Market Value </span>
                  <div className="val">{entries.marketValue}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Dividends Collected </span>
                  <div className="val">{entries.total_dividends}</div>
                </ListGroupItem>
                <ListGroupItem bsStyle={entries.style}>
                  <span className="prop">P/L </span>
                  <div className="val">{entries.profitLoss} ({entries.totalChangePercentageString})</div>
                </ListGroupItem>
              </ListGroup>
            </div>
            <SectorComponent cx={sectorClass} sector={sector}/>
          </div>
        </div>
      </Col>
    );

    return body;
  }
}

StockCard.displayName = 'StockCard';

export default StockCard;
