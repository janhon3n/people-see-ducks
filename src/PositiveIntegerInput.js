import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

class PositiveIntegerInput extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let value = event.target.value

        if (value !== '') {
            value = Number(value)

            // dont update disallowed values
            if (Number.isNaN(value) || !Number.isInteger(value) || value < 0) {
                return
            }
        }

        this.props.onChange(event)
    }

    render() {
        return <TextField
            name={this.props.name}
            label={this.props.label}
            helperText={this.props.helperText}
            value={this.props.value}
            onChange={this.handleChange}
            error={this.props.error} />
    }
}

PositiveIntegerInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    handleChange: PropTypes.func,
    error: PropTypes.bool,
}
export default PositiveIntegerInput
