import React, { Component } from 'react';
import urljoin from 'url-join'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper';

import ErrorMessage from './ErrorMessage'

const styles = theme => ({
    NewSightingForm: {
        padding: '30px',
    }
})

class NewSightingForm extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            supportedSpecies: [],
            controlledCount: "",
            controlledSpecies: "",
            controlledDescription: "",
            controlledDate: new Date(),
            apiFetchError: null,
            inputValidationError: null
        }
    }

    handleChange(event) {
        const targetName = event.target.name
        const stateVariableName = "controlled" + targetName.capitalize()
        let value = event.target.value

        // format value and dont update unallowed inputs
        switch (targetName) {
            case 'count':
                if (value === '') break
                value = Number(value)
                if (Number.isNaN(value) || !Number.isFinite(value) || value < 0)
                    return
                break
        }

        this.setState({
            [stateVariableName]: value
        })
    }

    async handleSubmit(event) {
        let inputDataObject = {
            'count': this.state.controlledCount,
            'species': this.state.controlledSpecies,
            'dateTime': new Date().toISOString(),
            'description': this.state.controlledDescription
        }

        try {
            this.validateInputData(inputDataObject)
        } catch (error) {
            this.setState({ inputValidationError: error })
            return
        }

        //input is valid
        this.setState({ inputValidationError: null })

        try {
            await this.sendNewSightingToApi(inputDataObject)
        } catch (error) {
            this.setState({ apiFetchError: error })
            return
        }

        this.props.onClose()
    }

    async sendNewSightingToApi(sightingData) {
        let response = await fetch(urljoin(window.apiUrl, window.sightingsPath), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sightingData)
        })
        if(!response.ok) throw new Error('Error posting the sighting to the api')
    }

    validateInputData(objectWithInputs) {
        if (objectWithInputs.count === undefined || Number.isNaN(objectWithInputs.count) || !Number.isFinite(objectWithInputs.count) || objectWithInputs.count <= 0) {
            let error = new Error('Invalid duck count')
            error.invalidInputName = 'count'
            throw error
        }
        if (objectWithInputs.species === undefined || this.state.supportedSpecies.findIndex((species) => {
            return (species.name === objectWithInputs.species)
        }) === -1) {
            let error = new Error('Invalid species')
            error.invalidInputName = 'species'
            throw error
        }
        if (objectWithInputs.description === undefined || typeof (objectWithInputs.description) === typeof (String)) {
            let error = new Error('Invalid description')
            error.invalidInputName = 'description'
            throw error
        }
    }

    render() {
        if (this.state.apiFetchError !== null) {
            return (
                <Paper elevation={this.props.elevation} className={this.props.classes.NewSightingForm + ' ' + this.props.className}>
                    <ErrorMessage message={this.state.apiFetchError.message} />
                    <Button raised color='primary' className={this.props.classes.button} onClick={this.props.onClose}>Return</Button>
                </Paper>
            )
        }

        let countError = (this.state.inputValidationError !== null && this.state.inputValidationError.invalidInputName === 'count')
        let speciesError = (this.state.inputValidationError !== null && this.state.inputValidationError.invalidInputName === 'species')
        let descriptionError = (this.state.inputValidationError !== null && this.state.inputValidationError.invalidInputName === 'description')

        return (
            <Paper elevation={this.props.elevation} className={this.props.classes.NewSightingForm + ' ' + this.props.className}>
                <TextField fullWidth margin='normal' name='count' label='How many ducks did you see?' value={this.state.controlledCount} onChange={this.handleChange} error={countError} />
                <FormControl fullWidth margin='normal' error={speciesError}>
                    <InputLabel>What species were they?</InputLabel>
                    <Select name='species' value={this.state.controlledSpecies} input={<Input />} onChange={this.handleChange}>
                        {
                            this.state.supportedSpecies.map((species) => {
                                return (<MenuItem value={species.name}>{species.name.capitalize()}</MenuItem>)
                            })
                        }
                    </Select>
                </FormControl>
                <TextField fullWidth margin='normal' name='description' multiline rows={3} label='Tell more about it' value={this.state.formStateCount} onChange={this.handleChange} error={descriptionError} />
                <Button type='submit' raised color='primary' onClick={this.handleSubmit} className={this.props.classes.button}>Send</Button>
                <Button raised color='accent' onClick={this.props.onClose} className={this.props.classes.button}>Nevermind</Button>
            </Paper>
        );
    }
}

export default withStyles(styles)(NewSightingForm);