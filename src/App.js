import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import SortableSightingList from './SortableSightingList'
import ReactiveContainer from './ReactiveContainer'
import ScrollContainer from './ScrollContainer'
import NewSightingForm from './NewSightingForm';

const styles = theme => ({
  App: {
    backgroundColor: theme.palette.primary[100],
    overflow:'hidden',
    width:'100vw',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  noShrink: {
    flexShrink:0
  },
  leaveSpace: {
    margin:'20px'
  }
});

class App extends Component {
  
  constructor(props){
    super(props)
    this.toggleNewSightingFormVisibility = this.toggleNewSightingFormVisibility.bind(this)
    this.state = {
      showNewSightingForm : false
    }
  }

  toggleNewSightingFormVisibility(newVisibility){
    this.setState({showNewSightingForm: newVisibility})
  }

  render() {
    let classes = this.props.classes
    return (      
      <div className={classes.App}>
        <Typography type='display3' className={classes.leaveSpace + ' ' + classes.noShrink}>People see ducks!</Typography>
        {(this.state.showNewSightingForm ?
          <ReactiveContainer>
            <ScrollContainer>
              <NewSightingForm onClose={(e) => {
                this.toggleNewSightingFormVisibility(false) 
              }}/>
            </ScrollContainer>
          </ReactiveContainer>
        :
          <React.Fragment>
            <ReactiveContainer>
              <SortableSightingList/>
            </ReactiveContainer>,
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
