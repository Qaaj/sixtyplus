
export function calculateYears(data){

    let years = 0;

    let { savingsGoal, monthlyIncome, monthlyCostsFixed, monthlyCostsVariable, currentSavings } = data;

    if (savingsGoal && monthlyIncome && monthlyCostsFixed && monthlyCostsVariable && currentSavings){

        let contribution = 12 * (monthlyIncome - monthlyCostsFixed - monthlyCostsVariable);
        let growth = 0.04; // Correct
        var C_over_R = contribution/growth; // Correct
        var lastDivider = Math.log(1 + growth); // Correct

        savingsGoal = parseFloat(savingsGoal);
        C_over_R = parseFloat(C_over_R);
        currentSavings = parseFloat(currentSavings);


        let first = Math.log( (savingsGoal + C_over_R ) / (currentSavings + C_over_R) ) ;

        years = first /lastDivider;

        return years;
    }

    return years ;

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
