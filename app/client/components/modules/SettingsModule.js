import { Input,Button,Grid,ListGroup, ListGroupItem,  DropdownButton, MenuItem} from 'react-bootstrap';import {} from 'react-bootstrap';

import HelpIcon from '../ui/HelpIcon';
import User from '../../classes/User'

class SettingsModule extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSelect(){

  }

  render() {

    let user = this.props.user.get('class').init(this.props.user);

    console.log(user);


    return (
      <div className="settings_page">
        <Grid>
          <ListGroup className="settings_group">
            <ListGroupItem>
              <span className="prop">Username: </span>
              <div className="val">{this.props.user.username}</div>
            </ListGroupItem>
            <ListGroupItem className="higher">
              <span className="prop">Currency: </span>
              <div className="val">
                <div className="currency">
                  <DropdownButton onSelect={this._onSelect} bsStyle={'default'}
                                  title="USD"
                                  id="sorter-dropdown">
                    <MenuItem  eventKey={1} key={'sorter_'+Math.random()}>USD</MenuItem>
                  </DropdownButton>
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

SettingsModule.displayName = 'SettingsModule';

export default SettingsModule;
