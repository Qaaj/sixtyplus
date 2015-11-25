import moment from 'moment';
import { Label } from 'react-bootstrap';
import SingleStock from '../importer/ui/SinglePreviewImportStock';
import { pureRenderDecorator } from '../../../shared/helpers/decorators';

@pureRenderDecorator
class ImportStockTable extends React.Component {

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

    if(!this.props.user.userData && !this.props.rt) return <div className="loader"></div>;

    let sortedStocks = this.props.user.userData.portfolio;

    let fields = [];
    for (let key in sortedStocks) {
      let single = (<SingleStock  rt={this.props.rt}key={'singlestock_' + key} entries={sortedStocks[key]} ticker={key}/>);
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

ImportStockTable.displayName = 'ImportStockTable';

export default ImportStockTable;
