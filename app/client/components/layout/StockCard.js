import { Panel , Label, Button, ListGroup, ListGroupItem, Well, Col} from 'react-bootstrap';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import {updateArrayOfEntryCollectionsWithRT} from '../../../shared/helpers/stocks';
import SectorComponent from '../ui/SectorComponent';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import ListGroupRenderer from './ListGroupRenderer';
import numeral from 'numeral';

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
      data: this.props.symbol
    });
  }

  render() {
    let symbol = this.props.symbol;

    let performance = {};
    if (this.props.includeDiv) {
      performance = this.props.symbol.performanceWithDividends;
    }else{
      performance = this.props.symbol.performance;
    }

    let sectorClass = '';
    let profitColorClass = getProfitLossClassname(performance.isUpToday);

    if (performance.sector) {
      sectorClass = getClassBySector(symbol.performance.sector)
    }

    let column = {xs: 6, md: 4};
    let sector = performance.sector;

    if(!performance.profitLoss) return (<div></div>)

    var listGroupToRender = [[
      {
        prop: this.props.lang('averagePrice'),
        value: numeral(performance.averagePrice).format('$0,0.00') + ' x ' + performance.amount,
      },

      {
        prop: this.props.lang('costBase'),
        value: numeral(performance.costBase).format('$0,0.00'),
      },
      {
        prop: this.props.lang('marketValue'),
        value: numeral(performance.marketValue).format('$0,0.00'),
      },

      {
        prop: this.props.lang('dividendsCollected'),
        value: performance.total_dividends,
      },

      {
        prop: this.props.lang('profitLoss'),
        value: ('' + numeral(performance.profitLoss).format('0,0.00') + ' (' + performance.totalChangePercentageString + ')'),
        listGroupItemStyle: performance.style,
      }]
    ];

    let body = (
      <Col onClick={this.handleClick.bind(this)} xs={column.xs} md={column.md}>
        <div className={"stockCard"}>
          <h4>{symbol.symbol} <span className="stockName">{symbol.name} </span></h4>

          <div className={"basics"}>


            <div className="cardContent">
              <Well>
                <span className="lastPrice">{performance.lastPrice}</span> <span
                className={"symbolUpDown  " + profitColorClass}> {performance.changeString} ({performance.percentChangeString})</span>
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
