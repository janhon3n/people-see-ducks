import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography/Typography'

const styles = (theme) => ({
  ErrorMessage: {
    backgroundColor: theme.palette.error[300],
    padding: '20px',
  },
})

function ErrorMessage() {
  return (
    <Paper className={this.props.classes.ErrorMessage}>
      <strong>Error!</strong> {this.props.error.message}
      {(this.props.error.extraMessage !== undefined &&
        <Typography type='caption'>{this.props.error.extraMessage}</Typography>
      )}
    </Paper>
  )
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorMessage)
