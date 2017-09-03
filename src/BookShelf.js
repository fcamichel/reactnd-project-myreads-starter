import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li key={book.canonicalVolumeLink}>
                        <Book
                            book={book}
                            stars={book.averageRating}
                            title={book.title}
                            authors={book.authors}
                            image={book.imageLinks.smallThumbnail}
                            handle={this.props.handle}
                            isSearch={this.props.isSearch}/>
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;
