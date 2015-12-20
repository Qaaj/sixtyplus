import { Modal, Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import {getUniqueColor, getClassBySector} from '../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../ui/SectorComponent';
import {getMonthlyChart} from '../../../shared/helpers/charts/getMonthlyChart';
import C3PortfolioChart from '../charts/C3PortfolioChart';
import {updateArrayOfEntryCollectionsWithRT, updatePortfolioDividends} from '../../../shared/helpers/stocks';
import ListGroupRenderer from '../layout/ListGroupRenderer.js';
import {getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import TickerDetailsAnalysisComponent from '../layout/TickerDetailsAnalysisComponent';
import TickerDetailsAboutComponent from '../layout/TickerDetailsAboutComponent';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);

    let tickerData = this.props.data;
    let tickerExtendedInformation = this.props.rt[tickerData.ticker];

    const listGroupsToRender = [
      // COLUMN 1
      [{
        prop: this.props.lang('costBase'),
        value: tickerData.costBase,
      },

        {
          prop: this.props.lang('marketValue'),
          value: tickerData.marketValue,
        },

        {
          prop: this.props.lang('dividendsCollected'),
          value: tickerData.total_dividends,
        },

        {
          prop: this.props.lang('profitLoss'),
          value: ('' + tickerData.profitLoss + '(' + tickerData.totalChangePercentageString + ')'),
          listGroupItemStyle: tickerData.style,
        }],

      // COLUMN 2
      [{
        prop: this.props.lang('435DayHigh'),
        value: tickerData['435DayHigh'],
      },

        {
          prop: this.props.lang('435DayLow'),
          value: tickerData['435DayLow'],
        },

        {
          prop: this.props.lang('435DayAveragePrice'),
          value: tickerData['435DayAveragePrice'],
        },

        {
          prop: this.props.lang('dividendYield'),
          value: tickerData.dividendYield,
        }]
    ];

    const analysisData = [
      {
        image: 'http://placehold.it/75x75"/',
        description: 'Boom',
      },

      {
        image: 'http://placehold.it/75x75"/',
        description: 'Chakka',
      },

      {
        image: 'http://placehold.it/75x75"/',
        description: 'Lakka!',
      },
    ];

    const arr = Object.keys(tickerExtendedInformation);
    const amountInFirstColumn = (arr.length / 2);

    const column1 = arr.slice(0, amountInFirstColumn);
    const column2 = arr.slice(amountInFirstColumn + 1, arr.length);

    const aboutDataColumn1 = column1.map((key, i) => {
      return {
        prop: this.props.lang(key),
      }
    });

    const aboutDataColumn2 = column1.map((key, i) => {
      return {
        value: tickerExtendedInformation['' + key],
      }
    });

    const aboutDataColumn3 = column2.map((key, i) => {
      return {
        prop: this.props.lang(key),
      }
    });

    const aboutDataColumn4 = column2.map((key, i) => {
      return {
        value: tickerExtendedInformation['' + key],
      }
    });

    const aboutDetailsData = [
      aboutDataColumn1,
      aboutDataColumn2,
      aboutDataColumn3,
      aboutDataColumn4,
    ];

    this.state = {
      analysisData: analysisData,
      listGroupsToRender: listGroupsToRender,
      aboutDetailsData: aboutDetailsData,
    }
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
    console.log("----" , portfolio);
    updateArrayOfEntryCollectionsWithRT(portfolio, this.props.rt);
    updatePortfolioDividends(portfolio, this.props.historical);

    let chartData = getMonthlyChart(portfolio, this.props.historical);


    console.log('' + tickerData.ticker + ':' + 'filter  ', portfolio.entryCollectionList.filter(function (stockEntryCollection) {
      return stockEntryCollection.ticker == tickerData.ticker
    }));

    let chartDetailData = [portfolio.entryCollectionList.filter(function (stockEntryCollection) {
      return stockEntryCollection.ticker == tickerData.ticker
    })];

    console.log('portfolio ', portfolio.flatTickerList);
    //portfolio.flatTickerList = chartDetailData;

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

        <C3PortfolioChart portfolio={portfolio} historical={this.props.historical} lang={this.props.lang} filterByTicker={tickerData.ticker} />

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
              <ListGroupRenderer data={this.state.listGroupsToRender} md={6}/>
            </Row>
          </div>

        </div>

        <TickerDetailsAnalysisComponent data={this.state.analysisData}/>

        <TickerDetailsAboutComponent data={this.state.aboutDetailsData} title={tickerData.ticker}/>
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
