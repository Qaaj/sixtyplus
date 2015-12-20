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
import { Input, Grid, DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup,ListGroup,ListGroupItem, Popover, OverlayTrigger, Panel } from 'react-bootstrap';
import {updateArrayOfEntryCollectionsWithRT, updatePortfolioDividends} from '../../../shared/helpers/stocks';
import C3PortfolioChart from '../charts/C3PortfolioChart';
import {round} from '../../../shared/helpers/formatting';
import HelpIcon from '../ui/HelpIcon';
import Sorter from '../ui/Sorter';
import Filter from '../ui/FilterButtons';

class PortfolioOverview extends React.Component {

  constructor(props) {
    super(props);

    this.sortingKeys = ['profitLoss','marketValue','sector','ticker','total_dividends','amount'];
    this.filterKeys = ['all', 'profit', 'loss'];

    this.state = {
      sorter : {
        key: this.sortingKeys[0]
      },
      filter: 'all',
      includeDiv: true
    }

  }

  _onSelect(key, sortDirection) {
    let sorter = {
      key: key,
      reverse: sortDirection
    }
    this.setState({'sorter': sorter});
  }

  _setFilter(filter) {
    this.setState({filter});
  }

  onDividendCheckboxClick() {
    this.setState({
      includeDiv: !this.state.includeDiv
    })
  }


  _onDeletePortfolioDataClickHandler() {
    let resultObject = {
      success: () => {
        console.log("ok, succes triggered in result object")
      },
      fail: () => {
        console.log("nok triggered in result object")
      }
    }

    UserActionCreators.deleteUserPortfolioData(resultObject);
  }

  render() {


    if (!this.props.user.userData || !this.props.user.userData.portfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}> There
        doesn't seem to be anything here! Head over to the <a href={"#/Import"}>Importer</a> to
        change that.</Grid>);

    if (!this.props.rt) return (<Grid style={{'textAlign':'center','padding':'20px'}}>
      <div className="loader"></div>
    </Grid>);

    let portfolio = this.props.user.stockPortfolio;

    updateArrayOfEntryCollectionsWithRT(portfolio, this.props.rt);
    updatePortfolioDividends(portfolio, this.props.historical);

    let stockEntries = portfolio.collectionList;

    if (stockEntries.length === 0) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}> There
        doesn't seem to be anything here! Head over to the <a href={"#/Import"}>Importer</a> to
        change that.</Grid>);


    let dividends = stockEntries.reduce((prev, curr) => {
      if (curr.total_dividends) prev += curr.total_dividends;
      return prev;
    }, 0);

    dividends = round(dividends);

    let portfolioData = portfolio.portfolioStats;
    if (this.state.includeDiv) portfolioData = portfolio.portfolioStatsWithDividends;


    let profitOrLoss = 'success';
    if (portfolioData.profitLoss < 0) profitOrLoss = 'danger';

    return (

      <div className="portfolio-page">
        <Grid>
          <ListGroup className="portfolio-summary">
            <ListGroupItem bsStyle={profitOrLoss}>
              <span className="prop">Profit/Loss: </span>
              <div className="val">{portfolioData.profitLoss} ({portfolioData.percent_change_string})</div>
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

          <Panel collapsible defaultExpanded={true} header={
          <span>
            Portfolio Graph
            <HelpIcon className="portfolio_graph_help" title={this.props.lang('portfolio_graph')} icon="help_outline" content={this.props.lang('portfolio_graph_help')} /> </span>} eventKey="1">
            <C3PortfolioChart portfolio={portfolio} historical={this.props.historical} lang={this.props.lang} />
          </Panel>

          <hr />

          <Filter onSelect={::this._setFilter} keys={this.filterKeys} lang={this.props.lang} translate={true}/>
          <Sorter onSelect={::this._onSelect} lang={this.props.lang} keys={this.sortingKeys} />

          <div className="checkBoxes">
            <Input type="checkbox" label="Include Dividends in P/L" checked={this.state.includeDiv}
                   onChange={this.onDividendCheckboxClick.bind(this)}/>
          </div>
        </Grid>
        <Grid>
          <div className='portfolioOverview'>
            <StockTable rt={this.props.rt} user={this.props.user} sorter={this.state.sorter}
                        filter={this.state.filter} entries={stockEntries} historical={this.props.historical}
                        includeDiv={this.state.includeDiv} lang={this.props.lang} />

            <Button disabled onClick={this._onDeletePortfolioDataClickHandler} bsStyle="danger" bsSize="medium">Delete portfolio
              data</Button>
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
