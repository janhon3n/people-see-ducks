import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid'

const styles = theme => ({
    ReactiveContainer: {
        height:'100%',
        position:'relative',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        [theme.breakpoints.up('sm')]: {
            width: 'calc(100% - 80px)',
            maxWidth: '700px',
        }
    }
})

class ReactiveContainer extends Component {

    render() {
        return (
            <div className={this.props.classes.ReactiveContainer}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(ReactiveContainer);
