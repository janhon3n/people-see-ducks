import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography/Typography';

const border = '1px solid #bbb'
const styles = theme => ({
    container: {
        border:border,
        padding:'20px',
        '&:last-child': {
            marginBottom:'0px'
        },
        '&:first-child': {
            marginTop:'0px'
        },
        margin:'15px'
    },
    header: {
        paddingBottom: '10px',
        display:'flex',
        justifyContent:'space-between',
    },
    description: {
    }
})

class SightingListItem extends Component {

  render() {
    let count = this.props.sighting.count
    let species = this.props.sighting.species
    let description = this.props.sighting.description
    let date = new Date(this.props.sighting.dateTime)

    return (
        <Paper elevation={5} className={this.props.classes.container} key={this.props.sighting.id}>
            <div className={this.props.classes.header}>
                <Typography type='body2'>{'Someone saw ' + count + ' ' + species.capitalize() + (count > 1 ? 's': '')}</Typography>
                <Typography type='body1'>{date.toDateString()}</Typography>
            </div>
            <Typography type='body1' className={this.props.classes.description}>
                {description}
            </Typography>
        </Paper>
    );
  }
}

export default withStyles(styles)(SightingListItem);
