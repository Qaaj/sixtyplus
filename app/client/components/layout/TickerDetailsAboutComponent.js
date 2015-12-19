import ColumnRenderer from './ColumnRenderer';

class TickerDetailsAboutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<ColumnRenderer title={this.props.title} data={this.props.data} xs={6} sm={3}/>);
  }
}

TickerDetailsAboutComponent.displayName = 'TickerDetailsAboutComponent';

TickerDetailsAboutComponent.PropTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
};

export default TickerDetailsAboutComponent;
