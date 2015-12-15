import { Modal } from 'react-bootstrap';

class PortfolioDetailModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.news);
    return <Modal dialogClassName="news-modal" show={true} onHide={this.props.onCancel} className=''>
      <Modal.Header closeButton>
        <Modal.Title>
          <a href={this.props.news.link} target="_blank">{this.props.news.title}</a>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={this.props.news.link}>
        </iframe>
      </Modal.Body>
    </Modal>
  }
}

PortfolioDetailModal.displayName = 'PortfolioDetailModal';


export default PortfolioDetailModal;