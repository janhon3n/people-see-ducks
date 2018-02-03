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
      <strong>Error! </strong>
      {(props.error.mainMessage !== undefined &&
        props.error.mainMessage
      )}
      {(process.env.NODE_ENV !== 'production' &&
        <Typography type='caption'>{props.error.message}</Typography>
      )}
    </Paper>
  )
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorMessage)
