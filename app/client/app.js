import ReactDOM from 'react-dom';
import styles from '../../scss/main.scss';
import { Router } from 'react-router';
import routes from './routes/routes';
import Header from './components/layout/Header';
import Quickstart from './components/modules/Quickstart';

import UserActionCreators from './actions/UserActionCreators';
import UserStore from './stores/UserStore';

import Notification from './components/modules/NotificationModule';
import NotificationActionCreators from './actions/NotificationActionCreators';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserStore.getUser()
        }

        this._handleUserStoreChange = this._handleUserStoreChange.bind(this);

        UserActionCreators.loadUser();
    }

    _handleUserStoreChange() {

        let user = UserStore.getUser();

        this.setState({
            user: user,
        });

        NotificationActionCreators.userLoggedIn(user);

    }

    componentWillUpdate(nextProps) {}

    componentDidMount() {
        UserStore.addChangeListener(this._handleUserStoreChange);
    }

    componentWillUnmount() {}


    render() {


        const history = this.props.history;
        const location = this.props.location;
        const params = this.props.params;

        return (<div>
                    <Header />
                    <Notification />

                    {React.cloneElement(
                        this.props.children, {
                            history: history,
                            location: location,
                            urlParams: params,
                            user: this.state.user,
                        }
                    )}
                </div>);
    }
}

const uiLang = window.userLang;

ReactDOM.render(
        <Router  routes={routes(App, uiLang)} />,
        document.getElementById('app')
);
