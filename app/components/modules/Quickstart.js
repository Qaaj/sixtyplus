import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label} from 'react-bootstrap';
import rd3 from 'react-d3';
import { createRegularFields, createCurrencyFields } from '../../helpers/InputFactory';

class Quickstart extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            'sliderVal':0
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleInput = this._handleInput.bind(this);

        this.inputFields = createCurrencyFields(['savingsGoal','monthlyIncome','monthlyCostsFixed','monthlyCostsVariable','currentSavings'],this._handleInput);
        this.inputFields.push(createRegularFields(['Lander is Hip'],this._handleInput));

    }

    _handleChange(e){
        console.log(e.target.value);
        this.setState({'sliderVal':e.target.value})
    }

    _handleInput(e,i){
        console.log(e.target.value,e.target.name);
    }

    render() {



        let delta = this.state.sliderVal;
        let stocks = 10.0  + parseFloat(delta);
        let bonds = 30.0 - parseFloat(delta);


        var pieData = [
            {label: 'Bonds', value: bonds},
            {label: 'Stocks', value: stocks},
            {label: 'Savings', value: 20.0 }
        ];

        var PieChart = rd3.PieChart;
        //
        //let basicFields = this.inputFields.map(field =>{
        //   return (
        //       <Input key={field.key} name={field.name} onSelect={field.handler} type="text" label={field.description} placeholder={field.description} addonBefore={field.currency} />
        //   );
        //
        //});
        //
        //console.log(basicFields);

        return (<div>


            <Grid>
                <Row className="show-grid">
                    <Col md={6}>
                        <Panel header={<h3>Basics <small>Enter your basic information</small></h3>}>
                            {this.inputFields}
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
Quickstart.PropTypes ={
    history: React.PropTypes.obj,
    location: React.PropTypes.obj,
    urlParams: React.PropTypes.obj,
    userObject: React.PropTypes.string,
}

export default Quickstart;
