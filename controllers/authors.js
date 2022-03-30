import {Router} from "express";

import Author from "../models/author.js";

const authorRouter = Router()

authorRouter.get('/', async (request, response, next) => {
	const authors = await Author
		.find({})

	response.json(authors.map(a => a.toJSON()))
})


authorRouter.post('/', async (request, response, next) => {
	const {firstName, lastName, email} = request.body

	const author = new Author({
		firstName,
		lastName,
		email
	})

	const savedAuthor = await author.save()

	response.status(201).json(savedAuthor)
})


export default authorRouter
