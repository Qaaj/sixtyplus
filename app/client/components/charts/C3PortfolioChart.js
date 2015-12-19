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

    let chartData = this.props.data;

    // Customise the look and feel of the chart

    // Set the styles for all the tickers except the Cost Base
    chartData.types = chartData.tickers.reduce((prev, curr) => {
      prev[curr] = 'area-spline';
      return prev;
    }, {});
    chartData.types["Cost Base"] = 'bar';

    // Group the tickers together
    chartData.groups = [["Cost Base"], chartData.portfolio.flatTickerList];

    // Set the colour for the Cost Base
    chartData.colors = {
      "Cost Base": d3.rgb(230, 230, 230),
    }

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
