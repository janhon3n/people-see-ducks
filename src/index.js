import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './config.js'
import 'typeface-roboto'

import App from './App'

window.capitalizeString = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

ReactDOM.render(<App />, document.getElementById('root'))
