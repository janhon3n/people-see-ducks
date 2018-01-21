import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = (theme) => ({
    FullScreenWidthContainer: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
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
    backgroundColor: PropTypes.string,
}

FullScreenWidthContainer.defaultProps = {
    backgroundColor: 'rgba(0,0,0,0)',
}

export default withStyles(styles)(FullScreenWidthContainer)
