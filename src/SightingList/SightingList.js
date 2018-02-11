import React, {Component} from 'react'
import urljoin from 'url-join'
import moment from 'moment'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import {CircularProgress} from 'material-ui/Progress'

import SightingListItem from './SightingListItem'
import ErrorMessage from 'ErrorMessage'

const styles = (theme) => ({
  SightingList: {
    width: '100vw',
    maxWidth: '700px',
    margin: '5px',
  },
})

class SightingList extends Component {
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

  sortSightings(sightings) {
    let sortingFunction
    if (this.props.sorting === 'ascending') {
      sortingFunction = (s1, s2) => {
        return (moment(s1.dateTime).isBefore(moment(s2.dateTime)) ? 1 : -1)
      }
    } else {
      sortingFunction = (s1, s2) => {
        return (moment(s1.dateTime).isAfter(moment(s2.dateTime)) ? 1 : -1)
      }
    }
    return sightings.sort(sortingFunction)
  }

  render() {
    if (this.state.apiFetchError !== null) {
      return (<ErrorMessage error={this.state.apiFetchError} />)
    } else if (this.state.sightings === null) {
      return (<CircularProgress style={{padding: '10px'}} size={60} />)
    }

    let sightings = this.state.sightings.slice()
    sightings = this.sortSightings(sightings)

    return (
      <div className={this.props.classes.SightingList}>
        {
          sightings.map((sighting) => {
            return (<SightingListItem key={sighting.id} sighting={sighting} />)
          })
        }
      </div>
    )
  }
}

SightingList.propTypes = {
  classes: PropTypes.object.isRequired,
  sorting: PropTypes.string,
}

export default withStyles(styles)(SightingList)
