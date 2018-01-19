import React from 'react'
import { withStyles } from 'material-ui/styles';

let styles = theme => ({
    CenterAlignContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
})

function CenterAlignContainer(props){
    return (
        <div className={props.classes.CenterAlignContainer + ' ' + props.className} style={{flexDirection: props.flexDirection}}>
            {props.children}
        </div>
        )
}

export default withStyles(styles)(CenterAlignContainer)