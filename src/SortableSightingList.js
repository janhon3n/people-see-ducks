import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import SightingList from './SightingList'
import ScrollContainer from './ScrollContainer'
import CenterAlignContainer from './CenterAlignContainer';

const styles = theme => ({
    SortableSightingList: {
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    button: {
        margin:'10px',
        marginBottom:'15px'
    },
    noShrink:{
        flexShrink:'0'
    }
})

class ErrorMessage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sorting: 'ascending'
        }
    }
    
    setSorting(sorting){
        if(sorting !== 'ascending' && sorting !== 'descending') throw Error('Invalid new sorting order')
        this.setState({sorting: sorting})
    }

    render() {

        return (
            <div className={this.props.classes.SortableSightingList}>
                <CenterAlignContainer flexDirection='row' className={this.props.classes.noShrink}>
                    <Button className={this.props.classes.button} raised color={(this.state.sorting === 'ascending' ? 'primary' : 'default')} onClick={(e) => {
                        this.setSorting('ascending')
                    }}>Newest first</Button>
                    <Button className={this.props.classes.button} raised color={(this.state.sorting === 'descending' ? 'primary' : 'default')} onClick={(e) => {
                        this.setSorting('descending')
                    }}>Oldest first</Button>
                </CenterAlignContainer>
                <ScrollContainer>
                    <SightingList sorting={this.state.sorting}/>
                </ScrollContainer>
            </div>
        );
    }
}

export default withStyles(styles)(ErrorMessage);
