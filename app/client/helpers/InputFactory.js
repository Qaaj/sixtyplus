import {Input} from 'react-bootstrap';

import UserActionCreators from '../actions/UserActionCreators';
import UserStore from '../stores/UserStore';
import defaults from '../config/Defaults';

let user = UserStore.getUser();

function _handleUserStoreChange() {
    user = UserStore.getUser();
}

UserStore.addChangeListener(_handleUserStoreChange);


let inputFields = {
    'savingsGoal': {
        name: 'savingsGoal',
        defaultValue: 100000,
        description: 'Your savings goal is',
    },
    'monthlyIncome': {
        name: 'monthlyIncome',
        defaultValue: 1500,
        description: 'Current monthly income',
    },
    'monthlyCostsFixed': {
        name: 'monthlyCostsFixed',
        defaultValue: 750,
        description: 'Monthly fixed costs',
    },
    'monthlyCostsVariable': {
        name: 'monthlyCostsVariable',
        defaultValue: 550,
        description: 'Monthly variable costs',
    },
    'currentSavings': {
        name: 'currentSavings',
        defaultValue: 10000,
        description: 'Current savings',
    },
    'stockReturns': {
        name: 'stockReturns',
        defaultValue: defaults['stockReturns'],
        description: 'Average Stock Returns',
    },
    'intrestRate': {
        name: 'intrestRate',
        defaultValue: defaults['intrestRate'],
        description: 'Average Intrest Rate',
    },
    'bondYield': {
        name: 'bondYield',
        defaultValue: defaults['bondYield'],
        description: 'Average Bond Yield',
    },
    'taxRate': {
        name: 'taxRate',
        defaultValue: defaults['taxRate'],
        description: 'Tax Rate',
    },
    'salaryIncrease': {
        name: 'salaryIncrease',
        defaultValue: defaults['salaryIncrease'],
        description: 'Average Yearly Salary Increase',
    }
}

export function createCurrencyFields(fields,func,state){
   return fields.map(fieldID => {
        let value =  state[fieldID] ? state[fieldID] : '';
        if(inputFields[fieldID]) {
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} ref={field.name} name={field.name} onChange={func} type="text" label={field.description} placeholder={field.defaultValue} value={value} addonBefore={user.currency} />;
        }else{
            return <Input key={'unique_key_' + fieldID} ref={field.name} name={fieldID} onChange={func} type="text" label={fieldID} placeholder={fieldID} value={value} addonBefore={user.currency} />;
        }
    });
}

export function createPercentageFields(fields,func,state){
    return fields.map(fieldID => {
        let value =  state[fieldID] ? state[fieldID] : '';
        if(inputFields[fieldID]) {
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} ref={field.name} name={field.name} onChange={func} type="text" label={field.description} placeholder={field.defaultValue} value={value} addonBefore={'%'} />;
        }else{
            return <Input key={'unique_key_' + fieldID} ref={field.name} name={fieldID} onChange={func} type="text" label={fieldID} placeholder={fieldID} value={value} addonBefore={'%'} />;
        }
    });
}

export function createRegularFields(fields,func){
    return fields.map(fieldID => {
        if(inputFields[fieldID]) {
            console.log(fieldID)
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} name={field.name} onChange={func} type="text" label={field.description} placeholder={field.defaultValue}  />;
        }else{
            return <Input key={'unique_key_' + fieldID} name={fieldID} onChange={func} type="text" label={fieldID} placeholder={fieldID}  />;
        }
    });
}

