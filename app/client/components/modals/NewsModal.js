import { Modal } from 'react-bootstrap';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return <Modal dialogClassName="news-modal" show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          Hello
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src="http://www.insidertradingreport.org/company-shares-of-solarcity-corporation-nasdaqscty-rally-2-92/6199815/">
        </iframe>
      </Modal.Body>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
