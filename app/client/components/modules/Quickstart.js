import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label, Tabs, Tab} from 'react-bootstrap';
import { PieChart } from 'react-d3';
import { createRegularFields, createCurrencyFields, createPercentageFields } from '../../helpers/InputFactory';
import Slider from '../ui/Slider'

import { calculateYears,calculatePortfolio,calculatePieData,calculateMonthlyBudget } from '../../helpers/calculators/SavingsGoalCalculator';

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
        data.monthlyBudget = calculateMonthlyBudget(this.state);
        data.years = calculateYears(this.state,data.portfolio);
        data.pieData = calculatePieData(data.portfolio);

        return data;
    }

    render() {

        let result = this._calculateResults();

        this.inputFields = createCurrencyFields(['savingsGoal','monthlyIncome','monthlyCostsFixed','monthlyCostsVariable','currentSavings'],this._handleInput);
        this.advancedInputFields = createPercentageFields(['stockReturns','intrestRate','bondYield','taxRate','salaryIncrease'],this._handleInput);
        let cx='success';
        if(result.monthlyBudget < 1) cx = 'warning';

        let timeFrame = null;
        if(result.years != "") timeFrame = (<h3>Projected timeframe: {result.years}</h3>);
        //this.inputFields.push(createRegularFields(['Lander is Hip'],this._handleInput));
        //<Slider value={this.state['age']} min={29} max={99} minLabel='29' maxLabel='99' label='Age at which you want to achieve your goal' name='age' onChange={this._handleChange} step={1} />

        return (<div>
            <Grid>
                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Basics">
                        <Grid>
                            <Row className="show-grid ">
                                <Col md={6}>
                                    <Panel header={<h3>Basics <small>Enter your basic information</small></h3>}>
                                        {this.inputFields}
                                        <Slider value={this.state['risk']} min={0} max={10}  minLabel='Low' maxLabel='High' label='Risk Tolerance' name='risk' onChange={this._handleChange} step={1} />
                                    </Panel>
                                </Col>
                                <Col md={6} >
                                    <Panel style={{'textAlign':'center'}} header={<h3>Analysis <small>Projections based on your settings</small></h3>}>
                                        <h3>Monthly budget:  <Label bsStyle={cx}>{this.props.user.currency} {result.monthlyBudget}</Label></h3>
                                        <div style={{'width':'400px','marginLeft':'auto','marginRight':'auto'}}>
                                            <PieChart
                                                data={result.pieData}
                                                width={400}
                                                height={300}
                                                radius={100}
                                                innerRadius={20}
                                                sectorBorderColor="white"
                                                />
                                        </div>
                                        {timeFrame}
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
                    </Tab>
                    <Tab eventKey={2} title="Detailed View">Tab 2 content</Tab>
                    <Tab eventKey={3} title="Tab 3" disabled>Tab 3 content</Tab>
                </Tabs>
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
