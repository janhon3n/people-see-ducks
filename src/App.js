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
  App: {
    backgroundColor: theme.palette.primary[50],
    overflow: 'hidden',
    height: '100%',
  },
  title: {
    color: 'black',
    textShadow: '0 0 2px '+theme.palette.primary[300],
  },
  leaveMargins: {
    margin: '20px',
  },
})

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleNewSightingFormVisibility = this.toggleNewSightingFormVisibility.bind(this)
    this.state = {
      showNewSightingForm: false,
    }
  }

  toggleNewSightingFormVisibility(newVisibility) {
    this.setState({showNewSightingForm: newVisibility})
  }

  render() {
    let classes = this.props.classes
    return (
      <Grid container justify='flex-start' alignItems='center' direction='column'
        wrap='nowrap' spacing={0} className={classes.App}>
        <Grid item>
          <Typography type='display2' className={classes.leaveMargins + ' ' + classes.title}>People see ducks!</Typography>
        </Grid>

        {(this.state.showNewSightingForm ?
          <ShrinkingGridItem overflow='auto'>
            <FullScreenWidthContainer>
              <NewSightingForm onClose={(e) => {
                this.toggleNewSightingFormVisibility(false)
              }} />
            </FullScreenWidthContainer>
          </ShrinkingGridItem>
          :
          <React.Fragment>
            <ShrinkingGridItem overflow='hidden'>
              <SortableSightingList />
            </ShrinkingGridItem>
            <Grid item className={classes.leaveMargins}>
              <Button raised color='primary' onClick={(e) => {
                this.toggleNewSightingFormVisibility(true)
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
