import React from 'react';
import { DropdownButton, MenuItem} from 'react-bootstrap';

class Sorter extends React.Component {

  constructor(props) {
    super(props);
    this.sortReverse = true;
    this.currentKey = null;
    this._onSelect = this._onSelect.bind(this);
    this._createDropdown = this._createDropdown.bind(this);
  }

  _onSelect(e, key) {
    this.currentKey = key;
    this.sortReverse = !this.sortReverse;
    this.props.onSelect(key, this.sortReverse)
  }

  _createDropdown(key, i) {
    return <MenuItem eventKey={key} key={'sorter_'+i}>{this.props.lang(key)}</MenuItem>;
  }

  render() {

    if (!this.props.keys) return <span>[No Keys Provided]</span>

    if(!this.currentKey) this.currentKey = this.props.keys[0];

    this.dropdownItems = this.props.keys.map(this._createDropdown);

    let currentSortName = this.props.lang("sorted_by") + ": " + this.props.lang( this.currentKey);

    return (
      <div className="sorter">
        <DropdownButton onSelect={this._onSelect} bsStyle={'default'}
                        title={currentSortName}
                        id="sorter-dropdown">
          {this.dropdownItems}
        </DropdownButton>
      </div>
    );
  }
}

Sorter.displayName = 'Sorter';

export default Sorter;
