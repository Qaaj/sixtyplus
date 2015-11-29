/**
 * Created by janjorissen on 11/16/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Button } from 'react-bootstrap';
import UserActionCreators from '../../actions/UserActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import SingleStock from '../importer/ui/SinglePreviewImportStock';
import StockTable from '../tables/StockTable';
import { Grid, DropdownButton, MenuItem  } from 'react-bootstrap';


class PortfolioOverview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sorter: {
        key: 'profitLoss',
        reverse: true
      }
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
        name: '# Shares',
        prop: 'amount'
      }
    ];

    this.dropdownItems = this.sortKeys.map(this.createDropdown);
  }

  _onSelect(e,key){

    this.sortReverse = !this.sortReverse;

    let sorter = {
      key: key,
      reverse:  this.sortReverse
    }

    this.setState({'sorter':sorter});

  }

  createDropdown(sorter, i){
    return <MenuItem eventKey={sorter.prop} key={'sorter_'+i}>{sorter.name}</MenuItem>;
  }

  render() {

    let currentSortName = this.sortKeys.filter((sorter) =>{
      if(sorter.prop === this.state.sorter.key) return 1;
    })[0].name;

    if (!this.props.user.userData) return (<Grid style={{'textAlign':'center','padding':'20px'}}> There
      doesn't seem to be anything here! Head over to the <a href={"#/" +this.props.lang +"/Import"}>Importer</a> to
      change that.</Grid>);

    if(!this.props.rt) return (<Grid style={{'textAlign':'center','padding':'20px'}}> <div className="loader"></div></Grid>);

    return (
      <Grid className="portfolio-page">
        <div className="sorter">
          <DropdownButton onSelect={::this._onSelect} bsStyle={'default'} title={'Sorted by: ' + currentSortName} id="sorter-dropdown">
            {this.dropdownItems}
          </DropdownButton>
        </div>
        <div className='portfolioOverview'>
          <StockTable rt={this.props.rt} user={this.props.user} sorter={this.state.sorter} />
        </div>
      </Grid>
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
