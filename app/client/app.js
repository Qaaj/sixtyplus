import ReactDOM from 'react-dom';
import styles from '../../scss/main.scss';
import { Router } from 'react-router';
import routes from './routes/routes';
import Header from './components/layout/Header';
import Quickstart from './components/modules/Quickstart';

import { getUserObject } from './config/User';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: getUserObject()
        }
    }

    componentWillUpdate(nextProps) {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {

        const history = this.props.history;
        const location = this.props.location;
        const params = this.props.params;

        return (<div>
                    <Header />

                    {React.cloneElement(
                        this.props.children, {
                            history: history,
                            location: location,
                            urlParams: params,
                            userObject: this.state.user,
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
