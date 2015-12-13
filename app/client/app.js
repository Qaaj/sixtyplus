import ReactDOM from 'react-dom';
import styles from '../../scss/main.scss';
import { Router } from 'react-router';
import routes from './routes/routes';
import Header from './components/layout/Header';
import TopMenu from './components/layout/TopMenu';
import Quickstart from './components/modules/QuickstartModule';

import UserActionCreators from './actions/UserActionCreators';

import UserStore from './stores/UserStore';
import RealTimeStore from './stores/RealTimeStore';
import HistoricalStore from './stores/HistoricalStore';

import Notification from './components/modules/NotificationModule';


// UID 1446931000055-1371

class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.getUser()
    };

    this._handleUserStoreChange = this._handleUserStoreChange.bind(this);
    this._handleRealTimeStoreChange = this._handleRealTimeStoreChange.bind(this);
    this._handleHistoricalStoreChange = this._handleHistoricalStoreChange.bind(this);

    UserActionCreators.loadUser();
  }

  _handleUserStoreChange() {
    let user = UserStore.getUser();
    this.setState({
      user: user,
    });
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
  }

  render() {

    const history = this.props.history;
    const location = this.props.location;
    const params = this.props.params;

    return (<div>

      <Header location={location} />
      <TopMenu history={history} location={location} urlParams={params} lang={this.state.user.lang} />

      <Notification />

      {React.cloneElement(
        this.props.children, {
          lang:this.state.user.lang,
          history: history,
          location: location,
          urlParams: params,
          user: this.state.user,
          rt: this.state.rt,
          historical: this.state.historical,
        }
      )}

    </div>);
  }
}


ReactDOM.render(
  <Router routes={routes(App)}/>,
  document.getElementById('app')
);
