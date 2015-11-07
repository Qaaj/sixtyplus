import NotificationActionCreators from '../../actions/NotificationActionCreators';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';

@pureRenderDecorator
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this._timeoutComponent = this._timeoutComponent.bind(this);
    }

    componentDidMount() {
        this._timeoutComponent();
    }

    componentWillUpdate() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }

        this._timeoutComponent();
    }

    _timeoutComponent() {
        if (this.props.notification.delay !== -1) {
            this._timeout = setTimeout(() => {
                this._closeNotification(this.props.notification.delay);
            }, this.props.notification.delay);
        }
    }

    _closeNotification () {
        NotificationActionCreators.setNotification({isVisible: false});
    }

    render () {
        let closeNode = null;

        if (!this.props.loader && this.props.notification.delay === -1) {
            closeNode = <i className='notification-close fa fa-times fa-lg' onClick={this._closeNotification}></i>;
        }

        return (
            <div className={this.props.cx}>
                <div className='notification-message'>
                    <div className='background-overlay'></div>
                    {this.props.loader} {this.props.notification.message}
                </div>
                {closeNode}
            </div>
        );
    }
}

Notification.displayName = 'NotificationComponent';
Notification.propTypes = {
    cx: React.PropTypes.string,
    loader: React.PropTypes.object,
    notification: React.PropTypes.object,
};

export default Notification;
