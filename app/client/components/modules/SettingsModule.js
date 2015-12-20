import { Input,Button,Grid,ListGroup, ListGroupItem,  DropdownButton, MenuItem} from 'react-bootstrap';import {} from 'react-bootstrap';

import HelpIcon from '../ui/HelpIcon';


class SettingsModule extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSelect(){

  }

  render() {

    return (
      <div className="settings_page">
        <Grid>
          <ListGroup className="settings_group">
            <ListGroupItem>
              <span className="prop">UserID: </span>
              <div className="val">{this.props.user.uid}</div>
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
