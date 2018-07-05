import React, { Component } from 'react'
import Book from './Book'
import camelCase from 'camelcase'

class BookShelf extends Component{

	render(){
		const moveBook = this.props.moveBook;
		return(
			
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.allBooks
							.filter(book => this.props.books.includes(book.id))
							.map((book) => {
							return(
								<li key={book.id}>
									<Book 
									book={book} 
									bookShelf={camelCase(this.props.title)} 
									moveBook={moveBook}/>
								</li>		
								)
						})}
					</ol>
				</div>
			</div>

			)
	}
}


export default BookShelf 