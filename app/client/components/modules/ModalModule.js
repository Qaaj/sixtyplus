import ModalStore from '../../stores/ModalStore';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';
import PortfolioDetailModal from '../modals/PortfolioDetailModal';
import NewsModal from '../modals/NewsModal';
import SectorComponent from '../ui/SectorComponent';

class ModalModule extends React.Component {

  constructor(props) {
    super(props);
    this.store = ModalStore;
    this.state = this.getStateFromStore();
  }

  getStateFromStore() {
    return {
      modal: this.store.getModal(),
    };
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  componentDidMount() {
    this.store.addChangeListener(this._onChange.bind(this));
  }

  _onConfirm(data) {
    ModalActionCreators.setModal({isVisible: false});
    if (this.state.modal.actionConfirm) {
      this.state.modal.actionConfirm(data);
    }
  }

  _onCancel() {
    ModalActionCreators.setModal({isVisible: false});
    if (this.state.modal.actionCancel) {
      this.state.modal.actionCancel();
    }
  }

  render() {


    let cx = 'modal';
    let modalNode = null;

    if (this.state.modal && this.state.modal.isVisible) {
      switch (this.state.modal.type) {

        case ModalConstants.PORTFOLIO_DETAIL:
          cx += ' modal--portfolioDetail';
          modalNode = <PortfolioDetailModal {...this.props} onConfirm={this._onConfirm.bind(this)}
                                                            onCancel={this._onCancel.bind(this)}
                                                            message={this.state.modal.message}
                                                            data={this.state.modal.data} />;
          break;

        case ModalConstants.NEWS_ITEM:
          cx += ' modal--newsItem';
          modalNode = <NewsModal {...this.props} onConfirm={this._onConfirm.bind(this)}
                                                            onCancel={this._onCancel.bind(this)}
                                                            message={this.state.modal.message}
                                                            url={this.state.modal.data}/>;
          break;

        default:

      }
    }


    return (
      <span className={cx}>
                {modalNode}
            </span>
    );
  }
}

ModalModule.displayName = 'ModalModule';
export default ModalModule;
