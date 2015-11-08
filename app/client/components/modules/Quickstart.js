import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label} from 'react-bootstrap';
import rd3 from 'react-d3';
import { createRegularFields, createCurrencyFields, createPercentageFields } from '../../helpers/InputFactory';
import Slider from '../ui/Slider'

import { calculateYears,calculatePortfolio,calculatePieData } from '../../helpers/calculators/SavingsGoalCalculator';

class Quickstart extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            'sliderVal':0,
            'age': 60,
            'risk': 2
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleInput = this._handleInput.bind(this);

    }

    _handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    _handleInput(e,i){
        this.setState({[e.target.name]:e.target.value})
    }

    _calculateResults(){



        let data = {};

        data.portfolio = calculatePortfolio(this.state);
        data.years = calculateYears(this.state,data.portfolio);
        data.pieData = calculatePieData(data.portfolio);

        return data;


    }

    render() {

        let result = this._calculateResults();

        this.inputFields = createCurrencyFields(['savingsGoal','monthlyIncome','monthlyCostsFixed','monthlyCostsVariable','currentSavings'],this._handleInput,this.props.user.currency);
        this.advancedInputFields = createPercentageFields(['stockReturns','intrestRate','bondYield','taxRate','salaryIncrease'],this._handleInput);
        //this.inputFields.push(createRegularFields(['Lander is Hip'],this._handleInput));
        //<Slider value={this.state['age']} min={29} max={99} minLabel='29' maxLabel='99' label='Age at which you want to achieve your goal' name='age' onChange={this._handleChange} step={1} />

        var PieChart = rd3.PieChart;

        return (<div>


            <Grid>
                <Row className="show-grid oops">
                    <Col md={6}>
                        <Panel header={<h3>Basics <small>Enter your basic information</small></h3>}>
                            {this.inputFields}
                            <Slider value={this.state['risk']} min={0} max={10}  minLabel='Low' maxLabel='High' label='Risk Tolerance' name='risk' onChange={this._handleChange} step={1} />
                        </Panel>
                    </Col>
                    <Col md={6} >
                        <Panel header={<h3>Analysis <small>Projections based on your settings</small></h3>}>
                            <Input disabled={true} type="text" label="Monthly savings budget:" placeholder="100000" addonBefore="€" />
                            <div style={{'width':'400px','marginLeft':'50px'}}>
                                    <PieChart
                                    data={result.pieData}
                                    width={400}
                                    height={300}
                                    radius={100}
                                    innerRadius={20}
                                    sectorBorderColor="white"
                                    />
                            </div>
                            <h3>Projected timeframe: {result.years}</h3>
                        </Panel>
                    </Col>
                    <Col className='collapsible' md={12}>
                        <Panel className='opportunities-panel' collapsible
                               header={<h3>Advanced Settings</h3>}>
                            <Row className="show-grid">
                                <Col md={6}>
                                        {this.advancedInputFields.slice(0,3)}
                                </Col>
                                <Col md={6}>
                                        {this.advancedInputFields.slice(3,5)}
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
