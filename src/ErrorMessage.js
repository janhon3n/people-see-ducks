import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography/Typography'

const styles = (theme) => ({
  ErrorMessage: {
    backgroundColor: theme.palette.error[200],
    padding: '20px',
  },
})

function ErrorMessage(props) {
  return (
    <Paper className={props.classes.ErrorMessage}>
      <Typography type='headline'>Error! </Typography>
      <Typography type='body1'>
        {props.error.message}
      </Typography>
      {(process.env.NODE_ENV !== 'production' && props.error.details) &&
        <Typography type='caption'>{props.error.details}</Typography>
      }
    </Paper>
  )
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorMessage)
