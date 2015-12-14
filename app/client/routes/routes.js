import { Route, Redirect } from 'react-router';
import React from 'react';
import Quickstart from '../components/modules/QuickstartModule';
import Importer from '../components/modules/ImporterModule';
import News from '../components/modules/NewsModule';
import PortfolioOverview from '../components/modules/PortfolioOverviewModule';

export default (App, uiLanguage) => {
    return (
        <Route component={App}>
            <Route path='Quickstart' component={Quickstart} />
            <Route path='Import' component={Importer} />
            <Route path='Portfolio' component={PortfolioOverview} />
            <Route path='News' component={News} />
            <Redirect from='/' to={`/Import`} />
        </Route>
    );
};
