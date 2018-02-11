import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

class PositiveIntegerInput extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if (event.target.value !== '') {
            let valueAsNumber = Number(event.target.value)

            // don't update disallowed values

            if (Number.isNaN(valueAsNumber) ||
                !Number.isInteger(valueAsNumber) ||
                valueAsNumber <= 0 ||
                valueAsNumber > 10000) {
                return
            }
        }
        this.props.onChange(event)
    }

    render() {
        return <TextField {...this.props}
            type="number"
            onChange={this.handleChange} />
    }
}

PositiveIntegerInput.propTypes = {
    onChange: PropTypes.func,
}

export default PositiveIntegerInput
