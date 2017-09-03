import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StarRating extends Component {
    static propTypes = {
        stars: PropTypes.number
    };

    render() {
        return (
            <span className={"rating s" + (this.props.stars*2)}></span>
        )
    }
}

export default StarRating;
