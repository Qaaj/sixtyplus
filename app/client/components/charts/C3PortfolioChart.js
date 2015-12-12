/**
 * Created by janjorissen on 11/16/15.
 */
import c3 from 'c3';


class C3PortfolioChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var chart = c3.generate({ bindto:'#chart1', data: { columns: [ ['data1', 300, 350, 300, 0, 0, 0], ['data2', 130, 100, 140, 200, 150, 50] ], types: { data1: 'area', data2: 'area-spline' } } });

  }

  componentDidUpdate() {
    console.log("Component did update");
    var chart = c3.generate({ bindto:'#chart1', data: { columns: [ ['data1', 300, 350, 300, 0, 0, 0], ['data2', 130, 100, 140, 200, 150, 50] ], types: { data1: 'area', data2: 'area-spline' } } });

  }

  render() {
    console.log('rendering');
    return(<div className="row" id="chart1"></div>);
  }
}

C3PortfolioChart.displayName = 'C3PortfolioChart';

export default C3PortfolioChart;
