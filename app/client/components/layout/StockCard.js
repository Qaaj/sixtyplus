import { Panel , Label, Button, ListGroup, ListGroupItem, Well, Col} from 'react-bootstrap';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import {updateArrayOfEntryCollectionsWithRT} from '../../../shared/helpers/stocks';
import SectorComponent from '../ui/SectorComponent';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import ListGroupRenderer from './ListGroupRenderer';

@pureRenderDecorator
class StockCard extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      expanded: false
    }

  }

  handleClick() {
    ModalActionCreators.setModal({
      isVisible: true,
      type: ModalConstants.PORTFOLIO_DETAIL,
      data: this.props.entries.data
    });
  }

  render() {

    if (!this.props.entries || this.props.entries.length == 0) return null;

    //let entries = this.props.entries;
    let entries = this.props.entries.data;
    if (this.props.includeDiv) entries = this.props.entries.dataWithDividends;

    let sectorClass = '';
    let profitColorClass = getProfitLossClassname(entries.first.isUpToday);

    if (entries.sector) {
      sectorClass = getClassBySector(entries.sector)
    }

    let column = {xs: 6, md: 4};
    let sector = entries.sector;

    var listGroupToRender = [[
      {
        prop: 'Average Price',
        value: entries.averagePrice * entries.amount
      },

      {
        prop: 'Cost Base',
        value: entries.costBase
      },
      {
        prop: 'Market Value',
        value: entries.marketValue
      },

      {
        prop: 'Dividends Collected',
        value: entries.total_dividends
      },

      {
        prop: 'P/L',
        value: ('' + entries.profitLoss + '(' + entries.totalChangePercentageString + ')')
      }]
    ];

    let body = (
      <Col onClick={this.handleClick.bind(this)} xs={column.xs} md={column.md}>
        <div className={"stockCard"}>
          <h4>{entries.ticker} <span className="stockName">{entries.name} </span></h4>

          <div className={"basics"}>

            <div className="cardContent">
              <Well>
                <span className="lastPrice">{entries.lastPrice}</span> <span
                className={"tickerUpDown  " + profitColorClass}> {entries.first.changeString}
                ({entries.first.percentChangeString})</span>
              </Well>

              <ListGroupRenderer data={listGroupToRender} />

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
