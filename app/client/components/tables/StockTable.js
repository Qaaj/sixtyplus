import moment from 'moment';
import { Label, Col, Grid, Row } from 'react-bootstrap';
import SingleStockPreview from '../importer/ui/SinglePreviewImportStock';
import StockCard from '../layout/StockCard';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {updateEntriesData} from '../../../shared/helpers/stocks';
import {sortByKey} from '../../../shared/helpers/sorting';
import {filterStockEntries} from '../../../shared/helpers/filtering';

@pureRenderDecorator
class StockTable extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {

    if(!this.props.user.userData && !this.props.rt) return <div className="loader"></div>;

    let stockEntries = this.props.user.stockEntries;


    stockEntries  = updateEntriesData(stockEntries, this.props.rt);
    stockEntries = filterStockEntries(stockEntries, this.props.filter)
    stockEntries = sortByKey(stockEntries, this.props.sorter.key, this.props.sorter.reverse);

    let fields = stockEntries.map((entries,i) =>{
      return (<StockCard key={'singlestock_' + i  + entries.ticker} rt={this.props.rt}  entries={entries} />);
    });

    let table = (
      <Grid>

        <Row className="show-grid">
         {fields}
        </Row>

      </Grid>
    );

    return table;
  }
}

StockTable.displayName = 'StockTable';

export default StockTable;
