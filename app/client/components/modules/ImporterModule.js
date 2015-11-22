import { Input,Button } from 'react-bootstrap';
import UserActionCreators from '../../actions/UserActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import { mapByTicker} from '../../../shared/helpers/stocks/mapStocksByTicker';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import SingleStock from '../ui/SingleStock';
import { Grid, Panel, ListGroup,Accordion, Table } from 'react-bootstrap';
import { createRegularFields, createCurrencyFields, createPercentageFields, createRegularFieldsNoLabel } from '../../helpers/InputFactory';
import ManualStockImporter from '../../components/importer/ManualStockImporter'


class Importer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {fields: null};
    this.previewStocks = [];

    this._handleChange = this._handleChange.bind(this);
    this._onImportClickHandler = this._onImportClickHandler.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);

  }

  _handleChange(e) {
    this.setState({[e.target.name]: e.target.value})

  }

  _onSaveClickHandler(e) {
    UserActionCreators.updatePortfolio(this.state.sortedStocks);
  }

  _onImportClickHandler(e) {

    let stockData = doImport(this.state.rawStockData);
    let sortedStocks = mapByTicker(stockData);

    this.setState({
      sortedStocks: sortedStocks,
    })

  }

  _onManualImportPreview(data, line) {

    RealTimeActionCreators.getStockPrice(data.ticker);
    this.previewStocks[line] = data;

    let sortedStocks = mapByTicker(this.previewStocks);

    this.setState({
      sortedStocks: sortedStocks,
    })

  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {

    let fields = [];
    if(this.state.sortedStocks){
      for (let key in this.state.sortedStocks) {
        let single = (<SingleStock key={Math.random()} entries={this.state.sortedStocks[key]} rt={this.props.rt} ticker={key}/>);
        fields.push(single)
      }
    }

    let btn = null;

    if (fields && fields.length > 0) {
      btn = <Button onClick={this._onSaveClickHandler} bsStyle="primary" bsSize="large">Save</Button>;
    }

    return (
      <Grid className='importer'>

        <Accordion defaultActiveKey="1">
          <Panel header="Import Manually" eventKey="1">
            <ManualStockImporter onSuccess={::this._onManualImportPreview}/>
          </Panel>
          <Panel className="IBimport" header="Import from Interactive Brokers" eventKey="2">
            <ul>
              <li>Log in to IB Account Management.</li>
              <li>Go to Reports > Activity > Third-Party Downloads</li>
              <li>Select the desired time period.</li>
              <li>Format > TradeLog</li>
              <li>Click Download and wait a few seconds.</li>
              <li>Sroll Down to 'STOCK_POSITIONS'</li>
              <li>Copy and Paste everything below it in the textfield below.</li>
              <li>Click the Import button.</li>
              <li>Review your positions and click 'Save'.</li>
            </ul>
            <Input onChange={this._handleChange} name='rawStockData' type='textarea' placeholder="STK_LOT|U1418343|VZ|VERIZON COMMUNICATIONS INC|USD|20150520|15:00:18|10.00|1.00|49.83|498.30|0.92813
STK_LOT|U1418343|XOM|EXXON MOBIL CORP|USD|20150724|12:42:07|10.00|1.00|80.11|801.10|0.92813
..."/>
            <Button onClick={this._onImportClickHandler} bsStyle="primary" bsSize="large">Import</Button>
          </Panel>

        </Accordion>

        <hr />

        {fields}
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
