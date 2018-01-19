import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid'

const styles = theme => ({
    ScrollContainer: {
        overflow: 'auto'
    }
})

class ScrollContainer extends Component {

    render() {
        return (
            <div className={this.props.classes.ScrollContainer}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(ScrollContainer);
