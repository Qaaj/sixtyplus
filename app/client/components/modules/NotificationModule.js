import ReactTransitionGroup from 'react-addons-css-transition-group';
import NotificationStore from '../../stores/NotificationStore';
import Notification from '../../components/layout/NotificationComponent';

class NotificationModule extends React.Component {

    constructor(props) {
        super(props);
        this.store = NotificationStore;
        this.state = this.getStateFromStore();
    }

    getStateFromStore() {
        return {
            notification: this.store.getNotification(),
        };
    }

    _onChange() {
        this.setState(this.getStateFromStore());
    }

    componentDidMount() {
        this.store.addChangeListener(this._onChange.bind(this));
    }

    render() {
        let cx = 'notification';
        let notificationNode = null;
        let loader = null;

        switch (this.state.notification.type) {
            case 'info':
                cx += ' notification--info';
                break;
            case 'warning':
                cx += ' notification--warning';
                break;
            case 'success':
                cx += ' notification--success';
                break;
            case 'loader':
                cx += ' notification--loader';
                loader = <i className='spin small'></i>;
                break;
            default:
                cx += ' notification--info';
        }

        if (this.state.notification && this.state.notification.isVisible) {
            notificationNode = <Notification
                                loader={loader}
                                notification={this.state.notification}
                                cx={cx} />;
        }

        return (
            <ReactTransitionGroup
                transitionEnterTimeout={200}
                transitionLeaveTimeout={250}
                transitionName='notification-animation'>
                {notificationNode}
            </ReactTransitionGroup>
        );
    }
}

NotificationModule.displayName = 'GridAdvancedHeaderComponent';
export default NotificationModule;
