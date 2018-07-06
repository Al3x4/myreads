import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import camelCase from 'camelcase'
import './App.css'
import Search from './components/Search'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './BooksAPI' 

class BooksApp extends React.Component {
	state = {
		allBooks : [],
		shelves : ['Currently Reading', 'Want to Read', 'Read' ],
	}

	getBooks = () => {
		BooksAPI.getAll().then(books => (
			this.setState({allBooks: books})
			))
	}

	componentDidMount() {
		this.getBooks()
	}

	componentDidUpdate() {
		this.getBooks()   
	}

	moveBook(book, shelf) {
		BooksAPI.update(book, shelf)
	}

	render() {
		return (
			<div className="app">
				<Route
				path='/search'
				render={({history}) => (
					<Search 
					moveBook={this.moveBook}
					allBooks={this.state.allBooks}
					/>
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
												key={camelCase(shelf)} 
												allBooks={this.state.allBooks}
												title={shelf} 
												moveBook={this.moveBook}/>
										)
									})}
								</div>
							</div>
							<div className="open-search">
								<Link 
									to = '/search'>
									Add a book
								</Link>
							</div>
						</div>
						)}
				/>
			</div>
		)
	}
}

export default BooksApp
