import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography/Typography';

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
          <strong>Error!</strong> {this.props.error.message}
          {(this.props.error.extraMessage !== undefined &&
            <Typography type='caption'>{this.props.error.extraMessage}</Typography>
          )}
      </Paper>
    );
  }
}

export default withStyles(styles)(ErrorMessage);
