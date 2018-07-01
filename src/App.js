import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './components/Search'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI' 

class BooksApp extends React.Component {
  state = {
    allBooks : [],
    shelves : [{
                title: 'Currently Reading', 
                books: [1, 2]
              }, {
                title: 'Want to Read',
                books: [1, 2, 3]
              }, {
                title: 'Read',
                books: [1, 2, 3, 4, 5] 
              } ], 
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => (
      this.setState({allBooks: books})
      ))
  }

  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={({history}) => (
            <Search/>
          )}
        />

        <Route
          exact path='/'
          render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map(shelf => {
                  return(
                  <BookShelf key={shelf} books={shelf.books} title={shelf.title}/>
                    )
                })}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
            )}
        />

      </div>
    )
  }
}

export default BooksApp
