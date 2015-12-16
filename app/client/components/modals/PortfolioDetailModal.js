import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import {getUniqueColor, getClassBySector} from '../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../ui/SectorComponent';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);

    console.log("-----");
    console.log(props);
    console.log(props.rt);

    //console.log(" > TICKER " , this.props.data.ticker);

    // TODO: CAN I JUST TAKE THIS FROM THE RT OBJECT? WHAT IF THE RT OBJECT IS REALLY BIG?
    //console.log(props.rt[this.props.data.ticker]);
  }

  handleCancel() {
    ModalActionCreators.destroyModal();
  }

  handleSave() {
    ModalActionCreators.destroyModal();
    throw 'Not Implemented yet!';
  }

  handleClick(e){
    console.log("> Delete clicked!");
  }

  render() {
    let tickerData = this.props.data;
    let ticker = tickerData.ticker;

    let tickerExtendedInformation = this.props.rt[ticker];

    console.log("> Showing ", tickerExtendedInformation);

    let sectorClass = '';

    if (tickerData.sector) {
      sectorClass = getClassBySector(tickerData.sector)
    }

    let sector = tickerData.sector;

    let entries =  tickerData.entries.map((stockEntry, i) => {
      console.log(stockEntry.amount);
      return (<tr key={i}>
        <td>{stockEntry.amount}</td>
        <td>{stockEntry.price}</td>
        <td>{moment(stockEntry.date).format('MM/DD/YYYY')}</td>
        <td>
          <button type="button" onClick={this.handleClick.bind(this)} className="btn btn-danger btn-xs" title="Click to delete this position from your portfolio.">
            <i className="tiny material-icons">delete</i>
          </button>
        </td>
      </tr>);
    });

    return <Modal show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          {tickerData.ticker} <span className="small">({tickerData.lastPrice})</span>
          <span className="stockName">{tickerData.name} </span>
          <br />

          <SectorComponent cx={sectorClass} sector={sector}/>

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Chart here
        </div>
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
            <row>
              <ListGroup className="col-md-6">
                <ListGroupItem>
                  <span className="prop">Cost Base </span>

                  <div className="val">{tickerData.costBase}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Market Value </span>

                  <div className="val">{tickerData.marketValue}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Dividends Collected </span>

                  <div className="val">{tickerData.total_dividends}</div>
                </ListGroupItem>
                <ListGroupItem bsStyle={tickerData.style}>
                  <span className="prop">P/L </span>

                  <div className="val">{tickerData.profitLoss} ({tickerData.totalChangePercentageString})</div>
                </ListGroupItem>
              </ListGroup>

              <ListGroup className="col-md-6">
                <ListGroupItem>
                  <span className="prop">435 Day high</span>

                  <div className="val">{tickerData.averagePrice} (x {tickerData.amount})</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">435 Day low</span>

                  <div className="val">{tickerData.costBase}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">435 Day avg price</span>

                  <div className="val">{tickerData.marketValue}</div>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="prop">Your Dividend Yield</span>

                  <div className="val">{tickerData.total_dividends}</div>
                </ListGroupItem>
              </ListGroup>
            </row>
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

        <div className="row">
        <span className="small">
          <ul className="list-unstyled col-xs-6 col-sm-3">
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

          <ul className="list-unstyled col-xs-6 col-sm-3">
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

          <ul className="list-unstyled col-xs-6 col-sm-3">
            <li>50 Day Moving Avg.</li>
            <li>200 Day Moving Avg.</li>
            <br />
            <li>Dividends This Year</li>
            <li>Dividends Last Year</li>
            <li>Est Divs. next year</li>
            <br />
            <li>Dividend Yield</li>
          </ul>

           <ul className="list-unstyled col-xs-6 col-sm-3">
             <li>{tickerExtendedInformation['50DayMovingAverage']}</li>
             <li>{tickerExtendedInformation['200DayMovingAverage']}</li>
             <br />
             <li>DIV T Y</li>
             <li>DIV L Y</li>
             <li>E DIV N Y</li>
             <br />
             <li>{tickerExtendedInformation.dividendYield}</li>
           </ul>
          </span>
        </div>
      </Modal.Body>
      <Modal.Footer>

      <span>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save</Button>
      </span>
      </Modal.Footer>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
