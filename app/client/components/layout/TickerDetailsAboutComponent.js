import ColumnRenderer from './ColumnRenderer';

class symbolDetailsAboutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<ColumnRenderer title={this.props.title} data={this.props.data} xs={6} sm={3}/>);
  }
}

symbolDetailsAboutComponent.displayName = 'symbolDetailsAboutComponent';

symbolDetailsAboutComponent.PropTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array,
};

export default symbolDetailsAboutComponent;
