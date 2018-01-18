import React, { Component } from 'react';
import urljoin from 'url-join'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper';

import ErrorMessage from './ErrorMessage'
import PositiveIntegerInput from './PositiveIntegerInput'
import SpeciesSelect from './SpeciesSelect'

const styles = theme => ({
    NewSightingForm: {
        padding: '30px',
    },
    button: {
        marginTop: '15px',
        marginRight: '15px',
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
            apiFetchError: null,
            inputValidationError: null
        }
    }
   
    async componentDidMount() {
        //fetch species from the API and add them to the state 
        try {
            var response = await fetch(urljoin(window.apiUrl, window.speciesPath))
            if(!response.ok) throw Error('Error fetching content from the API.')
            response = await response.json()
        } catch(error){
            return this.setState({apiFetchError: error})
        }
        this.setState({supportedSpecies: response, apiFetchError: null })
    }

    handleChange(event) {
        const stateVariableName = "controlled" + event.target.name.capitalize()
        this.setState({
            [stateVariableName]: event.target.value
        })
    }

    async handleSubmit(event) {
        let inputDataObject = {
            'count': Number(this.state.controlledCount),
            'species': this.state.controlledSpecies,
            'dateTime': new Date().toISOString(),
            'description': this.state.controlledDescription
        }

        try {
            this.validateInputData(inputDataObject)
        } catch (error) {
            return this.setState({ inputValidationError: error })
        }
        //input is valid
        this.setState({ inputValidationError: null })
        
        try {
            await this.sendNewSightingToApi(inputDataObject)
        } catch (error) {
            return this.setState({ apiFetchError: error })
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
        if (objectWithInputs.count === undefined  || typeof(objectWithInputs.count) !== 'number' || Number.isNaN(objectWithInputs.count) || !Number.isFinite(objectWithInputs.count) || objectWithInputs.count <= 0) {
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
        if (objectWithInputs.description === undefined || typeof(objectWithInputs.description) !== 'string') {
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
                <PositiveIntegerInput name='count' value={this.state.controlledCount} onChange={this.handleChange} error={countError}
                    label='How many ducks did you see?' fullWidth margin='normal'/>

                <SpeciesSelect value={this.state.controlledSpecies} onChange={this.handleChange} error={speciesError} species={this.state.supportedSpecies}
                    label='What species were they?' fullWidth margin='normal'/>

                <TextField name='description' value={this.state.formStateCount} onChange={this.handleChange} error={descriptionError}
                    label='Tell more about it' multiline rows={3} fullWidth margin='normal' />

                <Button type='submit' onClick={this.handleSubmit} className={this.props.classes.button}
                    raised color='primary'>Send</Button>
                <Button onClick={this.props.onClose} className={this.props.classes.button}
                    raised color='accent'>Nevermind</Button>

            </Paper>
        );
    }
}

export default withStyles(styles)(NewSightingForm);