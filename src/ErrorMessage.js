import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  ErrorMessage: {
    backgroundColor:theme.palette.error[300],
    padding:'20px' 
  }
})

class ErrorMessage extends Component {
  render() {
    return (
      <Paper className={this.props.classes.ErrorMessage + ' ' + this.props.className}>
          <strong>Error!</strong> {this.props.message}
      </Paper>
    );
  }
}

export default withStyles(styles)(ErrorMessage);
