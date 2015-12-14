import React from 'react';
import ReactDOM from 'react-dom';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class HelpIcon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <span className={'help_icon ' + this.props.className}>
        <OverlayTrigger trigger={['hover', 'focus']} placement={this.props.placement} overlay={<Popover id={Math.random()} title={this.props.title}>
            {this.props.content}
          </Popover>}>
          <i className="material-icons">{this.props.icon}</i>
        </OverlayTrigger>
      </span>
    );
  }
}

HelpIcon.displayName = 'HelpIcon';

export default HelpIcon;
