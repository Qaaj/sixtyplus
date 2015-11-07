import {Input} from 'react-bootstrap';

import UserActionCreators from '../actions/UserActionCreators';
import UserStore from '../stores/UserStore';

let user = UserStore.getUser();

function _handleUserStoreChange() {

    user = UserStore.getUser();
    if(user.currency == "EURO") user.currency = "€";
    if(user.currency == "DOLLAR") user.currency = "$";
    if(user.currency == "POUND") user.currency = "£";

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
        defaultValue: 4,
        description: 'Average Stock Returns',
    },
    'intrestRate': {
        name: 'intrestRate',
        defaultValue: 2,
        description: 'Average Intrest Rate',
    },
    'bondYield': {
        name: 'bondYield',
        defaultValue: 3,
        description: 'Average Bond Yield',
    },
    'taxRate': {
        name: 'taxRate',
        defaultValue: 15,
        description: 'Tax Rate',
    },
    'salaryIncrease': {
        name: 'salaryIncrease',
        defaultValue: 2.7,
        description: 'Average Yearly Salary Increase',
    }
}

export function createCurrencyFields(fields,func,currency){
   return fields.map(fieldID => {
        if(inputFields[fieldID]) {
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} ref={field.name} name={field.name} onSelect={func} type="text" label={field.description} placeholder={field.defaultValue} addonBefore={user.currency} />;
        }else{
            return <Input key={'unique_key_' + fieldID} ref={field.name} name={fieldID} onSelect={func} type="text" label={fieldID} placeholder={fieldID} addonBefore={user.currency} />;
        }
    });
}

export function createPercentageFields(fields,func){
    return fields.map(fieldID => {
        if(inputFields[fieldID]) {
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} ref={field.name} name={field.name} onSelect={func} type="text" label={field.description} placeholder={field.defaultValue} addonBefore={'%'} />;
        }else{
            return <Input key={'unique_key_' + fieldID} ref={field.name} name={fieldID} onSelect={func} type="text" label={fieldID} placeholder={fieldID} addonBefore={'%'} />;
        }
    });
}

export function createRegularFields(fields,func){
    return fields.map(fieldID => {
        if(inputFields[fieldID]) {
            console.log(fieldID)
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} name={field.name} onSelect={func} type="text" label={field.description} placeholder={field.defaultValue}  />;
        }else{
            return <Input key={'unique_key_' + fieldID} name={fieldID} onSelect={func} type="text" label={fieldID} placeholder={fieldID}  />;
        }
    });
}

