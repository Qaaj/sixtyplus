import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Button, Row, Col, Grid, PageHeader, Panel, Input, Label, Tabs, Tab} from 'react-bootstrap';
import { PieChart } from 'react-d3';
import { createRegularFields, createCurrencyFields, createPercentageFields } from '../../helpers/InputFactory';
import Slider from '../ui/Slider';
import { calculateYears,calculatePortfolio,calculatePieData,calculateMonthlyBudget } from '../../../shared/helpers/calculators/SavingsGoalCalculator';
import UserActionCreators from '../../actions/UserActionCreators';
import StockTable from '../tables/StockCardTable';
import Importer from './ImporterModule';
import {fromJS } from 'immutable';
import AutoSaveStore from '../../stores/AutoSaveStore';
import {nameCreator,autoSaver} from '../../../shared/helpers/decorators';

@nameCreator
@autoSaver
class Quickstart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'risk': 2,
    }
    // Decorators not working on production
    this.name = "Quickstart";

    this.saveObject = [
      {
        save_prop: 'monthlyBudget',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'monthlyCostsFixed',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'monthlyCostsVariable',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'currentSavings',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'monthlyIncome',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'risk',
        save_location: 'financial_profile',
      }
      , {
        save_prop: 'savingsGoal',
        save_location: 'financial_profile',
      }
    ];
  }

  componentWillReceiveProps(newProps) {
    this._getStateFromProps(newProps);
  }

  componentDidMount() {
    this._getStateFromProps();
  }

  _getStateFromProps(newProps) {

    if (!newProps) newProps = this.props;
    var state = {};

    if (newProps.user.toJS().financial_profile) {
      state = newProps.user.toJS().financial_profile;
    }
    this.setState(state);
  }

  _saveStateFromInput(e) {
    this.setState({[e.target.name]: parseInt(e.target.value)});
    if (this.state[e.target.name] != parseInt(e.target.value)) {
      this.state[e.target.name] = parseInt(e.target.value);
      AutoSaveStore.saveModuleSetting(this);
    }
  }

  _handleInput(e, i) {
    this._saveStateFromInput(e);
  }

  _calculateResults() {

    let state = fromJS(this.state).toJS();
    calculatePortfolio(state);
    calculateMonthlyBudget(state);
    calculateYears(state);
    calculatePieData(state);
    return state;

  }

  render() {

    let state = this._calculateResults();

    this.inputFields = createCurrencyFields(['savingsGoal', 'monthlyIncome', 'monthlyCostsFixed', 'monthlyCostsVariable', 'currentSavings'], ::this._handleInput, state);
    this.advancedInputFields = createPercentageFields(['stockReturns', 'intrestRate', 'bondYield', 'taxRate', 'salaryIncrease'], ::this._handleInput, state);
    let cx = 'success';
    if (state.monthlyBudget < 1) cx = 'warning';

    let timeFrame = null;
    if (state.years != "") timeFrame = (<h3>Projected timeframe: {state.years}</h3>);
    //this.inputFields.push(createRegularFields(['Lander is Hip'],this._handleInput));

    return (<Grid className="planner">
      <Row className="show-grid ">
        <Col md={6}>
          <Panel header={<h3>Basics <small>Enter your basic information</small></h3>}>
            {this.inputFields}
            <Slider value={state['risk']} min={0} max={10} minLabel='Low' maxLabel='High' label='Risk Tolerance'
                    name='risk' onChange={::this._handleInput} step={1}/>
          </Panel>
        </Col>
        <Col md={6}>
          <Panel style={{'textAlign':'center'}}
                 header={<h3>Analysis <small>Projections based on your settings</small></h3>}>
            <h3>Monthly budget: <Label
              bsStyle={cx}>{this.props.user.currency} {state.monthlyBudget}</Label></h3>
            <div style={{'width':'400px','marginLeft':'auto','marginRight':'auto'}}>
              <PieChart
                data={state.pieData}
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
                {this.advancedInputFields.slice(0, 3)}
              </Col>
              <Col md={6}>
                {this.advancedInputFields.slice(3, 5)}
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    </Grid>);
  };;
}

Quickstart.displayName = 'Quickstart';
Quickstart.PropTypes = {
  history: React.PropTypes.obj,
  location: React.PropTypes.obj,
  urlParams: React.PropTypes.obj,
  user: React.PropTypes.string,
};

export default Quickstart;
