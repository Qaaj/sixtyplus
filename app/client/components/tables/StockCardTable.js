import moment from 'moment';
import { Label, Col, Grid, Row } from 'react-bootstrap';
import SingleStockPreview from '../importer/ui/SinglePreviewImportStock';
import StockCard from '../layout/StockCard';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';
import {sortByKey} from '../../../shared/helpers/sorting';
import {filterSymbols} from '../../../shared/helpers/filtering';

@pureRenderDecorator
class StockCardTable extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let symbols = this.props.symbols.toArray();

    symbols = filterSymbols(symbols, this.props.filter)
    symbols = sortByKey({array:symbols, key:this.props.sorter.key, reverse:this.props.sorter.reverse, subProp:'performance'});

    let fields = symbols.map((symbol, i) => {
      return (
        <StockCard key={'singlestock_' + i  + symbol.symbol}
                   symbol={symbol} includeDiv={this.props.includeDiv} lang={this.props.lang}  />);
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

StockCardTable.displayName = 'StockCardTable';

export default StockCardTable;
