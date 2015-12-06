import defaults from '../../../client/config/Defaults';
import moment from 'moment';

export function calculateYears(data){

    data.years = "";

    let { savingsGoal, monthlyIncome, monthlyCostsFixed, monthlyCostsVariable, currentSavings } = data;

    if (savingsGoal && monthlyIncome && monthlyCostsFixed && monthlyCostsVariable && currentSavings){

        if(!data.taxRate) data.taxRate = defaults['taxRate'];
        if(!data.salaryIncrease) data.salaryIncrease = defaults['salaryIncrease'];
        data.monthlyBudget = (monthlyIncome - monthlyCostsFixed - monthlyCostsVariable);
        let contribution = 12 * data.monthlyBudget;
        let growth = weightedAverage(data) ; // Correct
        savingsGoal = parseFloat(savingsGoal);
        currentSavings = parseFloat(currentSavings);

        var temp =  Math.log( (savingsGoal + parseFloat(contribution/growth) ) / (currentSavings + parseFloat(contribution/growth)) ) / parseFloat(Math.log(1 + growth)) ;
        let y = Math.floor(moment.duration(temp, 'years').asYears());
        let m = Math.floor(moment.duration(temp, 'years').asMonths()) -(y * 12);
        let xtra = ''; let xtra2 = '';
        if(m > 1) xtra = 's';
        if(y > 1) xtra2 = 's';

        data.years =  y + " year" + xtra2 + " and " + m + " month" +xtra + ".";
    }
}

export function calculateMonthlyBudget(data){
    let { monthlyIncome, monthlyCostsFixed, monthlyCostsVariable } = data;
    data.monthlyBudget = 0;
    if(monthlyIncome && monthlyCostsFixed && monthlyCostsVariable) {
        data.monthlyBudget = (monthlyIncome - monthlyCostsFixed - monthlyCostsVariable);
    }
}

function weightedAverage(data){
    if(!data.stockReturns) data.stockReturns = defaults['stockReturns'];
    if(!data.bondYield) data.bondYield = defaults['bondYield'];
    if(!data.intrestRate) data.intrestRate = defaults['intrestRate'];
    var average = ((1+(data.intrestRate/100)) * data.allocation.savings) + ((1+(data.stockReturns/100)) *data.allocation.stocks) + ((1+(data.bondYield/100)) * data.allocation.bonds);
    return ((average-100)/100);
}

export function calculatePieData(data){
    data.pieData = [
        {label: 'Bonds', value: data.allocation.bonds},
        {label: 'Stocks', value: data.allocation.stocks},
        {label: 'Savings', value: data.allocation.savings}
    ];
}

export function calculatePortfolio(data){

    let allocation = {};

    let delta = data.risk * 2;
    allocation.stocks = 10.0  + parseFloat(delta*1.5);
    allocation.bonds = 30.0 - parseFloat(delta/2);
    allocation.savings = 60 - parseFloat(delta);

    data.allocation = allocation;

}
