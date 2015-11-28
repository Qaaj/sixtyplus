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
import { Grid } from 'react-bootstrap';



class PortfolioOverview extends React.Component {

  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);

  }

  componentWillReceiveProps(newProps) {

  }

  _handleChange(e) {
    this.setState({[e.target.name]: e.target.value})

  }

  _onSaveClickHandler(e) {
    UserActionCreators.updatePortfolio(this.state.sortedStocks);
  }

  render() {
    if(!this.props.user.userData || !this.props.rt) return <Grid style={{'textAlign':'center','padding':'20px'}}> There doesn't seem to be anything here! Head over to the <a href={"#/" +this.props.lang +"/Import"}>Importer</a> to change that.</Grid>;
    return (
      <Grid>
      <div className='portfolioOverview'>
        <StockTable rt={this.props.rt} user={this.props.user}/>
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
