import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

import SightingListItem from './SightingListItem'
import CircularProgress from 'material-ui/Progress/CircularProgress'

const styles = (theme) => ({
  SightingList: {
    width: '100vw',
    maxWidth: '700px',
    margin: '5px',
  },
})

function SightingList(props) {
  if (props.loading) {
    return <CircularProgress size={60} style={{padding: '15px'}}/>
  }
  return (
    <div className={props.classes.SightingList}>
      {
        props.sightings.map((sighting) => {
          return (<SightingListItem key={sighting.id} sighting={sighting} />)
        })
      }
    </div>
  )
}

SightingList.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  sightings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    species: PropTypes.string,
    description: PropTypes.string,
    dateTime: PropTypes.string,
    count: PropTypes.number,
  })),
}

export default withStyles(styles)(SightingList)
