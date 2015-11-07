'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NotificationConstants from '../constants/NotificationConstants';

const NotificationActionCreators = {
    /**
     * Options
     */
    setNotification(options) {
        AppDispatcher.handleViewAction({
            actionType: NotificationConstants.NOTIFICATION_SET,
            options: options,
        });
    },

    destroyNotification() {
        AppDispatcher.handleViewAction({
            actionType: NotificationConstants.NOTIFICATION_DESTROY,
        });
    },
};

export default NotificationActionCreators;