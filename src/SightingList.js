import React, { Component } from 'react';
import urljoin from 'url-join'
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';

import CenterAlignContainer from './CenterAlignContainer'
import SightingListItem from './SightingListItem'
import ErrorMessage from './ErrorMessage'

const styles = theme => ({
  SightingList: {
  }
})

class SightingList extends Component {

  constructor(props) {
    super(props)
    this.fetchIntervalId = null

    this.state = {
      sightings: null,
      apiFetchError: null
    }
  }


  async fetchSightingsFromTheApi() {
    //fetch species from the API and add them to the state 
    try {
      var response = await fetch(urljoin(window.apiUrl, window.sightingsPath))
      if (!response.ok) throw Error('Error fetching content from the API.')
      response = await response.json()
    } catch (error) {
      error.extraMessage = 'Could not fetch the sightings from the API.'
      console.log(error)
      return this.setState({ apiFetchError: error })
    }
    this.setState({ sightings: response, apiFetchError: null })
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
      return (
        <ErrorMessage error={this.state.apiFetchError} />
      )
    } else if (this.state.sightings === null) {
      return (
        <CenterAlignContainer flexDirection='column'>
          <CircularProgress />
        </CenterAlignContainer>
      )
    }

    let sightings = this.state.sightings.slice()
    let sortingFunction
    if(this.props.sorting === 'ascending'){
      sortingFunction = (s1, s2) => {
        return new Date(s1.dateTime) < new Date(s2.dateTime)
      }
    } else {
      sortingFunction = (s1, s2) => {
        return new Date(s1.dateTime) > new Date(s2.dateTime)
      }
    }
    sightings.sort(sortingFunction)

    return (
      <div className={this.props.classes.SightingList + ' ' + this.props.className}>
        {
          sightings.map((sighting) => {
            return (<SightingListItem key={sighting.id} sighting={sighting} />)
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(SightingList);
