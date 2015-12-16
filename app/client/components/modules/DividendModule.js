import { Input,Button,Grid } from 'react-bootstrap';
import HelpIcon from '../ui/HelpIcon';
import FixedDataTable  from 'fixed-data-table';
import {Table, Column, Cell} from 'fixed-data-table';
import { updatePortfolioDividends } from '../../../shared/helpers/stocks';
import { createDividendTableData } from '../../../shared/helpers/tables';

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
    let divs = createDividendTableData(portfolio, this.props.historical);


    return (
      <Grid>
        <Table
          rowHeight={40}
          headerHeight={40}
          rowsCount={divs.length}
          width={1100}
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
            width={300}
          />


        </Table>
      </Grid>
    );
  }
}
DividendModule.displayName = 'DividendModule';

export default DividendModule;
