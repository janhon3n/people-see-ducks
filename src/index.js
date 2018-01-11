import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './config.js'
import 'typeface-roboto'

import registerServiceWorker from './registerServiceWorker';

import App from './App';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
