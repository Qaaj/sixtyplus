import moment from 'moment';
var stockData = require("json!../../../../static/trades.json");
import { Label } from 'react-bootstrap';
import SingleStock from '../ui/SingleStock';

class StockTable extends React.Component {

    constructor(props) {
        super(props);

        let sortedStocks = {};

        stockData.map(tx =>{
            if(!sortedStocks[tx.ticker]) sortedStocks[tx.ticker] = [];
            let formattedTX = {};
            formattedTX.date = moment(tx.date, "YYYYMMDD");
            formattedTX.ticker = tx.ticker;
            formattedTX.name = this.capitalizeFirstLetter(tx.name.toLowerCase());
            formattedTX.amount = parseFloat(tx.amount);
            formattedTX.price = parseFloat(tx.price);
            formattedTX.total = parseFloat(tx.total);
            sortedStocks[tx.ticker].push(formattedTX);
        });

        this.fields = [];
        for(let key in sortedStocks){
            let single = (<SingleStock key={Math.random()} entries={sortedStocks[key]} ticker={key} />);
            this.fields.push(single)
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {

        let table = (

            <div>
                {this.fields}
            </div>
        );

        return table;
    }
}

StockTable.displayName = 'StockTable';

export default StockTable;
