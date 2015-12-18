import C3Chart from './C3Chart';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';

class C3DividendPaymentChart extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <C3Chart data={this.props.data} className="portfolio-chart" id="chart1">
          <div className='loader'/>
        </C3Chart>
      </div>);
  }
}

C3DividendPaymentChart.displayName = 'C3DividendPaymentChart';

export default C3DividendPaymentChart;
