import { Modal } from 'react-bootstrap';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props);
    return <Modal dialogClassName="news-modal" show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          <a href={this.props.url}>{this.props.url}</a>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={this.props.url}>
        </iframe>
      </Modal.Body>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;
