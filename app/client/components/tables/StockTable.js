import moment from 'moment';
import { Label } from 'react-bootstrap';
import SingleStock from '../ui/SingleStock';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';

@pureRenderDecorator
class StockTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fields: null};
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentWillReceiveProps(newProps) {



  }

  render() {

    if(!this.props.user.userData && !this.props.rt) return null;

    let sortedStocks = this.props.user.userData.portfolio;

    let fields = [];
    for (let key in sortedStocks) {
      let single = (<SingleStock key="" rt={this.props.rt}key={'singlestock_' + key} entries={sortedStocks[key]} ticker={key}/>);
      if(key != 'bonds ' && key != 'stocks' && key != 'savings') fields.push(single)
    }


    let table = (
      <div>
        {fields}
      </div>
    );

    return table;
  }
}

StockTable.displayName = 'StockTable';

export default StockTable;
