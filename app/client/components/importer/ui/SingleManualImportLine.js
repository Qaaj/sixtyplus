import { Input } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import DateInput from '../../ui/DateInput';
import StockEntry from '../../../classes/StockEntry';
import { pureRenderDecorator } from '../../../../shared/helpers/decorators';
import { createRegularFieldsNoLabel } from '../../../helpers/InputFactory';
import RealTimeActionCreators from '../../../actions/RealTimeActionCreators';

@pureRenderDecorator
class SingleManualImportLine extends React.Component {

  constructor(props) {
    super(props);
    this.stockRow = [];
    this.entry = {};
  }

  _handleInput(row,e,val) {
    let column = e;
    let input = val;

    if(e.target) input = e.target.value;
    if(e.target) column = e.target.alt;

    this.stockRow[column] = input;

    if(this.stockRow.length == 4){
      this._checkIfValid(this.stockRow);
    }

  }


  _getSuggestions(input, callback){
    RealTimeActionCreators.getStockSuggestion(input,callback);
  }


  _checkIfValid(row){

    if(!Number.isInteger(parseInt(row[1]))) return;
    if(!Number.isInteger(parseInt(row[2]))) return;

    let symbol = row[0];
    let amount = parseFloat(row[1]);
    let price = parseFloat(row[2]);
    let date = row[3];

    symbol = symbol.toUpperCase();
    symbol = symbol.trim();


    this.entry = new StockEntry({symbol,amount,price,date});

    this.props.onSuccess.call(null,this.entry,this.props.line_id);
  }

  _createLine(){
    let name =  ['NFLX','MO','AAPL','TSLA','MSFT','GOOG','AMZN'][Math.floor(Math.random()*7)];
    let amount = Math.floor(Math.random()*200);
    let price = Math.floor(Math.random()*20000)/100;
    let date = moment().format("L");
    var line = 0;

    let inputFields = createRegularFieldsNoLabel([name, amount, price, date],this._handleInput.bind(this,line), this.state);

    this.stockRow[3] = date;

    const inputAttributes = {
      className: 'symbol',
      placeholder: name,
      onChange: this._handleInput.bind(this,line,0),
      alt:0
    };
    return (
      <tr key={'stock_input_' + date + name + amount}>
        <td> <Autosuggest
          scrollBar={true}
          inputAttributes={inputAttributes}
          suggestions={::this._getSuggestions} /></td>
        <td>{inputFields[1]}</td>
        <td>{inputFields[2]}</td>
        <td> <DateInput onChange={this._handleInput.bind(this,line,3)} /></td>
      </tr>);
  }

  render() {

    let body = this._createLine();


    return body;
  }
}

SingleManualImportLine.displayName = 'SingleManualImportLine';

export default SingleManualImportLine;
