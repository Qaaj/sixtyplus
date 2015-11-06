import ReactDOM from 'react-dom';
import styles from '../scss/main.scss';
import { Router } from 'react-router';
import routes from './routes/routes';
import Quickstart from './components/Quickstart';

class App extends React.Component {

    constructor(props) {
        super(props);
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

        console.log(this.props);

      
        return (    <div>
                    Helloo  <br />
                    {this.props.children}
                    </div>);
    }
}

const uiLang = window.userLang;

ReactDOM.render(
        <Router  routes={routes(App, uiLang)} />,
        document.getElementById('app')
);