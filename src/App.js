import React, { Component } from 'react';
import urljoin from 'url-join'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import SightingList from './SightingList'
import ShrinkingContainer from './ShrinkingContainer'
import NewSightingForm from './NewSightingForm';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  App: {
    backgroundColor: theme.palette.primary[100],
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  noShrink: {
    flexShrink: 0
  },
  leaveSpace: {
    margin: '15px'
  },
  leaveSpaceAfter: {
    marginBottom: '66px'
  }
});

class App extends Component {

  constructor(props) {
    super(props)
    this.toggleNewSightingFormVisibility = this.toggleNewSightingFormVisibility.bind(this)
    this.state = {
      showNewSightingForm: false,
      sightings: null,
      species: null,
      sightingFetchError: null,
      speciesFetchError: null
    }
  }

  toggleNewSightingFormVisibility(newVisibility) {
    this.setState({ showNewSightingForm: newVisibility })
  }

  async fetchSightingsFromTheApi() {
    try {
      var response = await fetch(urljoin(window.apiUrl, window.sightingsPath))
      if(!response.ok)
        throw Error('Failed to fetch content from the api')

      response = await response.json()
    } catch(error) {
        return this.setState({ sightingFetchError: error })
    }
    this.setState({ sightings: response, sightingFetchError: null })
  }

  async fetchSpeciesFromTheApi() {
    try {
      var response = await fetch(urljoin(window.apiUrl, window.speciesPath))
      if (!response.ok) {
        throw Error('Failed to fetch content from the api')
      }
      response = await response.json()
    } catch (error) {
      return this.setState({ speciesFetchError: error })
    }
    this.setState({ supportedSpecies: response, speciesFetchError: null })
  }


  render() {
    let classes = this.props.classes

    var mainContent
    if(this.state.showNewSightingForm){
      if(this.state.speciesFetchError){
        mainContent = <ErrorMessage message={this.state.speciesFetchError.message} />
      } else {
        mainContent = <NewSightingForm
      }
    }

    return (
      <div className={classes.App}>
        <Typography type='display3' className={classes.leaveSpace + ' ' + classes.noShrink}>People see ducks!</Typography>
        {(this.state.showNewSightingForm ?
          <ShrinkingContainer>
            <NewSightingForm species={this.state.species} className={classes.leaveSpaceAfter + ' ' + classes.relativeWidth} onClose={(e) => {
              this.toggleNewSightingFormVisibility(false)
            }} />
          </ShrinkingContainer>
          :
          <React.Fragment>
            <ShrinkingContainer>
              <SightingList sightings={this.state.sightings} className={classes.relativeWidth} />
            </ShrinkingContainer>,
            <Button raised color='primary' className={classes.leaveSpace + ' ' + classes.noShrink} onClick={(e) => {
              this.toggleNewSightingFormVisibility(true)
            }}>I saw ducks!</Button>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(App);
