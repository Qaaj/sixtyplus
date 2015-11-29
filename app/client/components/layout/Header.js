import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Input, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import rd3 from 'react-d3';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let header = (
      <div className='page-header'>
        <Jumbotron>
          <h1>{this.props.location.pathname.replace('/','')}</h1>
        </Jumbotron>
      </div>);

    return header;
  }
}

Header.displayName = 'Header';

export default Header;
