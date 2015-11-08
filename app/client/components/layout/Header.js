import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron, Input} from 'react-bootstrap';
import rd3 from 'react-d3';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

//<div className='currency-selection'>
//<Input type="select" placeholder="EURO">
//<option value="select">EURO</option>
//<option value="other">DOLLAR</option>
//</Input>
//</div>
    render() {

        let header = (
            <div className='page-header'>
                <Jumbotron>
                    <h1>Quickstart</h1>
                    <p>Take your first steps towards financial independence!</p>
                </Jumbotron>

            </div>);

        return header;
    }
}

Header.displayName = 'Header';

export default Header;
