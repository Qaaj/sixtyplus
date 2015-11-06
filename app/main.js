require("./main.scss");
import React from 'react';
import ReactDOM from 'react-dom';

import Quickstart from './components/Quickstart';

var newDiv = document.createElement("div");

ReactDOM.render(<Quickstart   />, newDiv);

document.body.appendChild(newDiv);
