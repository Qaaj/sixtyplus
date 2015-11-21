import { Grid, Panel, ListGroup,Accordion, Table, Button } from 'react-bootstrap';
import { createRegularFields, createCurrencyFields, createPercentageFields, createRegularFieldsNoLabel } from '../../helpers/InputFactory';
import moment from 'moment';

class ManualStockImporter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields : []
    }
    this.stockRows = [];
    this.stockObjects = [];
  }

  _handleInput(row,e) {

    let column = e.target.alt;

    if(!this.stockRows[row]) this.stockRows[row] = [];
    this.stockRows[row][column] = e.target.value;


    if(this.stockRows[row].length == 4){
      this._checkIfValid(this.stockRows[row],row);
    }

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

    if(this.props.onSuccess) this.props.onSuccess.call(null,this.stockObjects);
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

    return (
    <tr key={'stock_input_' + date + name + amount}>
      <td>{inputFields[0]}</td>
      <td>{inputFields[1]}</td>
      <td>{inputFields[2]}</td>
      <td>{inputFields[3]}</td>
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
