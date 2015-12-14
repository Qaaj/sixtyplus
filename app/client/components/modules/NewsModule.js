import { Input,Button,Grid } from 'react-bootstrap';
import RealTimeActionCreators from '../../actions/RealTimeActionCreators';


class NewsModule extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.news) return (<Grid style={{'textAlign':'center','padding':'20px'}}>
      <div className="loader"></div>
    </Grid>);

    return (<div>News</div>

    );
  }
}

NewsModule.displayName = 'NewsModule';

export default NewsModule;
