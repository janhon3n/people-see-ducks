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
    padding:'5px'
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


  fetchSightingsFromTheApi() {
    //fetch sightings from the API and add them to the state
    fetch(urljoin(window.apiUrl, window.sightingsPath))
      .then((response) => {
        if (!response.ok) {
          throw Error()
        }
        return response.json()
      })
      .then((responseInJson) => {
        this.setState({ sightings: responseInJson, apiFetchError: null })
      }).catch((error) => {
        this.setState({ apiFetchError: new Error('Failed to fetch content from the api') })
      })
  }


  componentDidMount() {
    this.fetchIntervalId = window.setInterval(() => {
      this.fetchSightingsFromTheApi()
    }, 5000)
    this.fetchSightingsFromTheApi()
  }


  render() {
    if (this.state.apiFetchError !== null) {
      return (
        <ErrorMessage message={this.state.apiFetchError.message} />
      )
    } else if (this.state.sightings === null) {
      return (
        <CenterAlignContainer>
          <CircularProgress/>
        </CenterAlignContainer>
      )
    }

    return (
      <div className={this.props.classes.SightingList + ' ' + this.props.className}>
        {
          this.state.sightings.map((sighting) => {
            return (<SightingListItem sighting={sighting} />)
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(SightingList);
