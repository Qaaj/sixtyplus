import { Modal, Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import {getUniqueColor, getClassBySector} from '../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../ui/SectorComponent';
import {getMonthlyChart} from '../../../shared/helpers/charts';
import C3DividendPaymentChart from '../charts/C3DividendPaymentChart';
import {updateArrayOfEntryCollectionsWithRT, updatePortfolioDividends} from '../../../shared/helpers/stocks';
import ListGroupRenderer from '../layout/ListGroupRenderer.js';
import {getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSave() {
    ModalActionCreators.destroyModal();
    throw 'Not Implemented yet!';
  }

  handleClick(e) {
    console.log("> Delete clicked!");
  }

  render() {
    let tickerData = this.props.data;
    let ticker = tickerData.ticker;

    let tickerExtendedInformation = this.props.rt[ticker];

    console.log("> Showing ", tickerData);

    let sectorClass = '';

    if (tickerData.sector) {
      sectorClass = getClassBySector(tickerData.sector)
    }

    let sector = tickerData.sector;

    let entries = tickerData.entries.map((stockEntry, i) => {

      return (<tr key={i}>
        <td>{stockEntry.amount}</td>
        <td>{stockEntry.price}</td>
        <td>{moment(stockEntry.date).format('MM/DD/YYYY')}</td>
        <td>
          <button type="button" onClick={this.handleClick.bind(this)} className="btn btn-danger btn-xs"
                  title="Click to delete this position from your portfolio.">
            <i className="tiny material-icons">delete</i>
          </button>
        </td>
      </tr>);
    });

    if (!this.props.user.stockPortfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}> Whoops! You don't seem to have a portfolio. Head over to <a
        href={"#/Import"}>Importer</a> to change that.</Grid>);

    let portfolio = this.props.user.stockPortfolio;

    updateArrayOfEntryCollectionsWithRT(portfolio, this.props.rt);
    updatePortfolioDividends(portfolio, this.props.historical);

    let chartData = getMonthlyChart(portfolio, this.props.historical);

    let listGroupsToRender = [
      // COLUMN 1
      [{
        prop: "Cost Base ",
        value: tickerData.costBase,
      },

      {
        prop: "Market Value",
        value: tickerData.marketValue,
      },

      {
        prop: "Dividends Collected",
        value: tickerData.total_dividends,
      },

      {
        prop: "P/L",
        value: ('' + tickerData.profitLoss + '(' + tickerData.totalChangePercentageString + ')'),
        listGroupItemStyle: tickerData.style,
      }],

      // COLUMN 2
      [{
        prop: "435 Day High",
        value: tickerData['435DayHigh'],
        },

        {
          prop: "435 Day Low",
          value: tickerData['435DayLow'],
        },

        {
          prop: "435 Day avg price",
          value: tickerData['435DayAvgPrice'],
        },

        {
          prop: "Your Dividend Yield",
          value: tickerData.total_dividends,
        }]
    ];

    return (<Modal show={true} onHide={this.props.onCancel} dialogClassName="portfolio-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {tickerData.ticker} <span className="small">({tickerData.lastPrice})</span>

          <span className="stockName text-right">{tickerData.name} </span>
          <br />

          <SectorComponent cx={sectorClass} sector={sector}/>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <C3DividendPaymentChart data={chartData}/>

        <h4>Your positions</h4>

        <table className="table table-striped">
          <thead>
          <tr>
            <th>Amount</th>
            <th>Price</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
          </thead>

          <tbody>
          { entries }
          </tbody>
        </table>

        <div className="statsComponent">
          <div className="container-fluid">
            <Row>
              <ListGroupRenderer data={listGroupsToRender} md={6} />
            </Row>
          </div>

        </div>

        <h4>Analysis</h4>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-4">
              <span>
                <img src="http://placehold.it/75x75"/>

                <p>Bla bla bla BX is so cool I swear it. This is a paragraph whut. Nobody seems to care.</p>
              </span>
            </div>

            <div className="col-xs-4">
              <img src="http://placehold.it/75x75"/>

              <p>Bla bla bla BX is so cool I swear it. This is a paragraph whut. Nobody seems to care.</p>
            </div>

            <div className="col-xs-4">
              <img src="http://placehold.it/75x75"/>

              <p>Bla bla bla BX is so cool I swear it. This is a paragraph whut. Nobody seems to care.</p>
            </div>
          </div>
        </div>

        <h4>About {tickerData.ticker}</h4>
        <Row>
          <Col xs={6} sm={3}>
            <ul className="list-unstyled small">
              <li>P/E</li>
              <li>1 Year Price Target</li>
              <li>Book Value</li>
              <li>52 Wk High</li>
              <li>52 Wk Low</li>
              <li>Change from 52Wk High</li>
              <li>EPS</li>
              <li>EPS Current Year (est)</li>
              <li>EPS Next Year (est)</li>
            </ul>
          </Col>
          <Col xs={6} sm={3}>
            <ul className="list-unstyled small">
              <li>{tickerExtendedInformation.peRatio}</li>
              <li>{tickerExtendedInformation['1YrTargetPrice']}</li>
              <li>{tickerExtendedInformation.bookValue}</li>
              <li>{tickerExtendedInformation['52WkHigh']}</li>
              <li>{tickerExtendedInformation['52WkLow']}</li>
              <li>{tickerExtendedInformation.changeFrom52WeekHigh}</li>
              <li>{tickerExtendedInformation.earningsPerShare}</li>
              <li>{tickerExtendedInformation.epsEstimateCurrentYear}</li>
              <li>{tickerExtendedInformation.epsEstimateNextYear}</li>
            </ul>
          </Col>
          <Col xs={6} sm={3}>
            <ul className="list-unstyled small">
              <li>50 Day Moving Avg.</li>
              <li>200 Day Moving Avg.</li>
              <br />
              <li>Dividends This Year</li>
              <li>Dividends Last Year</li>
              <li>Est Divs. next year</li>
              <br />
              <li>Dividend Yield</li>
            </ul>
          </Col>
          <Col xs={6} sm={3}>
            <ul className="list-unstyled small">
              <li>{tickerExtendedInformation['50DayMovingAverage']}</li>
              <li>{tickerExtendedInformation['200DayMovingAverage']}</li>
              <br />
              <li>DIV T Y</li>
              <li>DIV L Y</li>
              <li>E DIV N Y</li>
              <br />
              <li>{tickerExtendedInformation.dividendYield}</li>
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>

      <span>
        <Button onClick={this.props.onCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save</Button>
      </span>
      </Modal.Footer>
    </Modal>);
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';

PortfolioDetailModal.PropTypes = {
  rt: React.PropTypes.obj,
  user: React.PropTypes.string,
};

export default PortfolioDetailModal;
