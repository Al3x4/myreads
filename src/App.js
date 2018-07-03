import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import Search from './components/Search'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI' 

class BooksApp extends React.Component {
  state = {
    allBooks : [],
    shelves : [{
                title: 'Currently Reading', 
                books: []
              }, {
                title: 'Want to Read',
                books: []
              }, {
                title: 'Read',
                books: [] 
              } ], 
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => (
      this.setState({allBooks: books})
      ))
  }

  render() {
    console.log(this.state.allBooks)
    return (
      <div className="app">
        <Route
          path='/search'
          render={({history}) => (
            <Search books={this.state.allBooks}/>
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
                  <BookShelf key={shelf.title} books={shelf.books} title={shelf.title}/>
                    )
                })}
              </div>
            </div>
            <div className="open-search">
              <Link 
              to = '/search'>Add a book</Link>
            </div>
          </div>
            )}
        />

      </div>
    )
  }
}

export default BooksApp
