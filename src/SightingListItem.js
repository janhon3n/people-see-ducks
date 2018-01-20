import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import moment from 'moment'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography/Typography';

const styles = theme => ({
    container: {
        overflow:'hidden',
        '&:last-child': {
            marginBottom:'0px'
        },
        '&:first-child': {
            marginTop:'0px'
        },
        margin:'15px'
    },
    header: {
        backgroundColor:theme.palette.primary[50],
        borderBottom: '1px solid #999',
        display:'flex',
        justifyContent:'space-between',
        padding:'10px'
    },
    main: {
        padding:'10px'
    },
    ducks: {
        marginTop:'10px',
    },
    duck: {
        opacity:'0.7'
    }
})

class SightingListItem extends Component {

  render() {
    let count = this.props.sighting.count
    let species = this.props.sighting.species
    let description = this.props.sighting.description
    let date = moment(this.props.sighting.dateTime)

    return (
        <Paper elevation={5} className={this.props.classes.container} key={this.props.sighting.id}>
            <div className={this.props.classes.header}>
                <Typography type='title'>{'Someone saw ' + count + ' ' + species.capitalize() + (count > 1 ? 's': '')}</Typography>
                <Typography type='body1'>{date.format("DD.MM.YYYY HH:mm")}</Typography>
            </div>
            <div className={this.props.classes.main}>
                <Typography type='body1'>
                        {description}
                </Typography>
                <div className={this.props.classes.ducks}>
                {
                    [...Array(count)].map(() => {
                        return <img className={this.props.classes.duck} src='rubber-clipart-yToeq8G8c.svg' width='24'/>
                    })
                }
                </div>
            </div>
        </Paper>
    );
  }
}

export default withStyles(styles)(SightingListItem);
