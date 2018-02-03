import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = (theme) => ({
    FullScreenWidthContainer: {
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.primary[100],
        padding: '15px',
        boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
    },
})

function FullScreenWidthContainer(props) {
    return (
        <div className={props.classes.FullScreenWidthContainer}>
            {props.children}
        </div>
    )
}

FullScreenWidthContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
}

export default withStyles(styles)(FullScreenWidthContainer)
