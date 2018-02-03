import React from 'react'
import ReactDOM from 'react-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import primaryColor from 'material-ui/colors/brown'
import secondaryColor from 'material-ui/colors/grey'
import errorColor from 'material-ui/colors/red'
import 'typeface-roboto'

import App from './App'

window.capitalizeString = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
window.numberToWord = function(number) {
    let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    if (Number.isInteger(number) && number > 0 && number <= words.length) {
        return words[number - 1]
    } else {
        return number.toString()
    }
}

const theme = createMuiTheme({
    palette: {
        primary: primaryColor, // Purple and green play nicely together.
        secondary: secondaryColor, // This is just green.A700 as hex.
        error: errorColor,
    },
    overrides: {
        MuiFormControl: {
            root: {
                width: '100%',
                margin: '15px',
            },
        },
        MuiButton: {
            root: {
                'margin': '15px',
                'marginRight': '0px',
                '&:last-child': {
                    marginRight: '15px',
                },
            },
        },
        MuiTypography: {
            headline: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
)
