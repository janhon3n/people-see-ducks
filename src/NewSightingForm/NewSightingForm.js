import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'

import PositiveIntegerInput from './PositiveIntegerInput'
import SpeciesSelect from './SpeciesSelect'

const styles = (theme) => ({
    NewSightingForm: {
        padding: '30px',
        maxWidth: '600px',
    },
})

class NewSightingForm extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateInputData = this.validateNewSighting.bind(this)

        this.state = {
            controlledCount: '',
            controlledSpecies: '',
            controlledDescription: '',
            inputValidationError: null,
        }
    }

    handleChange(event) {
        const stateVariableName = 'controlled' + window.capitalizeString(event.target.name)
        this.setState({
            [stateVariableName]: event.target.value,
        })
    }

    async handleSubmit() {
        let sightingToSubmit = {
            'count': Number(this.state.controlledCount),
            'species': this.state.controlledSpecies,
            'dateTime': new Date().toISOString(),
            'description': this.state.controlledDescription,
        }
        try {
            this.validateNewSighting(sightingToSubmit)
        } catch (error) {
            return this.setState({inputValidationError: error})
        }
        this.setState({inputValidationError: null})
        this.props.onSightingSubmit(sightingToSubmit)
    }

    validateNewSighting(sighting) {
        if (sighting.count === undefined ||
            typeof (sighting.count) !== 'number' ||
            Number.isNaN(sighting.count) ||
            !Number.isFinite(sighting.count) ||
            sighting.count <= 0) {
            let error = new Error('Invalid duck count')
            error.invalidInputName = 'count'
            throw error
        }
        if (sighting.species === undefined ||
            this.props.supportedSpecies.findIndex((species) => {
                return (species.name === sighting.species)
            }) === -1) {
            let error = new Error('Invalid species')
            error.invalidInputName = 'species'
            throw error
        }
        if (sighting.description === undefined ||
            typeof (sighting.description) !== 'string') {
            let error = new Error('Invalid description')
            error.invalidInputName = 'description'
            throw error
        }
    }

    render() {
        let countError = (this.state.inputValidationError !== null &&
            this.state.inputValidationError.invalidInputName === 'count' ?
            this.state.inputValidationError : null)
        let speciesError = (this.state.inputValidationError !== null &&
            this.state.inputValidationError.invalidInputName === 'species' ?
            this.state.inputValidationError : null)
        let descriptionError = (this.state.inputValidationError !== null
            && this.state.inputValidationError.invalidInputName === 'description' ?
            this.state.inputValidationError : null)

        return (
            <Paper className={this.props.classes.NewSightingForm}>
                <PositiveIntegerInput name='count' value={this.state.controlledCount}
                    onChange={this.handleChange}
                    error={(countError !== null)}
                    helperText={(countError !== null) ? 'Input the number of ducks you saw': ''}
                    label='How many ducks did you see?'/>

                <SpeciesSelect name='species' value={this.state.controlledSpecies}
                    onChange={this.handleChange} species={this.props.supportedSpecies}
                    error={(speciesError !== null)}
                    helperText={(speciesError !== null) ? 'Select the species of the ducks' : ''}
                    label='What species were they?'/>

                <TextField name='description' value={this.state.formStateCount}
                    onChange={this.handleChange}
                    error={(descriptionError !== null)}
                    helperText={(descriptionError !== null) ? 'Invalid description': ''}
                    label='Tell more about it'/>

                <Button type='submit' onClick={this.handleSubmit}
                    raised color='primary'>Send</Button>
                <Button onClick={this.props.onClose}
                    raised>Nevermind</Button>
            </Paper>
        )
    }
}

NewSightingForm.propTypes = {
    classes: PropTypes.object.isRequired,
    supportedSpecies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })),
    onSightingSubmit: PropTypes.func,
    onClose: PropTypes.func,
}

export default withStyles(styles)(NewSightingForm)
