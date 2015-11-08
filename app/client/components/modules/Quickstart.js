import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label, Tabs, Tab} from 'react-bootstrap';
import { PieChart } from 'react-d3';
import { createRegularFields, createCurrencyFields, createPercentageFields } from '../../helpers/InputFactory';
import Slider from '../ui/Slider';
import { calculateYears,calculatePortfolio,calculatePieData,calculateMonthlyBudget } from '../../helpers/calculators/SavingsGoalCalculator';
import { saveUserData } from '../../actions/UserActionCreators';
import StockTable from '../tables/StockTable';

class Quickstart extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            'risk': 2
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleInput = this._handleInput.bind(this);

    }

    componentWillReceiveProps(newProps){
        if(newProps.user.userData){
            this.setState(newProps.user.userData);
        }
    }
    _handleChange(e){
        this.setState({[e.target.name]:e.target.value})

        if(this.state[e.target.name] != e.target.value) {
            this.state[e.target.name] = e.target.value;
            saveUserData(this.state);
        }

    }

    _handleInput(e,i){
        this.setState({[e.target.name]:e.target.value})

        if(this.state[e.target.name] != e.target.value) {
            this.state[e.target.name] = e.target.value;
            saveUserData(this.state);
        }

    }

    _calculateResults(){

        calculatePortfolio(this.state);
        calculateMonthlyBudget(this.state);
        calculateYears(this.state);
        calculatePieData(this.state);


    }

    render() {

        this._calculateResults();

        this.inputFields = createCurrencyFields(['savingsGoal','monthlyIncome','monthlyCostsFixed','monthlyCostsVariable','currentSavings'],this._handleInput,this.state);
        this.advancedInputFields = createPercentageFields(['stockReturns','intrestRate','bondYield','taxRate','salaryIncrease'],this._handleInput,this.state);
        let cx='success';
        if(this.state.monthlyBudget < 1) cx = 'warning';

        let timeFrame = null;
        if(this.state.years != "") timeFrame = (<h3>Projected timeframe: {this.state.years}</h3>);
        //this.inputFields.push(createRegularFields(['Lander is Hip'],this._handleInput));
        //<Slider value={this.state['age']} min={29} max={99} minLabel='29' maxLabel='99' label='Age at which you want to achieve your goal' name='age' onChange={this._handleChange} step={1} />

        return (<div>
            <Grid>
                <Tabs defaultActiveKey={2}>
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
                                        <h3>Monthly budget:  <Label bsStyle={cx}>{this.props.user.currency} {this.state.monthlyBudget}</Label></h3>
                                        <div style={{'width':'400px','marginLeft':'auto','marginRight':'auto'}}>
                                            <PieChart
                                                data={this.state.pieData}
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
                                    <Panel className='advanced-panel' collapsible
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
                    <Tab eventKey={2} title="Stocks">
                        <StockTable />
                    </Tab>
                    <Tab eventKey={3} title="Settings" disabled>Tab 3 content</Tab>
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
