import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './components/Search'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI' 

class BooksApp extends React.Component {
  state = {
    books : [],
    shelves : ['Currently Reading', 'Want to Read', 'Read']
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => (
      this.setState({books})
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
                  <BookShelf key={shelf} books={this.state.books} title={shelf}/>
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
