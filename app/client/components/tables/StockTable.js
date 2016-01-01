import moment from 'moment';
import { Label, Col, Grid, Row } from 'react-bootstrap';
import SingleStockPreview from '../importer/ui/SinglePreviewImportStock';
import StockCard from '../layout/StockCard';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {sortByKey} from '../../../shared/helpers/sorting';
import {filterSymbols} from '../../../shared/helpers/filtering';

@pureRenderDecorator
class StockTable extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let symbols = this.props.symbols.toArray();

    symbols = filterSymbols(symbols, this.props.filter)
    symbols = sortByKey(symbols, this.props.sorter.key, this.props.sorter.reverse);

    let fields = symbols.map((symbol, i) => {
      return (
        <StockCard key={'singlestock_' + i  + symbol.symbol}
                   symbol={symbol} includeDiv={this.props.includeDiv} lang={this.props.lang} force_redwraw_entries={symbol.entries} />);
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
