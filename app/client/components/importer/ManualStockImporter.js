import { Grid, Panel, ListGroup,Accordion, Table, Button } from 'react-bootstrap';
import { createRegularFields, createCurrencyFields, createPercentageFields, createRegularFieldsNoLabel } from '../../helpers/InputFactory';
import moment from 'moment';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import Autosuggest from 'react-autosuggest';
import DateInput from '../ui/DateInput'
import SingleManualImportLine from './../tables/ui/SingleManualImportLine';
class ManualStockImporter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields : []
    }
  }

  _onInputChanged(){

  }

  _addRow(){
    let fields = [];
    if(this.state.fields) fields = this.state.fields;

    fields.push(<SingleManualImportLine onSuccess={this.props.onSuccess} key={"single_importer_" + fields.length} line_id={fields.length} />);

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
