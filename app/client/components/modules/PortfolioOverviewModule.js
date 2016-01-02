/**
 * Created by janjorissen on 11/16/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import UserActionCreators from '../../actions/UserActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import SingleStock from '../importer/ui/SinglePreviewImportStock';
import StockTable from '../tables/StockCardTable';
import { Input, Grid, DropdownButton, MenuItem, ButtonToolbar, Button, ButtonGroup,ListGroup,ListGroupItem, Popover, OverlayTrigger, Panel } from 'react-bootstrap';
import C3PortfolioChart from '../charts/C3PortfolioChart';
import {round} from '../../../shared/helpers/formatting';
import HelpIcon from '../ui/HelpIcon';
import Sorter from '../ui/Sorter';
import Filter from '../ui/FilterButtons';
import numeral from 'numeral';
import {filterSymbols} from '../../../shared/helpers/filtering';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';

class PortfolioOverview extends React.Component {

  constructor(props) {
    super(props);

    this.sortingKeys = ['profitLoss', 'marketValue', 'sector', 'symbol', 'total_dividends', 'amount'];
    this.filterKeys = ['all', 'profit', 'loss'];

    this.state = {
      sorter: {
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

  shouldILoad(){
    if (!this.props.user || !this.props.portfolio) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}> There
        doesn't seem to be anything here! Head over to the <a href={"#/Import"}>Importer</a> to
        change that.</Grid>);

    let nok = false;

    this.props.portfolio.symbolsArray.forEach(symbol =>{
      if(!symbol.monthly) nok = true;
    });

    if (nok) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    return false;
  }

  render() {

   if(this.shouldILoad()) return this.shouldILoad();

    let portfolio = this.props.portfolio;

    let symbolArray = portfolio.symbolsArray;

    if (symbolArray.length === 0) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}> There
        doesn't seem to be anything here! Head over to the <a href={"#/Import"}>Importer</a> to
        change that.</Grid>);


    symbolArray = filterSymbols(symbolArray, this.state.filter)

    let dividends = symbolArray.reduce((prev, curr) => {
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
              <div className="val">{numeral(portfolioData.profitLoss).format('$ 0,0.00')}
                ({portfolioData.percent_change_string})
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <span className="prop">Dividends Collected: </span>
              <div className="val">{numeral(dividends).format('$ 0,0.00')}</div>
            </ListGroupItem>
            <ListGroupItem>
              <span className="prop">Portfolio Market Value: </span>
              <div className="val">{numeral(portfolioData.marketValue).format('$ 0,0.00')}</div>
            </ListGroupItem>
          </ListGroup>

          <Panel collapsible defaultExpanded={true} header={
          <span>
            Portfolio Graph
            <HelpIcon className="portfolio_graph_help" title={this.props.lang('portfolio_graph')} icon="help_outline" content={this.props.lang('portfolio_graph_help')} /> </span>}
                 eventKey="1">
            <C3PortfolioChart entries={symbolArray} portfolio={portfolio} historical={this.props.historical}
                              lang={this.props.lang}/>
          </Panel>

          <hr />

          <Filter onSelect={::this._setFilter} keys={this.filterKeys} lang={this.props.lang} translate={true}/>
          <Sorter onSelect={::this._onSelect} lang={this.props.lang} keys={this.sortingKeys}/>

          <div className="checkBoxes">
            <Input type="checkbox" label="Include Dividends in P/L" checked={this.state.includeDiv}
                   onChange={this.onDividendCheckboxClick.bind(this)}/>
          </div>
        </Grid>
        <Grid>
          <div className='portfolioOverview'>
            <StockTable user={this.props.user} sorter={this.state.sorter}
                        filter={this.state.filter}
                        includeDiv={this.state.includeDiv} lang={this.props.lang} symbols={this.props.portfolio.symbols} />
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
