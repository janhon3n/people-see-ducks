import React, { Component } from 'react';
import TextField from 'material-ui/TextField'

class PositiveIntegerInput extends Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let value = event.target.value

        if(value !== ''){
            
            value = Number(value)

            //dont update disallowed values
            if(Number.isNaN(value) || !Number.isInteger(value) || value < 0){
                return
            }
        }

        this.props.onChange(event)
    }

    render() {
        let value = this.props.value
        if(value === 0){
            value = ''
        }

        return <TextField
            fullWidth={this.props.fullWidth}
            margin={this.props.margin}
            name={this.props.name}
            label={this.props.label}
            value={value}
            onChange={this.handleChange}
            error={this.props.error} />
    }
}

export default PositiveIntegerInput