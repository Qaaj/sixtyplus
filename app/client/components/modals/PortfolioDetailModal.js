import { Modal, Button } from 'react-bootstrap';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCancel(){
    ModalActionCreators.destroyModal();
  }

  handleSave(){
    ModalActionCreators.destroyModal();
    throw new ('not Implemented yet');
  }

  render() {
    return  <Modal show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          <span><span><span>BX</span>(12.34)</span>The Blackstone Group LP</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Chart here
        </div>
       <h4>Your positions</h4>

        <div className="row">
          <div className="col-xs-6 col-md-4">Column 1</div>
          <div className="col-xs-6 col-md-4">Column 2</div>
          <div className="col-xs-6 col-md-4">Column 3</div>
        </div>

       <h4>Analysis</h4>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-md-4">Amount</div>
            <div className="col-xs-6 col-md-4">Buy price</div>
            <div className="col-xs-6 col-md-4">Date</div>
          </div>

          <div className="row">
            <div className="col-xs-6 col-md-4">1337.22</div>
            <div className="col-xs-6 col-md-4">456.12</div>
            <div className="col-xs-6 col-md-4">27/12/2015</div>
          </div>
        </div>

        <h4>About BX</h4>
      </Modal.Body>
      <Modal.Footer>
      <span>Sector component here<Button onClick={this.handleCancel}>Cancel</Button><Button onClick={this.handleSave}>Save</Button></span>
      </Modal.Footer>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
