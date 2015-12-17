import { Input,Button,Grid } from 'react-bootstrap';
import HelpIcon from '../ui/HelpIcon';
import FixedDataTable  from 'fixed-data-table';
import {Table, Column, Cell} from 'fixed-data-table';
import { updatePortfolioDividends } from '../../../shared/helpers/stocks';
import { createDividendTableData } from '../../../shared/helpers/tables';
import {round} from '../../../shared/helpers/formatting';

const DividendCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    $ {data[rowIndex][col]}
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
    {data[rowIndex][col].format()}
  </Cell>
);

class DividendModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [{
        firstName: 'Jan',
        lastName: 'Jorissen',
        city: 'Berlin',
        street: 'Pannierstrasse',
        zipCode: '3001',
        email: 'janjorissen@gmail.com',
        date: new Date(),
      }, {
        firstName: 'Jan',
        lastName: 'Jorissen',
        city: 'Berlin',
        street: 'Pannierstrasse',
        zipCode: '3001',
        email: 'janjorissen@gmail.com',
        date: new Date(),
      }]
    };
  }

  render() {



    if (!this.props.user.userData || !this.props.user.userData.portfolio || !this.props.historical) return (
      <Grid style={{'textAlign':'center','padding':'20px'}}>
        <div className="loader"></div>
      </Grid>);

    let portfolio = this.props.user.stockPortfolio;

    let stockEntries = portfolio.collectionList;

    let dividends = stockEntries.reduce((prev, curr) => {
      if (curr.total_dividends) prev += curr.total_dividends;
      return prev;
    }, 0);

    dividends = round(dividends);

    updatePortfolioDividends(portfolio, this.props.historical);
    let divs = createDividendTableData(portfolio, this.props.historical);

    return (
      <div>
        <Grid>
          <Table
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
          <p>Total Dividends Collected: {dividends}</p>
        </Grid>
      </div>
    );
  }
}
DividendModule.displayName = 'DividendModule';

export default DividendModule;
