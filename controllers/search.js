import {Router} from "express";

import Book from "../models/book.js";
import Magazine from "../models/magazine.js";

const searchRouter = Router()

searchRouter.get('/', async (request, response, next) => {
	const query = request.query

	if (query.isbn !== undefined) {
		const isbn = query.isbn

		const magazine = await Magazine.find({isbn: isbn})

		if (magazine.length !== 0) {
			response.json(magazine)
			return
		}

		const book = await Book.find({isbn: isbn})

		if (book.length !== 0) {
			response.json(book)
			return
		}

		response.status(401).json({error: "book / magazine not found"})
		return
	} else if (query.authorEmail !== undefined) {
		const authorEmail = query.authorEmail

		const magazines = await Magazine.find({})
		const books = await Book.find({})
		let authors = []

		for (const book of books) {
			if (book.authors.includes(authorEmail)) {
				authors.push(book)
			}
		}

		for (const magazine of magazines) {
			if (magazine.authors.includes(authorEmail)) {
				authors.push(magazine)
			}
		}

		if (authors.length === 0) {
			response.status(401).json({error: `no book / magazine by this author ${authorEmail}`})
			return
		}

		return response.json(authors.map(author => author.toJSON()))
	} else if(query.sort !== undefined) {
		const toSort = query.sort
		const all = []

		const magazines = await Magazine.find({})
		const books = await Book.find({})

		for (const magazine of magazines) {
			all.push(magazine)
		}

		for (const book of books) {
			all.push(book)
		}

		all.sort((a, b) => {
			let s1 = a.title.toLowerCase()
			let s2 = b.title.toLowerCase()

			if(s1 < s2) return -1
			else if( s2 > s1) return 1
			else return 0
		})

		return response.json(all.map(a => a.toJSON()))
	}

	response.status(401).json({error: "invalid search query"})
})

export default searchRouter
