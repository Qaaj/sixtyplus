import { Input,Button,Grid } from 'react-bootstrap';
import HelpIcon from '../ui/HelpIcon';
import FixedDataTable  from 'fixed-data-table';
import {Table, Column, Cell} from 'fixed-data-table';
import { updatePortfolioDividends } from '../../../shared/helpers/stocks';
import { createDividendTableData } from '../../../shared/helpers/tables';

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toLocaleString()}
  </Cell>
);


const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data[rowIndex][col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
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
      },{
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

    if (!this.props.user.userData || !this.props.user.userData.portfolio || !this.props.historical) return (<Grid style={{'textAlign':'center','padding':'20px'}}>
      <div className="loader"></div>
    </Grid>);

    let portfolio = this.props.user.stockPortfolio;
    updatePortfolioDividends(portfolio, this.props.historical);
    createDividendTableData(portfolio, this.props.historical);


    var {dataList} = this.state;
    return (
      <Grid>
        <Table
          rowHeight={40}
          headerHeight={40}
          rowsCount={portfolio.allStockEntries.length}
          width={1100}
          maxHeight={500}
          {...this.props}>
          <Column
            header={<Cell>Ticker</Cell>}
            cell={<LinkCell data={portfolio.allStockEntries} col="ticker" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Price</Cell>}
            cell={<TextCell data={portfolio.allStockEntries} col="price" />}
            fixed={true}
            width={100}
          />
          <Column
            header={<Cell>Amount</Cell>}
            cell={<TextCell data={portfolio.allStockEntries} col="amount" />}
            width={100}
          />

        </Table>
      </Grid>
    );
  }
}
DividendModule.displayName = 'DividendModule';

export default DividendModule;
