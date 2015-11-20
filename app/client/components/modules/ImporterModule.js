/**
 * Created by janjorissen on 11/16/15.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Input,Button } from 'react-bootstrap';
import UserActionCreators from '../../actions/UserActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import SingleStock from '../ui/SingleStock';
import { Grid } from 'react-bootstrap';


class Importer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {fields: null};

    this._handleChange = this._handleChange.bind(this);
    this._onImportClickHandler = this._onImportClickHandler.bind(this);
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

  _onImportClickHandler(e) {

    let stockData = doImport(this.state.rawStockData);
    let sortedStocks = {};

    try {
      stockData.map(tx => {
        if (tx.STK_LOT !== 'STK_LOT') return;
        if (!sortedStocks[tx.ticker]) sortedStocks[tx.ticker] = [];
        let formattedTX = {};
        formattedTX.date = moment(tx.date, "YYYYMMDD");
        formattedTX.ticker = tx.ticker;
        formattedTX.name = this.capitalizeFirstLetter(tx.name.toLowerCase());
        formattedTX.name = formattedTX.name.replace(".","_");
        formattedTX.amount = parseFloat(tx.amount);
        formattedTX.price = parseFloat(tx.price);
        formattedTX.total = parseFloat(tx.total);
        sortedStocks[tx.ticker].push(formattedTX);
      });

    } catch (err) {
      NotificationActionCreators.doError("Something went wrong with the import. Please double-check your input!");
      return;
    }

    let fields = [];
    for (let key in sortedStocks) {
      let single = (<SingleStock key={Math.random()} entries={sortedStocks[key]} ticker={key}/>);
      fields.push(single)
    }

    this.setState({
      sortedStocks: sortedStocks,
      fields: fields
    })

  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  render() {

    let btn = null;

    if (this.state.fields && this.state.fields.length > 0) {
      btn = <Button onClick={this._onSaveClickHandler} bsStyle="primary" bsSize="large">Save</Button>;
    }

    return (
      <Grid className='importer'>
        <Input onChange={this._handleChange} name='rawStockData' type='textarea' label="Import from IB" placeholder="STK_LOT|U1418343|VZ|VERIZON COMMUNICATIONS INC|USD|20150520|15:00:18|10.00|1.00|49.83|498.30|0.92813
STK_LOT|U1418343|XOM|EXXON MOBIL CORP|USD|20150724|12:42:07|10.00|1.00|80.11|801.10|0.92813
..."/>
        <Button onClick={this._onImportClickHandler} bsStyle="primary" bsSize="large">Import</Button>
        <hr />
        {this.state.fields}
        {btn}
      </Grid>
    );
  }
}

Importer.displayName = 'Importer';
Importer.PropTypes = {
  history: React.PropTypes.obj,
  location: React.PropTypes.obj,
  urlParams: React.PropTypes.obj,
  userObject: React.PropTypes.string,
};

export default Importer;
