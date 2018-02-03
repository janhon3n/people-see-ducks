import React from 'react'
import ReactDOM from 'react-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import primaryColor from 'material-ui/colors/brown'
import secondaryColor from 'material-ui/colors/grey'
import './index.css'
import 'typeface-roboto'

import App from './App'

window.capitalizeString = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const theme = createMuiTheme({
    palette: {
        primary: primaryColor, // Purple and green play nicely together.
        secondary: secondaryColor, // This is just green.A700 as hex.
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root'))
