import { Grid, Panel, ListGroup,Accordion, Table, Button } from 'react-bootstrap';
import { createRegularFields, createCurrencyFields, createPercentageFields, createRegularFieldsNoLabel } from '../../helpers/InputFactory';
import moment from 'moment';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import Autosuggest from 'react-autosuggest';
import DateInput from '../ui/DateInput'

class ManualStockImporter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields : []
    }
    this.stockRows = [];
    this.stockObjects = [];
  }

  _handleInput(row,e,val) {
    let column = e;
    let input = val;

    if(e.target) input = e.target.value;
    if(e.target) column = e.target.alt;

    console.log(input,row,column);

    if(!this.stockRows[row]) this.stockRows[row] = [];
    this.stockRows[row][column] = input;


    if(this.stockRows[row].length == 4){
      this._checkIfValid(this.stockRows[row],row);
    }

  }


  _getSuggestions(input, callback){
    RealTimeActionCreators.getStockSuggestion(input,callback);
  }


  _checkIfValid(row,rowID){

    if(!Number.isInteger(parseInt(row[1]))) return;
    if(!Number.isInteger(parseInt(row[2]))) return;

    let ticker = row[0];
    let amount = row[1];
    let price = row[2];
    let date = row[3];

    let obj  = { ticker, amount, price, date};

    this.stockObjects[rowID] = obj;
    console.log(this.stockObjects);

    if(this.props.onSuccess) this.props.onSuccess.call(null,this.stockObjects);
  }

  _onInputChanged(){

  }

   _isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  _makeInputFields(){

    let name =  ['NFLX','MO','AAPL','TSLA','MSFT','GOOG','AMZN'][Math.floor(Math.random()*7)];
    let amount = Math.floor(Math.random()*200);
    let price = Math.floor(Math.random()*20000)/100;
    let date = moment().subtract(Math.round(Math.random()*1000), 'days').format("DD/MM/YYYY");
    var line = 0;
    if(this.state.fields) line = this.state.fields.length
    let inputFields = createRegularFieldsNoLabel([name, amount, price, date],this._handleInput.bind(this,line), this.state);


    const inputAttributes = {
        className: 'main_topic',
        placeholder: name,
        onChange: this._handleInput.bind(this,line,0),
        alt:0
      };
    return (
    <tr key={'stock_input_' + date + name + amount}>
      <td> <Autosuggest
        inputAttributes={inputAttributes}
        suggestions={::this._getSuggestions} /></td>
      <td>{inputFields[1]}</td>
      <td>{inputFields[2]}</td>
      <td> <DateInput onChange={this._handleInput.bind(this,line,3)} /></td>
    </tr>);
  }

  _addRow(){
    let fields = [];
    if(this.state.fields) fields = this.state.fields;
    fields.push(this._makeInputFields());
    this.setState({
      fields: fields
    });
  }

  componentWillMount(){
   ::this._addRow();
  }

  render() {



    let importer = (
      <div className='manual-stock-importer'>


        <Button className="addMoreButton" bsStyle="success" bsSize="xsmall" onClick={::this._addRow}>Add More</Button>
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Ticker</th>
            <th># Shares</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
         {this.state.fields}
          </tbody>
        </Table>
      </div>);

    return importer;
  }
}

ManualStockImporter.displayName = 'ManualStockImporter';

export default ManualStockImporter;
