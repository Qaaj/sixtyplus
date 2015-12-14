import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Button, ButtonGroup, Row, Col} from 'react-bootstrap';
import rd3 from 'react-d3';

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open:true};

    this.menu_options = [
      {
        key:'quickstart',
        url:'Quickstart'
      },
      {
        key:'portfolio',
        url:'Portfolio'
      },
      {
        key:'import',
        url:'Import'
      },
      {
        key: 'settings',
        url: 'Settings'
      },{
        key: 'news',
        url: 'News'
      }
    ];
  }

  render() {
    let current = this.props.location.pathname.replace('/','');

    let menuButtons = this.menu_options.map(item =>{
      let cx = '';
      if(item.url === current) cx =' selected';

      return (<Button bsSize="large" className={item.key+"-button" + cx} onClick={()=>{ this.props.history.replaceState(null, `/${item.url}`); }}>{this.props.lang(item.key)}</Button>);
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
