import defaults from '../../../client/config/Defaults';
import moment from 'moment';

const firstLine = "STK_LOT,account,ticker,name,currency,date,time,amount,commission,price,total,commission_eur".split(",");

export function doImport(rawText){

    const allStocks = rawText.split("\n").map(singleLine => {
        return  singleLine.split("|").reduce((prev,curr,i ) =>{
            prev[firstLine[i]] = curr;
            return prev;
        },{});
    });

    console.log(allStocks);

    return allStocks;
}
