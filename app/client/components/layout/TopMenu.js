import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import rd3 from 'react-d3';

class TopMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let topMenu = (
      <Grid className="topMenu">
        <Row>
          <Col className="text-center" md={12}>
            <ButtonGroup className='header-menu'>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/Quickstart`); }}>{this.props.lang('quickstart')}</Button>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/Portfolio`); }}>{this.props.lang('portfolio')}</Button>
              <Button onClick={()=>{ this.props.history.replaceState(null, `/Import`); }}>{this.props.lang('import')}</Button>
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
};
export default TopMenu;
