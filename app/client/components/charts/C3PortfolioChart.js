/**
 * Created by janjorissen on 11/16/15.
 */
import C3Chart from './C3Chart';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';


class C3PortfolioChart extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //portfolio-chart
    return (
      <div>
        <div className="protfolio_chart_menu">
          <ButtonToolbar>
            <ButtonGroup bsSize="xsmall">
              <Button>Portfolio Size</Button>
              <Button>Dividends</Button>
              <Button>P&L</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <C3Chart data={this.props.data} className="portfolio-chart">
          <div className='loader'/>
        </C3Chart>
      </div>);
  }
}

C3PortfolioChart.displayName = 'C3PortfolioChart';

export default C3PortfolioChart;
