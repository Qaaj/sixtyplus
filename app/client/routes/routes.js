import { Route, Redirect } from 'react-router';
import React from 'react';
import Planner from '../components/modules/PlannerModule';
import Importer from '../components/modules/ImporterModule';
import News from '../components/modules/NewsModule';
import Dividends from '../components/modules/DividendModule';
import Settings from '../components/modules/SettingsModule';
import Quickstart from '../components/modules/QuickstartModule';
import PortfolioOverview from '../components/modules/PortfolioOverviewModule';

export default (App, uiLanguage) => {
    return (
        <Route component={App}>
            <Route path='Planner' component={Planner} />
            <Route path='Import' component={Importer} />
            <Route path='Portfolio' component={PortfolioOverview} />
            <Route path='News' component={News} />
            <Route path='Dividends' component={Dividends} />
            <Route path='Settings' component={Settings} />
            <Route path='Quickstart' component={Quickstart} />
            <Redirect from='/' to={`/Quickstart`} />
        </Route>
    );
};
