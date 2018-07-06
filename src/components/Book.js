import React, { Component } from 'react'

class Book extends Component {
	
	moveBook = (e) => this.props.moveBook(this.props.book, e.target.value)

	render(){
		const {book} = this.props
		let thumb = "";
		if (book.imageLinks){
			thumb = book.imageLinks.smallThumbnail
		} else {
			thumb = ""
		}
		return(
			 <div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumb})` }}></div>
					<div className="book-shelf-changer">
						<select value={book.shelf} onChange={this.moveBook}>
							<option defaultValue="none" value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}

export default Book