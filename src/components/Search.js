import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
	state = {
				query : ''
			}
	
	updateQuery = (inputedQuery) => {
		this.setState({ query : inputedQuery.trim() })
	}

	clearQuery = () => this.setState({query : ''})

	render() {
		let showingBooks;
		const {query} = this.state;

		if (query) {
			this.props.books.search(query)
			.then(foundBooks => {

				console.log(foundBooks)
				showingBooks = foundBooks} )
		} else {
			showingBooks = this.props.books
		}

		return(
			<div className="search-books">
              <div className="search-books-bar">
                <Link 
                	to='/' 
                	className="close-search">Close</Link>
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
	                  value = {query} 
										onChange = {(event) => this.updateQuery(event.target.value)}
										/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                	{showingBooks.map(book => {
                		
                		return (
											<li key={book.id}>
                        <Book book={book}/>
                      </li>		
             				)

                	})}
                </ol>
              </div>
            </div>
			)
	}
}

export default Search