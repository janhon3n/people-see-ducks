import React, { Component } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select'
import { FormControl, FormHelperText } from 'material-ui/Form';

class SpeciesSelect extends Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        let value = event.target.value

        //if new value not one of species, dont update
        if(this.props.species.findIndex((species) => {
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
                            return (<MenuItem value={species.name}>{species.name.capitalize()}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        )
    }
}

export default SpeciesSelect