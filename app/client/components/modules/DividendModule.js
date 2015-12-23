import { Input,Button,Grid,ListGroup, ListGroupItem} from 'react-bootstrap';
import HelpIcon from '../ui/HelpIcon';
import FixedDataTable  from 'fixed-data-table';
import {Table, Column, Cell} from 'fixed-data-table';
import { updatePortfolioDividends } from '../../../shared/helpers/stocks';
import { createDividendTableData } from '../../../shared/helpers/tables';
import {round} from '../../../shared/helpers/formatting';
import numeral from 'numeral';

const DividendCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    $ {round(data[rowIndex][col],3)}
  </Cell>
);

const AmountCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]} x
  </Cell>
);

const TotalAmountCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    $ {round(data[rowIndex]['amount'] * data[rowIndex]['price'])}
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].format("MMMM Do YYYY (MM-DD-YYYY)")}
  </Cell>
);

class DividendModule extends React.Component {
  constructor(props) {
    super(props);
  }

  // Enhance the rendering time
  shouldComponentUpdate(nextProps,nextState){
    let shouldUpdate = false;
    if(!this.props.historical) shouldUpdate = true;
    if(this.props.historical && Object.keys(nextProps.historical).length !== Object.keys(this.props.historical).length) shouldUpdate = true;
    if(this.props.portfolio && nextProps.portfolio.flatTickerList.length !== this.props.portfolio.flatTickerList.length) shouldUpdate = true;
    return shouldUpdate;
  }

  render() {

    if (!this.props.user || !this.props.portfolio || !this.props.historical) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let portfolio = this.props.portfolio;

    let stockEntries = portfolio.collectionList;

    let dividends = stockEntries.reduce((prev, curr) => {
      if (curr.total_dividends) prev += curr.total_dividends;
      return prev;
    }, 0);

    dividends = round(dividends);

    updatePortfolioDividends(portfolio, this.props.historical);
    let divs = createDividendTableData(portfolio, this.props.historical);

    return (
      <div className="dividend_page">
        <Grid>
          <Table className="dividend_table"
            rowHeight={40}
            headerHeight={40}
            rowsCount={divs.length}
            width={800}
            maxHeight={500}
            {...this.props}>
            <Column
              header={<Cell>Ticker</Cell>}
              cell={<TextCell data={divs} col="ticker" />}
              fixed={true}
              width={100}
            />
            <Column
              header={<Cell>Amount</Cell>}
              cell={<AmountCell data={divs} col="amount" />}
              fixed={true}
              width={100}
            />
            <Column
              header={<Cell>Dividend</Cell>}
              cell={<DividendCell data={divs} col="price" />}
              fixed={true}
              width={100}
            />
            <Column
              header={<Cell>Date</Cell>}
              cell={<DateCell data={divs} col="date" />}
              fixed={true}
              width={400}
            />
            <Column
              header={<Cell>Total</Cell>}
              cell={<TotalAmountCell data={divs} col="" />}
              fixed={true}
              width={100}
            />
          </Table>
          <ListGroup className="dividend_summary">
            <ListGroupItem>
              <span className="prop">Total Dividends Collected: </span>
              <div className="val">{numeral(dividends).format('$0,0.00')}</div>
            </ListGroupItem>
          </ListGroup>
        </Grid>
      </div>
    );
  }
}
DividendModule.displayName = 'DividendModule';

export default DividendModule;
