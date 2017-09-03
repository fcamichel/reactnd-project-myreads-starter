import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import SearchButton from './SearchButton'
import './App.css'

class BooksApp extends Component {
    state = {
        books: [],
        matchedBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        })
    }

    handleShelfChange = (book, newShelf, isSearch) => {
        BooksAPI.update(book, newShelf).then((response) => {
            this.setState((previousState) => {
                // TODO: remove books which shelf is set to none 
                if(previousState.books.filter((existingBooks) => existingBooks.id === book.id).length === 0) {
                    previousState.books.push(book)
                }
                return {
                    books: previousState.books.map((newBook) => {
                        if (newBook.id === book.id) {
                            newBook.shelf = newShelf
                        }
                        return newBook
                    }),
                    matchedBooks: this.state.matchedBooks.map((newBook) => {
                        if (isSearch) {
                            if (newBook.id === book.id) {
                                newBook.shelf = newShelf
                            }
                            return newBook
                        }
                        return null
                    })
                }
            });
        })
        .catch((error) => (
            console.warn(error)
        ))
        console.log(this.state.books);
    }

    matching = (books) => {
        this.setState({matchedBooks: books});
    }

    resetSearch = () => {
        this.setState({matchedBooks: []});
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <Search
                        isSearch={true}
                        handle={this.handleShelfChange}
                        shelfBooks={this.state.books}
                        matchedBooks={this.state.matchedBooks}
                        matching={this.matching}
                    />
                )}/>
                <Route exact path="/" render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf
                                title="Currently Reading"
                                books={this.state.books.filter((book) =>
                                    book.shelf === 'currentlyReading')}
                                handle={this.handleShelfChange}/>
                            <BookShelf
                                title="Want to Read"
                                books={this.state.books.filter((book) =>
                                    book.shelf === 'wantToRead')}
                                handle={this.handleShelfChange}/>
                            <BookShelf
                                title="Read"
                                books={this.state.books.filter((book) =>
                                    book.shelf === 'read')}
                                handle={this.handleShelfChange}/>
                        </div>
                    </div>
                    <SearchButton resetSearch={this.resetSearch}/>
                </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
