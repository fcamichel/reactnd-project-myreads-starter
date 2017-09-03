import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()});
        if(this.state.query.length > 3) {
            BooksAPI.search(this.state.query, 20).then((response) => {
                response.map(response => {
                    this.props.shelfBooks.forEach(book => {
                        if (book.id === response.id) response.shelf = book.shelf;
                    })
                    return response;
                })
                this.props.matching(response);
            })
        }
    };

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={this.props.query}
                        onChange={(event) => (this.updateQuery(event.target.value))}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {this.props.matchedBooks.map((book) => (
                    <li key={book.id}>
                    <Book
                        book={book}
                        title={book.title}
                        authors={book.authors}
                        image={book.imageLinks.smallThumbnail}
                        stars={book.averageRating}
                        handle={this.props.handle}
                        isSearch={this.props.isSearch}/>
                    </li>
                ))}
                </ol>
            </div>
        </div>
    }
}

export default Search
