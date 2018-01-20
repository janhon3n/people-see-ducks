import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid'

const styles = theme => ({
    ShrinkingGridItem: {
        flex:'0 1 auto',
        display:'flex',
        overflowX: 'visible'
    }
})

function ShrinkingGridItem(props){
    return(
        <Grid item className={props.classes.ShrinkingGridItem} style={{overflowY:props.overflow}}>
            {props.children}
        </Grid>
    )
}

ShrinkingGridItem.propTypes = {
    overflow: PropTypes.string
}

ShrinkingGridItem.defaultProps = {
    overflow: 'auto'
}

export default withStyles(styles)(ShrinkingGridItem)