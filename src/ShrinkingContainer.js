import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography/Typography';

const styles = theme => ({
    ShrinkingContainer: {
        position:'relative',
        width: '100%',
        overflow: 'auto',
        boxSizing: 'border-box',
        [theme.breakpoints.up('sm')]: {
            width: 'calc(100% - 80px)',
            maxWidth: '700px',
        }
    }
})

class ShrinkingContainer extends Component {

    render() {
        return (
            <div className={this.props.classes.ShrinkingContainer}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(ShrinkingContainer);
