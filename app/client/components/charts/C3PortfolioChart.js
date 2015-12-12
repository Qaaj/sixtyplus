/**
 * Created by janjorissen on 11/16/15.
 */
import c3 from 'c3';


class C3PortfolioChart extends React.Component {

  constructor(props) {
    super(props);
  }

  renderChart(data) {
    let chartData = {bindto: '#chart1',
      data: {
        columns: [
        ],
        types: {BX: 'area-spline'}
      }
    };

    chartData.data.columns = [data];

    c3.generate(chartData);
  }

  componentDidMount(){
    if(this.props.data) this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.data) this.renderChart(nextProps.data);
  }

  render() {
    return (<div className="row" id="chart1"></div>);
  }
}

C3PortfolioChart.displayName = 'C3PortfolioChart';

export default C3PortfolioChart;
