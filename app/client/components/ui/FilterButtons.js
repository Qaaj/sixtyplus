import React from 'react';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';

class FilterButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.currentKey = null;
    this._onSelect = this._onSelect.bind(this);
    this._createButtons = this._createButtons.bind(this);
  }

  _onSelect(key) {
    if (this.props.toggle) {
      let filter = [].concat(this.state.filter);
      if (filter.indexOf(key) !== -1) {
        filter.splice(filter.indexOf(key), 1);
      }else{
        filter.push(key);
      }
      this.setState({filter});
      if (this.props.onSelect) this.props.onSelect(filter)
    } else {
      this.setState({filter: [key]});
      if (this.props.onSelect) this.props.onSelect(key)
    }
  }

  _createButtons(filter, i) {

    let name = filter;
    if (this.props.translate) name = this.props.lang(filter);
    let selected = 'default';
    if (this.state.filter) {
      this.state.filter.forEach(item => {
        if (filter.indexOf(item) !== -1) selected = 'primary';
      });
    }

    return <Button bsStyle={selected} onClick={this._onSelect.bind(this,filter)} eventKey={filter}
                   key={'filter'+i}>
      {name}
    </Button>;
  }

  componentDidMount() {
    if (!this.state.filter){
      if(this.props.toggle){
        this.setState({filter: []});
      }else{
        this.setState({filter: [this.props.keys[0]]});
      }
    }
  }

  render() {

    if (!this.props.keys) return <span>[No Keys Provided]</span>


    this.filterItems = this.props.keys.map(this._createButtons);


    return (
      <div className="filter">
        <ButtonToolbar>
          <ButtonGroup vertical={this.props.vertical}>
            {this.filterItems}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;
