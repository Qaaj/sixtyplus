import { Route, Redirect } from 'react-router';
import React from 'react';
import Quickstart from '../components/modules/Quickstart';
import Importer from '../components/modules/Importer';

export default (App, uiLanguage) => {
    return (
        <Route component={App}>
            <Route path='/:lang'>
                <Redirect from='/:lang' to='/:lang/Quickstart' />
                <Route path='Quickstart' component={Quickstart} />
                <Route path='Import' component={Quickstart} />
            </Route>

            <Redirect from='/' to={`/${uiLanguage}/Quickstart`} />
        </Route>
    );
};
