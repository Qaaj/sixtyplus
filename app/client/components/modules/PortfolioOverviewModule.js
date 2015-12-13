/**
 * Created by janjorissen on 11/16/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import UserActionCreators from '../../actions/UserActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import SingleStock from '../importer/ui/SinglePreviewImportStock';
import StockTable from '../tables/StockTable';
import { Input, Grid, DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup,ListGroup,ListGroupItem } from 'react-bootstrap';
import {updateArrayOfEntryCollectionsWithRT, updatePortfolioDividends} from '../../../shared/helpers/stocks';
import {getMonthlyChart} from '../../../shared/helpers/charts';
import C3PortfolioChart from '../charts/C3PortfolioChart';


class PortfolioOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sorter: {
                key: 'profitLoss',
                reverse: true
            },
            filter: 'All',
            includeDiv: true
        }

        this.sortReverse = true;

        this.sortKeys = [
            {
                name: 'Profit/Loss',
                prop: 'profitLoss'
            },
            {
                name: 'Market Value',
                prop: 'marketValue'
            },
            {
                name: 'Sector',
                prop: 'sector'
            },
            {
                name: 'Ticker',
                prop: 'ticker'
            },
            {
                name: 'Dividends',
                prop: 'total_dividends'
            },
            {
                name: '# Shares',
                prop: 'amount'
            },

        ];


        this.filters = ['All', 'Profit', 'Loss'];


        this.filterItems = this.filters.map(::this.createFilters);
        this.dropdownItems = this.sortKeys.map(this.createDropdown);
    }

    _onSelect(e, key) {

        this.sortReverse = !this.sortReverse;

        let sorter = {
            key: key,
            reverse: this.sortReverse
        }

        this.setState({'sorter': sorter});

    }

    onDividendCheckboxClick() {
        this.setState({
            includeDiv: !this.state.includeDiv
        })
    }

    createFilters(filter, i) {
        let selected = (filter === this.state.filter) ? 'primary' : 'default';
        return <Button bsStyle={selected} onClick={()=> this.setState({'filter': filter})} eventKey={filter}
                       key={'filter'+i}>{filter}</Button>;
    }

    createDropdown(sorter, i) {
        return <MenuItem eventKey={sorter.prop} key={'sorter_'+i}>{sorter.name}</MenuItem>;
    }

    _onDeletePortfolioDataClickHandler() {
        let resultObject = {
            success: () => { console.log("ok, succes triggered in result object") },
            fail: () => { console.log("nok triggered in result object") }
        }

        UserActionCreators.deleteUserPortfolioData(resultObject);
    }

    render() {


        if (!this.props.user.userData || !this.props.user.userData.portfolio) return (<Grid style={{'textAlign':'center','padding':'20px'}}> There
            doesn't seem to be anything here! Head over to the <a href={"#/" +this.props.lang +"/Import"}>Importer</a> to change that.</Grid>);

        if (!this.props.rt) return (<Grid style={{'textAlign':'center','padding':'20px'}}>
            <div className="loader"></div>
        </Grid>);

        this.filterItems = this.filters.map(::this.createFilters);

        let portfolio = this.props.user.stockPortfolio;


        updateArrayOfEntryCollectionsWithRT(portfolio, this.props.rt);
        updatePortfolioDividends(portfolio, this.props.historical);
        let chartData = getMonthlyChart(portfolio, this.props.historical);

        let stockEntries = portfolio.collectionList;

        let dividends = stockEntries.reduce((prev, curr) => {
            if (curr.total_dividends) prev += curr.total_dividends;
            return prev;
        }, 0);

        let portfolioData = portfolio.portfolioStats;
        if (this.state.includeDiv) portfolioData = portfolio.portfolioStatsWithDividends;


        let currentSortName = this.sortKeys.filter((sorter) => {
            if (sorter.prop === this.state.sorter.key) return 1;
        })[0].name;


        let profitOrLoss = 'success';
        if (portfolioData.profitLoss < 0) profitOrLoss = 'danger';

        return (

            <div className="portfolio-page">
                <Grid>
                    <C3PortfolioChart data={chartData}/>
                    <ul>
                        <li>Click on a label to toggle active state.</li>
                        <li>Alt + Click on a label to disable other tickers.</li>
                    </ul>
                    <ListGroup>
                        <ListGroupItem bsStyle={profitOrLoss}>
                            <span className="prop">Profit/Loss: </span>

                            <div className="val">{portfolioData.profitLoss} ({portfolioData.percent_change_string})
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span className="prop">Dividends Collected: </span>

                            <div className="val">{dividends}</div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span className="prop">Portfolio Market Value: </span>

                            <div className="val">{portfolioData.marketValue}</div>
                        </ListGroupItem>
                    </ListGroup>

                    <div className="filter">
                        <ButtonToolbar>
                            <ButtonGroup>
                                {this.filterItems}
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                    <div className="sorter">
                        <DropdownButton onSelect={::this._onSelect} bsStyle={'default'}
                                        title={'Sorted by: ' + currentSortName}
                                        id="sorter-dropdown">
                            {this.dropdownItems}
                        </DropdownButton>
                    </div>
                    <div className="checkBoxes">
                        <Input type="checkbox" label="Include Dividends in P/L" checked={this.state.includeDiv}
                               onChange={this.onDividendCheckboxClick.bind(this)}/>
                    </div>
                </Grid>
                <Grid>
                    <div className='portfolioOverview'>
                        <StockTable rt={this.props.rt} user={this.props.user} sorter={this.state.sorter}
                                    filter={this.state.filter} entries={stockEntries} historical={this.props.historical}
                                    includeDiv={this.state.includeDiv}/>

                        <Button onClick={this._onDeletePortfolioDataClickHandler} bsStyle="danger" bsSize="medium">Delete portfolio data</Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

PortfolioOverview.displayName = 'PortfolioOverview';
PortfolioOverview.PropTypes = {
    history: React.PropTypes.obj,
    location: React.PropTypes.obj,
    urlParams: React.PropTypes.obj,
    rt: React.PropTypes.obj,
    user: React.PropTypes.string,
};

export default PortfolioOverview;
