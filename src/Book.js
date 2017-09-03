import React, {Component} from 'react'
import StarRating from './StarRating'
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        image: PropTypes.string.isRequired
    };

    render() {
        let noneOption = null;

        if (!this.props.isSearch) {
            noneOption = <option value="none">Remove</option>;
        }

        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${this.props.image})`
                }}/>
                <div className="book-shelf-changer">
                    <select
                        value={ this.props.book.shelf || 'none' }
                        onChange={
                            (event) => this.props.handle(this.props.book, event.target.value, this.props.isSearch)
                        }
                    >
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {noneOption}
                    </select>
                </div>
            </div>
            <div className="book-rating"><StarRating stars={this.props.stars}/></div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors.join(', ')}</div>
        </div>
    }
}

export default Book;
