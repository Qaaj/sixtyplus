import { Modal } from 'react-bootstrap';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {


    return  <Modal show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          Hello
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       Cool
      </Modal.Body>
      <Modal.Footer>
      Bottom
      </Modal.Footer>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
