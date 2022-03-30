import {Router} from "express";

import Book from "../models/book.js";

const bookRouter = Router()

bookRouter.get('/', async (request, response, next) => {
	const books = await Book
		.find({})

	response.json(books.map(book => book.toJSON()))
})

bookRouter.post('/', async (request, response, next) => {
	const {title, authors, isbn, description} = request.body

	const book = new Book({
		title,
		authors,
		isbn,
		description
	})

	const savedBook = await book.save()

	response.status(201).json(savedBook)
})

bookRouter.get('/:id', async (request, response, next) => {
	const id = request.params.id

	const book = await Book.find({isbn: id})
	console.log(book)
	if(book.length !== 0) {
		response.json(book)
		return
	}

	response.status(401).json({error: "book not found"})
})

export default bookRouter
