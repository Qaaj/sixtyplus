import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import rd3 from 'react-d3';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};

    this.menu_options = [
      {
        key: 'portfolio',
        url: 'Portfolio'
      },
      {
        key: 'news',
        url: 'News'
      },
      {
        key: 'dividends',
        url: 'Dividends'
      },
      {
        key: 'planner',
        url: 'Planner'
      },
      {
        key: 'import',
        url: 'Import'
      },
    ];

    this.settings = [
      {
        key: 'settings',
        url: 'Settings'
      },
      {
        key: 'import',
        url: 'Import'
      },
    ]
  }

  render() {
    let current = this.props.location.pathname.replace('/', '');

    let menuButtons = this.menu_options.map((item, i) => {
      let cx = '';
      if (item.url === current) cx = ' selected';

      return (<a key={'menu_' + i} className={item.key+"-button special_button special_button-1" + cx}
                      onClick={()=>{ this.props.history.replaceState(null, `/${item.url}`); }}> <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>{this.props.lang(item.key)}</a>);
    })

    let menu = (
      <div className="menu">
        {menuButtons}
      </div>);

    return menu;
  }
}

Menu.displayName = 'Menu';

Menu.PropTypes = {
  history: React.PropTypes.obj,
  location: React.PropTypes.obj,
  urlParams: React.PropTypes.obj,
};
export default Menu;
