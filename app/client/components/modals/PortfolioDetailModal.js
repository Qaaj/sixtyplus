import { Modal, Button } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import {getUniqueColor, getClassBySector} from '../../../shared/helpers/colors/ColorUtils';
import SectorComponent from '../ui/SectorComponent';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCancel(){
    ModalActionCreators.destroyModal();
  }

  handleSave(){
    ModalActionCreators.destroyModal();
    throw 'Not Implemented yet!';
  }

  render() {
    let tickerData = this.props.data;

    console.log("> Showing " , tickerData);

    let sectorClass = '';

    if (tickerData.sector) {
      sectorClass = getClassBySector(tickerData.sector)
    }

    let sector = tickerData.sector;

    return  <Modal show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          <span><span><span>{tickerData.ticker}</span>({tickerData.lastPrice})</span>{tickerData.name}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Chart here
        </div>
       <h4>Your positions</h4>

        <div className="row">
          <div className="col-xs-6 col-md-4">Amount</div>
          <div className="col-xs-6 col-md-4">Price</div>
          <div className="col-xs-6 col-md-4">Date</div>
        </div>

       <h4>Analysis</h4>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-md-4">Amount</div>
            <div className="col-xs-6 col-md-4">Buy price</div>
            <div className="col-xs-6 col-md-4">Date</div>
          </div>
        </div>

        <h4>About {tickerData.ticker}</h4>
      </Modal.Body>
      <Modal.Footer>

      <span><SectorComponent cx={sectorClass} sector={sector}/></span>

      <span>
        <Button onClick={this.handleCancel}>Cancel</Button>
        <Button onClick={this.handleSave}>Save</Button></span>
      </Modal.Footer>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
