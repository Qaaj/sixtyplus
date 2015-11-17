'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import NotificationConstants from '../constants/NotificationConstants';
import asap from 'asap';

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

    doError(msg){
        this.setNotification({
            isVisible: true,
            type: 'warning',
            message: msg,
            delay: 3000
        });
    },

    userLoggedIn(user) {
        asap(() =>{

            if(user.last_login == null){
                this.setNotification({
                    isVisible: true,
                    type: 'success',
                    message:"Hi there! Everything will be automatically saved for your next visit.",
                    delay: 3000
                });
            }else{
                this.setNotification({
                    isVisible: true,
                    type: 'success',
                    message:"Welcome back! Your last visit was on " + user.last_login,
                    delay: 5000
                });
            }
        });

    },
};

export default NotificationActionCreators;
