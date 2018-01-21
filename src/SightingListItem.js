import React from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import moment from 'moment'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography/Typography'

const styles = (theme) => ({
    container: {
        'overflow': 'hidden',
        '&:last-child': {
            marginBottom: '0px',
        },
        '&:first-child': {
            marginTop: '0px',
        },
        'margin': '15px',
    },
    header: {
        backgroundColor: theme.palette.primary[50],
        borderBottom: '1px solid #999',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    },
    main: {
        padding: '10px',
    },
    ducks: {
        marginTop: '10px',
    },
    duck: {
        opacity: '0.7',
    },
})

function SightingListItem(props) {
    let count = props.sighting.count
    let species = props.sighting.species
    let description = props.sighting.description
    let date = moment(props.sighting.dateTime)

    return (
        <Paper elevation={5} className={props.classes.container} key={props.sighting.id}>
            <div className={props.classes.header}>
                <Typography type='title'>
                    {'Someone saw ' + count + ' ' + window.capitalizeString(species) + (count > 1 ? 's' : '')}
                </Typography>
                <Typography type='body1'>
                    {date.format('DD.MM.YYYY HH:mm')}
                </Typography>
            </div>
            <div className={props.classes.main}>
                <Typography type='body1'>
                    {description}
                </Typography>
                <div className={props.classes.ducks}>
                    {
                        [...Array(count)].map((item, index) => {
                            return <img className={props.classes.duck}
                                src='rubber-clipart-yToeq8G8c.svg' width='24' key={index} />
                        })
                    }
                </div>
            </div>
        </Paper>
    )
}

SightingListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    sighting: PropTypes.object,
}

export default withStyles(styles)(SightingListItem)
