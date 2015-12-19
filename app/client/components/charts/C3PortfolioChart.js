/**
 * Created by janjorissen on 11/16/15.
 */
import C3Chart from './C3Chart';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {getPortfolioChart} from '../../../shared/helpers/charts/getPortfolioChart';
import {getProfitLossChart} from '../../../shared/helpers/charts/getProfitLossChart';
import {getDividendChart} from '../../../shared/helpers/charts/getDividendChart';

class C3PortfolioChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentChart: getPortfolioChart};
  }

  render() {

    let chartData = this.state.currentChart(this.props.portfolio, this.props.historical);

    //// Customise the look and feel of the chart



    return (
      <div>
        <div className="protfolio_chart_menu">
          <ButtonToolbar>
            <ButtonGroup bsSize="xsmall">
              <Button onClick={() => {this.setState({currentChart:getPortfolioChart})}}>Portfolio Size</Button>
              <Button onClick={() => {this.setState({currentChart:getDividendChart})}}>Dividends</Button>
              <Button onClick={() => {this.setState({currentChart:getProfitLossChart})}}>P&L</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <C3Chart data={chartData} className="portfolio-chart">
          <div className='loader'/>
        </C3Chart>
      </div>);
  }
}

C3PortfolioChart.displayName = 'C3PortfolioChart';

export default C3PortfolioChart;
