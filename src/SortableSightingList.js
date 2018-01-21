import React, {Component} from 'react'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import SightingList from './SightingList'
import ShrinkingGridItem from './ShrinkingGridItem'
import FullScreenWidthContainer from './FullScreenWidthContainer'

const styles = (theme) => ({
    SortableSightingList: {
    },
    button: {
        margin: '10px',
        marginBottom: '15px',
    },
})

class SortableSightingList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sorting: 'ascending',
        }
    }

    setSorting(sorting) {
        if (sorting !== 'ascending' && sorting !== 'descending') throw Error('Invalid new sorting order')
        this.setState({sorting: sorting})
    }

    render() {
        return (
            <Grid container justify='start' alignItems='center' direction='column' wrap='nowrap' spacing={0}>
                <Grid item>
                    <Button className={this.props.classes.button} raised
                        color={(this.state.sorting === 'ascending' ? 'primary' : 'default')} onClick={(e) => {
                            this.setSorting('ascending')
                        }}>Newest first</Button>
                    <Button className={this.props.classes.button} raised
                        color={(this.state.sorting === 'descending' ? 'primary' : 'default')} onClick={(e) => {
                            this.setSorting('descending')
                        }}>Oldest first</Button>
                </Grid>
                <FullScreenWidthContainer>
                    <ShrinkingGridItem overflow='auto'>
                        <SightingList sorting={this.state.sorting} />
                    </ShrinkingGridItem>
                </FullScreenWidthContainer>
            </Grid>
        )
    }
}


SortableSightingList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SortableSightingList)
