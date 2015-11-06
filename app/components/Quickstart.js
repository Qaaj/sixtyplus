import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label} from 'react-bootstrap';
import rd3 from 'react-d3';

class Quickstart extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            'sliderVal':0
        }

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e){
        console.log(e.target.value);
        this.setState({'sliderVal':e.target.value})
    }

    render() {

        let header = (
        <div className='page-header'>
            <Jumbotron>
                <h1>Quickstart</h1>
                <p>Take your first steps towards financial independence!</p>
            </Jumbotron>
        </div>);

        let delta = this.state.sliderVal;
        let stocks = 10.0  + parseFloat(delta);
        let bonds = 30.0 - parseFloat(delta);


        var pieData = [
            {label: 'Bonds', value: bonds},
            {label: 'Stocks', value: stocks},
            {label: 'Savings', value: 20.0 }
        ];

        var PieChart = rd3.PieChart;

        return (<div>


            <Grid>
                <Row className="show-grid">
                    <Col md={12}> {header}</Col>
                    <Col md={6}>
                        <Panel header={<h3>Basics <small>Enter your basic information</small></h3>}>
                            <Input type="text" label="Your savings goal is" placeholder="100000" addonBefore="€" />
                            <Input type="text" label="Current monthly income" placeholder="1500" addonBefore="€" />
                            <Input type="text" label="Monthly fixed costs" placeholder="650" addonBefore="€" />
                            <Input type="text" label="Monthly variable costs" placeholder="550" addonBefore="€" />
                            <Input type="text" label="Current savings" placeholder="10000" addonBefore="€" />
                            <div classNale='form-group'>
                                <label className='control-label'>Risk Tolerance</label>
                                <Row style={{'marginTop':'5px'}}>
                                    <Col style={{'marginTop':'-3px'}} md={1}><b>Low</b></Col>
                                    <Col md={10}>
                                            <input
                                            name="green"
                                            type="range"
                                            min={0}
                                            max={20}
                                            step={1}
                                            value={this.state.sliderVal}
                                            onChange={this._handleChange}
                                            />
                                    </Col>
                                    <Col style={{'float':'left', 'paddingLeft': '0px', 'marginTop':'-2px'}} md={1}><b>High</b></Col>
                                </Row>
                            </div>

                        </Panel>
                    </Col>
                    <Col md={6} >
                        <Panel header={<h3>Analysis <small>Projections based on your settings</small></h3>}>
                            <Input disabled={true} type="text" label="Monthly savings budget:" placeholder="100000" addonBefore="€" />
                            <PieChart
                                data={pieData}
                                width={400}
                                height={400}
                                radius={100}
                                innerRadius={20}
                                sectorBorderColor="white"
                                title="Pie Chart"
                                />

                        </Panel>
                    </Col>
                    <Col className='collapsible' md={12}>
                        <Panel className='opportunities-panel' collapsible
                               header={<h3>Advanced Settings</h3>}>
                            <Row className="show-grid">
                                <Col md={6}>
                                        <Input type="text" label="Expected Stock Returns" placeholder="4" addonBefore="%" />
                                        <Input type="text" label="Expected Interest Rate" placeholder="2" addonBefore="%" />
                                        <Input type="text" label="Expected Bond Yield" placeholder="3" addonBefore="%" />
                                </Col>
                                <Col md={6}>
                                    <Input type="text" label="Tax Rate" placeholder="4" addonBefore="%" />
                                    <Input type="text" label="Expected Salary Increase (Yearly)" placeholder="2" addonBefore="%" />
                                </Col>
                                </Row>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </div>);
    }
}

Quickstart.displayName = 'Quickstart';

export default Quickstart;
