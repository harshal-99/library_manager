import {Router} from "express";

import Magazine from "../models/magazine.js";

const magazineRouter = Router()

magazineRouter.get('/', async (request, response, next) => {
	const magazines = await Magazine
		.find({})


	response.json(magazines.map(mag => mag.toJSON()))
})

magazineRouter.post('/', async (request, response, next) => {
	const {title, isbn, authors, publishedAt} = request.body

	const magazine = new Magazine({
		title,
		isbn,
		authors,
		publishedAt
	})

	const savedMagazine = await magazine.save()

	response.status(201).json(savedMagazine)
})

magazineRouter.get('/:id', async (request, response, next) => {
	const id = request.params.id

	const magazine = await Magazine.find({isbn: id})

	if (magazine.length !== 0) {
		response.json(magazine)
		return
	}

	response.status(401).json({error: "magazine not found"})
})


export default magazineRouter
