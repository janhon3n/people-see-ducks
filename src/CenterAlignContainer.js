import React from 'react'
import { withStyles } from 'material-ui/styles';

let styles = theme => ({
    CenterAlignContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
    }
})

function CenterAlignContainer(props){
    return (
        <div className={props.classes.CenterAlignContainer}>
            {props.children}
        </div>
        )
}

export default withStyles(styles)(CenterAlignContainer)