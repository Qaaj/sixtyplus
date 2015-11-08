import defaults from '../../config/Defaults';
import moment from 'moment';

export function calculateYears(data,portfolio){

    let years = 0;

    let { savingsGoal, monthlyIncome, monthlyCostsFixed, monthlyCostsVariable, currentSavings } = data;

    if (savingsGoal && monthlyIncome && monthlyCostsFixed && monthlyCostsVariable && currentSavings){

        if(!data.taxRate) data.taxRate = defaults['taxRate'];
        if(!data.salaryIncrease) data.salaryIncrease = defaults['salaryIncrease'];
        data.monthlyBudget = (monthlyIncome - monthlyCostsFixed - monthlyCostsVariable);
        let contribution = 12 * data.monthlyBudget;
        let growth = weightedAverage(data,portfolio) ; // Correct
        console.log(growth);
        savingsGoal = parseFloat(savingsGoal);
        currentSavings = parseFloat(currentSavings);

        var temp =  Math.log( (savingsGoal + parseFloat(contribution/growth) ) / (currentSavings + parseFloat(contribution/growth)) ) / parseFloat(Math.log(1 + growth)) ;
        let y = Math.floor(moment.duration(temp, 'years').asYears());
        let m = Math.floor(moment.duration(temp, 'years').asMonths()) -(y * 12);
        let xtra = ''; let xtra2 = ''
        if(m > 1) xtra = 's';
        if(y > 1) xtra2 = 's';



        return y + " year" + xtra2 + " and " + m + " month" +xtra + ".";
    }



    return "" ;

}

export function calculateMonthlyBudget(data){
    let { monthlyIncome, monthlyCostsFixed, monthlyCostsVariable } = data;
    if(monthlyIncome && monthlyCostsFixed && monthlyCostsVariable) return (monthlyIncome - monthlyCostsFixed - monthlyCostsVariable);
    return 0;
}

function weightedAverage(data,portfolio){
    if(!data.stockReturns) data.stockReturns = defaults['stockReturns'];
    if(!data.bondYield) data.bondYield = defaults['bondYield'];
    if(!data.intrestRate) data.intrestRate = defaults['intrestRate'];
    var average = ((1+(data.intrestRate/100)) * portfolio.savings) + ((1+(data.stockReturns/100)) *portfolio.stocks) + ((1+(data.bondYield/100)) * portfolio.bonds)
    return ((average-100)/100);
}

export function calculatePieData(portfolio){
    return [
        {label: 'Bonds', value: portfolio.bonds},
        {label: 'Stocks', value: portfolio.stocks},
        {label: 'Savings', value: portfolio.savings}
    ];
}

export function calculatePortfolio(data){

    let portfolio = {};

    let delta = data.risk * 2;
    portfolio.stocks = 10.0  + parseFloat(delta*1.5);
    portfolio.bonds = 30.0 - parseFloat(delta/2);
    portfolio.savings = 60 - parseFloat(delta)

    return portfolio;

}
