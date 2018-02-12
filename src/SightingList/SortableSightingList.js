import React, {Component} from 'react'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import moment from 'moment'

import SightingList from './SightingList'
import ShrinkingGridItem from 'Layout/ShrinkingGridItem'
import FullScreenWidthContainer from 'Layout/FullScreenWidthContainer'

class SortableSightingList extends Component {
    constructor(props) {
        super(props)
        this.setSorting = this.setSorting.bind(this)
        this.sortSightings = this.sortSightings.bind(this)

        this.state = {
            sorting: 'ascending',
        }
    }

    setSorting(sorting) {
        if (sorting !== 'ascending' && sorting !== 'descending') throw Error('Invalid new sorting order')
        this.setState({sorting: sorting})
    }

    sortSightings(sightings) {
        let sortingFunction
        if (this.state.sorting === 'ascending') {
            sortingFunction = (s1, s2) => {
                return (moment(s1.dateTime).isBefore(moment(s2.dateTime)) ? 1 : -1)
            }
        } else {
            sortingFunction = (s1, s2) => {
                return (moment(s1.dateTime).isAfter(moment(s2.dateTime)) ? 1 : -1)
            }
        }
        return sightings.sort(sortingFunction)
    }


    render() {
        let sortedSightings
        if (!this.props.loading) {
            sortedSightings = this.sortSightings(this.props.sightings.slice())
        }
        return (
            <Grid container justify='flex-start' alignItems='center' direction='column' wrap='nowrap' spacing={0}>
                <Grid item>
                    <Button raised
                        color={(this.state.sorting === 'ascending' ? 'primary' : 'default')}
                        onClick={(e) => this.setSorting('ascending')}>
                        Newest first
                    </Button>
                    <Button raised
                        color={(this.state.sorting === 'descending' ? 'primary' : 'default')}
                        onClick={(e) => this.setSorting('descending')}>
                        Oldest first
                    </Button>
                </Grid>
                <FullScreenWidthContainer>
                    <ShrinkingGridItem overflow='auto'>
                        <SightingList
                            loading={this.props.loading}
                            sightings={(this.props.loading ? undefined : sortedSightings)} />
                    </ShrinkingGridItem>
                </FullScreenWidthContainer>
            </Grid>
        )
    }
}


SortableSightingList.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    sightings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        species: PropTypes.string,
        description: PropTypes.string,
        dateTime: PropTypes.string,
        count: PropTypes.number,
    })),
}

export default SortableSightingList
