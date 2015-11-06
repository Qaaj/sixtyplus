import React from 'react';
import ReactDOM from 'react-dom';
import {Jumbotron} from 'react-bootstrap';
import rd3 from 'react-d3';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let header = (
            <div className='page-header jaaq'>
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
