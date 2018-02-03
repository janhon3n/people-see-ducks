import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import SortableSightingList from './SortableSightingList'
import NewSightingForm from './NewSightingForm'
import ShrinkingGridItem from './ShrinkingGridItem'
import FullScreenWidthContainer from './FullScreenWidthContainer'

const styles = (theme) => ({
  'App': {
    'backgroundColor': theme.palette.primary[50],
    'overflow': 'hidden',
    'height': '100%',
  },
  'title': {
    margin: '15px',
    color: 'black',
    textShadow: '0 0 2px ' + theme.palette.primary[300],
    [theme.breakpoints.down('xs')]: {
      fontSize: '30px',
      margin: '10px',
    },
  },
  'margins': {
    margin: '5px',
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.setNewSightingFormVisibility = this.setNewSightingFormVisibility.bind(this)
    this.state = {
      showNewSightingForm: false,
    }
  }

  setNewSightingFormVisibility(newVisibility) {
    this.setState({showNewSightingForm: newVisibility})
  }

  render() {
    let classes = this.props.classes
    return (
      <Grid container justify='flex-start' alignItems='center' direction='column'
        wrap='nowrap' spacing={0} className={classes.App}>
        <Grid item>
          <Typography type='display2' className={classes.title}>
            People see ducks!
          </Typography>
        </Grid>

        {(this.state.showNewSightingForm ?
          <ShrinkingGridItem overflow='hidden'>
            <FullScreenWidthContainer>
              <ShrinkingGridItem overflow='auto'>
                <NewSightingForm onClose={(e) => {
                  this.setNewSightingFormVisibility(false)
                }} />
              </ShrinkingGridItem>
            </FullScreenWidthContainer>
          </ShrinkingGridItem>
          :
          <React.Fragment>
            <ShrinkingGridItem overflow='hidden'>
              <SortableSightingList />
            </ShrinkingGridItem>
            <Grid item className={classes.margins}>
              <Button raised color='primary' onClick={(e) => {
                this.setNewSightingFormVisibility(true)
              }}>I saw ducks!</Button>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
