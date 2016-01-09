/**
 * Created by janjorissen on 11/16/15.
 */
import C3Chart from './C3Chart';
import {Input} from 'react-bootstrap';
import {getPortfolioChart, getsymbolDetailChart} from '../../../shared/helpers/charts/getPortfolioChart';
import {getProfitLossChart} from '../../../shared/helpers/charts/getProfitLossChart';
import {getDividendChart} from '../../../shared/helpers/charts/getDividendChart';
import Filter from '../ui/FilterButtons';
import stack from '../../../shared/utils/stack';


class C3PortfolioChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChart: getPortfolioChart,
      compound_div: true,
    };

    this.options = ['portfolio_size', 'dividends', 'profit_and_loss'];

    this.filters = {
      'portfolio_size': getPortfolioChart,
      'dividends': getDividendChart,
      'profit_and_loss': getProfitLossChart,

    }
  }

  _setFilter(filter) {
    this.setState({currentChart: this.filters[filter]});
  }

  onDividendCheckboxClick(){
    this.setState({
      compound_div: !this.state.compound_div,
    })
  }

  render() {

    console.log(this.props.entries);
    let symbolArray = this.props.filterBysymbolsArray;
    if(this.props.entries) {
      symbolArray = this.props.entries.map(entry =>{
        return entry.symbol;
      })
    }
    let chartData = this.state.currentChart(this.props.portfolio, this.props.historical, this.state.compound_div, symbolArray);

    let compounding_divs = null;
    if(this.state.currentChart == getDividendChart) compounding_divs = <Input type="checkbox" label="Compound Dividends" checked={this.state.compound_div}
           onChange={this.onDividendCheckboxClick.bind(this)}/>;

    return (
      <div>
        <div className="protfolio_chart_menu">
          <Filter toggle={false} onSelect={::this._setFilter} keys={this.options} lang={this.props.lang} translate={true}/>
          {compounding_divs}
        </div>
        <C3Chart data={chartData} className="portfolio-chart">
          <div className='loader'/>
        </C3Chart>
      </div>);
  }
}

C3PortfolioChart.displayName = 'C3PortfolioChart';

export default C3PortfolioChart;
