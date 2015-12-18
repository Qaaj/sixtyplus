import c3 from 'c3';


class C3Chart extends React.Component {

  constructor(props) {
    super(props);
  }

  renderChart(data) {

    let chartData = {
      bindto: '#chart1',
      data: {
        x: 'x',
        columns: data.columns,
        types: data.types,
        groups: data.groups,
        colors: data.colors,
      },
      bar: {
        width: {
          ratio: .8 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m'
          }
        }
      }
    }

    c3.generate(chartData);

  }

  componentDidMount() {
    if (this.props.data) this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) this.renderChart(nextProps.data);
  }

  render() {

    return (
        <div className={"c3chart "+this.props.className} id="chart1">
          <div className='loader'/>
        </div>);
  }
}

C3Chart.displayName = 'C3Chart';

export default C3Chart;
