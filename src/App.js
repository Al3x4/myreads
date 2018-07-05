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
                books: ["nggnmAEACAAJ", "sJf1vQAACAAJ", "OECC3GyCXe8C"]
              }, {
                title: 'Want to Read',
                books: ["evuwdDLfAyYC", "74XNzF_al3MC", "oBK6mi7xBlIC"]
              }, {
                title: 'Read',
                books: ["jAUODAAAQBAJ", "IOejDAAAQBAJ"] 
              } ], 
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => (
      this.setState({allBooks: books})
      ))
  }

  moveBook(book, shelf) {
    BooksAPI.update(book, shelf).then(res => {
      console.log(res)
      this.setState({
        shelves : [
          {
            books: res.currentlyReading
          },
          {
            books: res.wantToRead
          },
          {
            books: res.read
          }

        ] 
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          render={({history}) => (
            <Search moveBook={this.moveBook}/>
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
                  <BookShelf 
                  key={shelf.title} 
                  books={shelf.books} 
                  allBooks={this.state.allBooks}
                  title={shelf.title} 
                  moveBook={this.moveBook}/>
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
