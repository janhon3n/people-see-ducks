import React, {Component} from 'react'
import urljoin from 'url-join'
import moment from 'moment'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import {CircularProgress} from 'material-ui/Progress'

import SightingListItem from './SightingListItem'
import ErrorMessage from './ErrorMessage'

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


  async fetchSightingsFromTheApi() {
    let response
    // fetch species from the API and add them to the state
    try {
      response = await fetch(urljoin(window.apiUrl, window.sightingsPath))
      if (!response.ok) throw Error('Error fetching content from the API.')
      response = await response.json()
    } catch (error) {
      error.extraMessage = 'Could not fetch the sightings from the API.'
      console.log(error)
      return this.setState({apiFetchError: error})
    }
    this.setState({sightings: response, apiFetchError: null})
  }


  componentDidMount() {
    this.fetchIntervalId = window.setInterval(() => {
      this.fetchSightingsFromTheApi()
    }, 5000)
    this.fetchSightingsFromTheApi()
  }
  componentWillUnmount() {
    window.clearInterval(this.fetchIntervalId)
  }

  render() {
    if (this.state.apiFetchError !== null) {
      return (<ErrorMessage error={this.state.apiFetchError} />)
    } else if (this.state.sightings === null) {
      return (<CircularProgress style={{padding: '5px'}} size={60} />)
    }

    let sightings = this.state.sightings.slice()
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
    sightings = sightings.sort(sortingFunction)

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
