import React from 'react';
import { Row, Col, Label} from 'react-bootstrap';

class Slider extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{'marginTop':'15px'}} className='form-group'>
                <label className='control-label'>{this.props.label}</label>
                <Row style={{'marginTop':'5px'}}>
                    <Col style={{'marginTop':'-3px'}} md={1}>{this.props.minLabel}</Col>
                    <Col md={10}>
                        <input
                            name={this.props.name}
                            type="range"
                            min={this.props.min}
                            max={this.props.max}
                            step={this.props.step}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            />
                    </Col>
                    <Col style={{'float':'left', 'paddingLeft': '0px', 'marginTop':'-2px'}} md={1}>{this.props.maxLabel}</Col>
                </Row>
            </div>
        );
    }
}

Slider.displayName = 'Slider';

export default Slider;
