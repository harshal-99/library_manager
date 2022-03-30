import {Router} from "express";
import converter from "json-2-csv"

import Author from "../models/author.js";
import Book from "../models/book.js";
import Magazine from "../models/magazine.js";


const exportRouter = Router()

exportRouter.get('/author', async (request, response, next) => {
	let authors = await Author.find({})
	authors = authors.map(a => a.toJSON())

	for (const author of authors) {
		delete author.id
	}
	const csv = await converter.json2csvAsync(authors, {delimiter: {field: ';', wrap: ''}})
	return response.json(csv)
})


exportRouter.get('/magazine', async (request, response, next) => {
	let magazines = await Magazine.find({})
	magazines = magazines.map(mag => mag.toJSON())

	for (let i = 0; i < magazines.length; i++) {
		delete magazines[i].id
		magazines[i].authors = magazines[i].authors.join(',')
	}

	const csv = await converter.json2csvAsync(magazines, {delimiter: {field: ';', wrap: ''}})

	return response.json(csv)
})

exportRouter.get('/book', async(request, response, next) => {
	let books = await Book.find({})
	books = books.map(book => book.toJSON())

	for (let i = 0;i < books.length; i++) {
		books[i].authors = books[i].authors.join(',')
		delete books[i].id
	}

	const csv = await converter.json2csvAsync(books, {delimiter: {field: ';', wrap: ''}})
	return response.json(csv)
})

export default exportRouter
