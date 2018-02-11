import React, {Component} from 'react'
import urljoin from 'url-join'
import {CircularProgress} from 'material-ui/Progress'

import FullScreenWidthContainer from 'Layout/FullScreenWidthContainer'
import SortableSightingList from './SortableSightingList'
import ErrorMessage from 'ErrorMessage'


class SortableSightingListContainer extends Component {
  constructor(props) {
    super(props)
    this.fetchIntervalId = null
    this.state = {
      sightings: null,
      apiFetchError: null,
    }
  }

  async componentDidMount() {
    this.fetchSightingsFromTheApi()
    this.fetchIntervalId = window.setInterval(() => {
      this.fetchSightingsFromTheApi()
    }, process.env.REACT_APP_SIGHTING_LIST_UPDATE_INTERVAL)
  }
  componentWillUnmount() {
    window.clearInterval(this.fetchIntervalId)
  }

  async fetchSightingsFromTheApi() {
    let response
    // fetch species from the API and add them to the state
    try {
      response = await fetch(urljoin(process.env.REACT_APP_API_URL, process.env.REACT_APP_SIGHTINGS_PATH))
      if (!response.ok) throw Error('Error fetching content from the API.')
      response = await response.json()
    } catch (error) {
      let fetchError = new Error('Could not load sightings')
      fetchError.details = error.message
      return this.setState({apiFetchError: fetchError})
    }
    this.setState({sightings: response, apiFetchError: null})
  }

  render() {
    if (this.state.apiFetchError !== null) {
      return (<ErrorMessage error={this.state.apiFetchError} />)
    }

    return (
      <SortableSightingList
        loading={(this.state.sightings===null)}
        sightings={this.state.sightings} />
    )
  }
}

export default SortableSightingListContainer
