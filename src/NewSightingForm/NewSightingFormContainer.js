import React, {Component} from 'react'
import urljoin from 'url-join'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'

import ErrorMessage from 'ErrorMessage'
import NewSightingForm from './NewSightingForm'


class NewSightingFormContainer extends Component {
    constructor(props) {
        super(props)
        this.fetchSpeciesFromTheApi = this.fetchSpeciesFromTheApi.bind(this)
        this.handleNewSightingSubmit = this.handleNewSightingSubmit.bind(this)

        this.state = {
            supportedSpecies: [],
            apiFetchError: null,
        }
    }

    async componentDidMount() {
        await this.fetchSpeciesFromTheApi()
    }

    async handleNewSightingSubmit(newSighting) {
        try {
            await this.sendNewSightingToApi(newSighting)
        } catch (error) {
            return this.setState({apiFetchError: error})
        }
        this.props.onClose()
    }

    async fetchSpeciesFromTheApi() {
        // fetch species from the API and add them to the state
        let response
        try {
            response = await fetch(urljoin(process.env.REACT_APP_API_URL, process.env.REACT_APP_SPECIES_PATH))
            if (!response.ok) throw Error('Error fetching content from the API')
            response = await response.json()
        } catch (error) {
            let fetchError = new Error('Could not load the supported species')
            fetchError.details = error.message
            return this.setState({apiFetchError: fetchError})
        }
        this.setState({supportedSpecies: response, apiFetchError: null})
    }

    async sendNewSightingToApi(sightingData) {
        let response = await fetch(urljoin(process.env.REACT_APP_API_URL, process.env.REACT_APP_SIGHTINGS_PATH), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sightingData),
        })
        if (!response.ok) throw new Error('Could not post the new sightings')
    }

    render() {
        if (this.state.apiFetchError !== null) {
            return (
               <React.Fragment>
                  <ErrorMessage error={this.state.apiFetchError} />
                  <Button raised color='primary'
                     onClick={this.props.onClose}>Return</Button>
               </React.Fragment>
            )
        }

        return (
           <NewSightingForm
            supportedSpecies={this.state.supportedSpecies}
            onSightingSubmit={this.handleNewSightingSubmit}
            onClose={this.props.onClose} />
        )
    }
}

NewSightingFormContainer.propTypes = {
   onClose: PropTypes.func,
}

export default NewSightingFormContainer
