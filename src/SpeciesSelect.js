import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input, {InputLabel} from 'material-ui/Input'
import {MenuItem} from 'material-ui/Menu'
import Select from 'material-ui/Select'
import {FormControl} from 'material-ui/Form'
import FormHelperText from 'material-ui/Form/FormHelperText'

class SpeciesSelect extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let value = event.target.value

        // if new value not one of species, dont update
        if (this.props.species.findIndex((species) => {
            return (species.name === value)
        }) === -1) return

        this.props.onChange(event)
    }

    render() {
        return (
            <FormControl fullWidth={this.props.fullWidth} margin={this.props.margin} error={this.props.error}>
                <InputLabel>{this.props.label}</InputLabel>
                <Select name='species' value={this.props.value} input={<Input />} onChange={this.handleChange}>
                    {
                        this.props.species.map((species) => {
                            return (<MenuItem alt="duck" value={species.name} key={species.name}>
                                {window.capitalizeString(species.name)}
                            </MenuItem>)
                        })
                    }
                </Select>
                <FormHelperText>{this.props.helperText}</FormHelperText>
            </FormControl>
        )
    }
}
SpeciesSelect.propTypes = {
    species: PropTypes.array.isRequired,
    fullWidth: PropTypes.bool,
    margin: PropTypes.string,
    error: PropTypes.bool,
    label: PropTypes.string,
    helperText: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default SpeciesSelect
