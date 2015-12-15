import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import {getUniqueColor, getClassBySector} from '../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../ui/SectorComponent';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCancel() {
    ModalActionCreators.destroyModal();
  }

  handleSave() {
    ModalActionCreators.destroyModal();
    throw 'Not Implemented yet!';
  }

  render() {
    let tickerData = this.props.data;

    console.log("> Showing ", tickerData);

    let sectorClass = '';

    if (tickerData.sector) {
      sectorClass = getClassBySector(tickerData.sector)
    }

    let sector = tickerData.sector;

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
          <tr>
            <td>1337.00</td>
            <td>949.22$</td>
            <td>24-12-2015</td>
            <td>
              <button type="button" className="btn btn-danger" title="Click to delete this position from your portfolio.">
                <i className="large material-icons">delete</i>
              </button>
            </td>
          </tr>

          <tr>
            <td>1337.00</td>
            <td>949.22$</td>
            <td>24-12-2015</td>
            <td><i className="large material-icons">delete</i></td>
          </tr>

          <tr>
            <td>1337.00</td>
            <td>949.22$</td>
            <td>24-12-2015</td>
            <td><i className="large material-icons">delete</i></td>
          </tr>
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
          <ul className="list-unstyled col-md-6">
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

          <ul className="list-unstyled col-md-6">
            <li>50 Day Moving Avg.<span>12</span></li>
            <li>200 Day Moving Avg.</li>
            <li>Book Value</li>
            <br />
            <li>Dividends This Year</li>
            <li>Dividends Last Year</li>
            <li>Est Dividends next year</li>
            <br />
            <li>Dividend Yield</li>
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
