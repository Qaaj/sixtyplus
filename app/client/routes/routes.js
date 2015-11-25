import { Route, Redirect } from 'react-router';
import React from 'react';
import Quickstart from '../components/modules/QuickstartModule';
import Importer from '../components/modules/ImporterModule';
import PortfolioOverview from '../components/modules/PortfolioOverviewModule';

export default (App, uiLanguage) => {
    return (
        <Route component={App}>
            <Route path='/:lang'>
                <Redirect from='/:lang' to='/:lang/Import' />
                <Route path='Quickstart' component={Quickstart} />
                <Route path='Import' component={Importer} />
                <Route path='Portfolio' component={PortfolioOverview} />
            </Route>

            <Redirect from='/' to={`/${uiLanguage}/Import`} />
        </Route>
    );
};
