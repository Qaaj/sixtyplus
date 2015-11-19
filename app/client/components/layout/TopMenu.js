import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import rd3 from 'react-d3';

class TopMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  console.log(this.props.location)
    let topMenu = (
      <Grid className="topMenu">
        <Row>
          <Col className="text-center" md={12}>
            <ButtonGroup className='header-menu'>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/${this.props.lang}/Quickstart`); }}>Quickstart</Button>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/${this.props.lang}/Portfolio`); }}>Portfolio</Button>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/${this.props.lang}/Import`); }}>Import</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Grid>);

    return topMenu;
  }
}

TopMenu.displayName = 'TopMenu';

TopMenu.PropTypes = {
  history: React.PropTypes.obj,
  location: React.PropTypes.obj,
  urlParams: React.PropTypes.obj,
}
export default TopMenu;
