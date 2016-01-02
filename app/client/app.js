import ReactDOM from 'react-dom';
import styles from '../../scss/main.scss';
import { Router } from 'react-router';
import routes from './routes/routes';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import Modal from './components/modules/ModalModule';

import UserActionCreators from './actions/UserActionCreators';

import UserStore from './stores/UserStore';
import RealTimeStore from './stores/RealTimeStore';
import HistoricalStore from './stores/HistoricalStore';
import PortfolioStore from './stores/PortfolioStore';

import Notification from './components/modules/NotificationModule';


// UID 1446931000055-1371

class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.getUser(),
      portfolio: PortfolioStore.getPortfolio()
    };

    this._handleUserStoreChange = this._handleUserStoreChange.bind(this);
    this._handleRealTimeStoreChange = this._handleRealTimeStoreChange.bind(this);
    this._handleHistoricalStoreChange = this._handleHistoricalStoreChange.bind(this);
    this._handlePortfolioStoreChange = this._handlePortfolioStoreChange.bind(this);

    UserActionCreators.loadUser();
  }

  _handleUserStoreChange() {
    let user = UserStore.getUser();
    this.setState({
      user: user,
    });
  }

  _handlePortfolioStoreChange() {
    let portfolio = PortfolioStore.getPortfolio();
    this.setState({ portfolio });
  }

  _handleRealTimeStoreChange() {
    let rt = RealTimeStore.getRealTimeData();
    this.setState({
      rt: rt,
    });
  }

  _handleHistoricalStoreChange() {
    let historical = HistoricalStore.getHistoricalData();
    this.setState({
      historical: historical,
    });
  }

  componentDidMount() {
    UserStore.addChangeListener(this._handleUserStoreChange);
    RealTimeStore.addChangeListener(this._handleRealTimeStoreChange);
    HistoricalStore.addChangeListener(this._handleHistoricalStoreChange);
    PortfolioStore.addChangeListener(this._handlePortfolioStoreChange);
  }

  render() {

    const history = this.props.history;
    const location = this.props.location;
    const params = this.props.params;


    return (<div>

      <Menu history={history} location={location} urlParams={params} lang={this.state.user.get('lang')}/>
      <Notification />

      <div className="application">
        {React.cloneElement(
          this.props.children, {
            lang: this.state.user.get('lang'),
            history: history,
            location: location,
            urlParams: params,
            user: this.state.user,
            portfolio: this.state.portfolio,
          }
        )}
      </div>

      <Modal
        lang={this.state.user.get('lang')}
        history={history}
        location={location}
        urlParams={params}
        user={this.state.user}
        portfolio={this.state.portfolio}
      />

    </div>);
  }
}


ReactDOM.render(
  <Router routes={routes(App)}/>,
  document.getElementById('app')
);
