import { Input,Button } from 'react-bootstrap';
import UserActionCreators from '../../actions/UserActionCreators';
import PortfolioAction from '../../actions/PortfolioActionCreators';
import { doImport } from '../../../shared/helpers/importers/IB_importer';
import { mapBysymbol, updateArrayOfEntryCollectionsWithRT} from '../../../shared/helpers/stocks';
import NotificationActionCreators from '../../actions/NotificationActionCreators';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';
import SingleStock from '../importer/ui/SinglePreviewImportStock';
import { Grid, Panel, ListGroup,Accordion, Table } from 'react-bootstrap';
import { createRegularFields, createCurrencyFields, createPercentageFields, createRegularFieldsNoLabel } from '../../helpers/InputFactory';
import ManualStockImporter from '../../components/importer/ManualStockImporter'
import StockSymbol from '../../classes/StockSymbol';
import RealTimeStore from '../../stores/RealTimeStore';


class Importer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tryingImport: false,
      rt: RealTimeStore.getRealTimeData()
    };
    this.previewStocks = [];

    this._handleChange = this._handleChange.bind(this);
    this._onImportClickHandler = this._onImportClickHandler.bind(this);
    this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
    this._handleRealTimeStoreChange = this._handleRealTimeStoreChange.bind(this);

  }

  componentDidMount() {
    RealTimeStore.addChangeListener(this._handleRealTimeStoreChange);
  }

  componentWillUnmount() {
    RealTimeStore.removeChangeListener(this._handleRealTimeStoreChange);
  }


  _handleRealTimeStoreChange() {
    let rt = RealTimeStore.getRealTimeData();
    this.setState({
      rt: rt,
    });
  }

  _handleChange(e) {
    this.setState({[e.target.name]: e.target.value})

  }

  _onSuccessImport() {
    this.setState({
      tryingImport: false,
      stockEntryCollections: null
    })
  }

  _onFailImport() {
    this.setState({
      tryingImport: false
    })
  }

  _onSaveClickHandler(e) {

    let resultObject = {
      success: this._onSuccessImport.bind(this),
      fail: this._onFailImport.bind(this),
    }

    this.setState({
      tryingImport: true
    })

    //UserActionCreators.addStockEntryCollectionToPortfolio(this.state.stockEntryCollections,resultObject);
    PortfolioAction.addStockEntryCollections(this.state.stockEntryCollections, resultObject);

  }

  _onImportClickHandler(e) {

    if (!this.state.rawIBData) {
      NotificationActionCreators.setNotification({
        isVisible: true,
        type: 'warning',
        message: "Something went wrong importing the data.",
        delay: 3000
      });
      return;
    }

    let stockData = doImport(this.state.rawIBData);
    let sortedStocks = mapBysymbol(stockData);
    RealTimeActionCreators.getStockPrices(Object.keys(sortedStocks));
    this._refreshList(sortedStocks);

  }

  _onManualImportPreview(data, line) {
    this.previewStocks[line] = data;
    let sortedStocks = mapBysymbol(this.previewStocks);
    RealTimeActionCreators.getStockPrices(Object.keys(sortedStocks));
    this._refreshList(sortedStocks);
  }

  _refreshList(sortedStocks) {
    let stockSymbols = [];

    for (let key in sortedStocks) {
      let symbol = new StockSymbol(key);
      sortedStocks[key].forEach(entry => {
        symbol.addEntry(entry);
      })
      stockSymbols.push(symbol);
    }

    this.setState({
      stockEntryCollections: stockSymbols
    })
  }

  render() {

    let fields = [];

    if (this.state.stockEntryCollections) {
      this.state.stockEntryCollections.map(symbol => {
        let single = (<SingleStock key={Math.random()} symbol={symbol} rt={this.state.rt}/>);
        fields.push(single)
      })
    }

    let btn = null;

    if (fields && fields.length > 0) {
      btn = <Button onClick={this._onSaveClickHandler} bsStyle="primary" bsSize="large">Save</Button>;
    }


    if (this.state.tryingImport) {
      fields = <div className="loader"></div>;
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
            <Input onChange={this._handleChange} name='rawIBData' type='textarea' placeholder="STK_LOT|U1418343|VZ|VERIZON COMMUNICATIONS INC|USD|20150520|15:00:18|10.00|1.00|49.83|498.30|0.92813
STK_LOT|U1418343|XOM|EXXON MOBIL CORP|USD|20150724|12:42:07|10.00|1.00|80.11|801.10|0.92813
..."/>
            <Button onClick={this._onImportClickHandler} bsStyle="primary" bsSize="large">Import</Button>
          </Panel>
        </Accordion>

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
