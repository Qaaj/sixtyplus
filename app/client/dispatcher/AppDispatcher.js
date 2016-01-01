/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

import { Dispatcher } from 'flux';
import assign from 'object-assign';

let devEnv = false;

if (typeof window !== 'undefined') {
    devEnv = window.location.host.indexOf('localhost') > -1 ||
    window.location.host.indexOf('dev') > -1 ? true : false;
}

const AppDispatcher = assign(new Dispatcher(), {
    /**
     * A bridge function between the views and the dispatcher, marking the action
     * as a view action.  Another variant here could be handleServerAction.
     * @param  {object} action The data coming from the view.
     */
        handleViewAction(action) {
        if (devEnv) {
         //console.info('dispatcher view', action.actionType, action);
         }

        this.dispatch({
            source: 'VIEW_ACTION',
            action: action,
        });
    },

    handleServerAction(action) {
        if (devEnv) {
         //console.info('dispatcher server', action);
        }
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action,
        });
    },
});

export default AppDispatcher;
