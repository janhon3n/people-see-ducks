import React, { Component } from 'react';
import urljoin from 'url-join'
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';

import SightingListItem from './SightingListItem'
import ErrorMessage from './ErrorMessage'

const styles = theme => ({
  SightingList: {
    padding:'5px',
  }
})

class SightingList extends Component {

  constructor(props) {
    super(props)
    this.fetchIntervalId = null
  }


  render() {
    if (this.apiFetchError !== null) {
      return (
        <ErrorMessage message={this.state.apiFetchError.message} />
      )
    } else if (this.state.sightings === null) {
      return (
        <CircularProgress className='centerAlignItem'/>
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
