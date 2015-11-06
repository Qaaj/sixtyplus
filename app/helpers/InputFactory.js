import {Input} from 'react-bootstrap';
import { getUserObject } from '../config/User';

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
    }
}


export function createCurrencyFields(fields,func){
   return fields.map(fieldID => {
        if(inputFields[fieldID]) {
            console.log(fieldID)
            var field = inputFields[fieldID];
            return  <Input key={'unique_key_' + fieldID} name={field.name} onSelect={func} type="text" label={field.description} placeholder={field.defaultValue} addonBefore={getUserObject().currency} />;
        }else{
            return <Input key={'unique_key_' + fieldID} name={fieldID} onSelect={func} type="text" label={fieldID} placeholder={fieldID} addonBefore={getUserObject().currency} />;
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
