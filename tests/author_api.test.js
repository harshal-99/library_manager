import mongoose from "mongoose";
import supertest from "supertest"

import app from "../app.js";
import Author from "../models/author.js";
import {authorsInDB, initialAuthors} from "./test_helper.js";


const api = supertest(app)

beforeEach(async () => {
	await Author.deleteMany({})

	for (const initialAuthor of initialAuthors) {
		await api
			.post('/api/author')
			.send(initialAuthor)
	}
})

describe("only valid authors are added", () => {
	test("firstName lastName email is required", async () => {
		const author = {
			firstName: '',
			lastName: '',
			email: ''
		}

		await api
			.post('/api/author')
			.send(author)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})

	test("firstName, lastName and email should be at least 3 char long", async () => {
		const author1 = {
			firstName: 'ha',
			lastName: 'pa',
			email: 'a@'
		}

		await api
			.post('/api/author')
			.send(author1)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const author2 = {
			firstName: 'harh',
			lastName: 'pawsh',
			email: 'a@a.com'
		}

		await api
			.post('/api/author')
			.send(author2)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})
})

describe("when a author is created", () => {
	test("it is saved to database", async () => {
		const newAuthor = {
			firstName: "Laxman",
			lastName: "Ram",
			email: "ram@laxman.com"
		}

		await api
			.post('/api/author')
			.send(newAuthor)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const authors = await authorsInDB()
		const emails = authors.map(a => a.email)
		expect(emails).toContain(
			'ram@laxman.com'
		)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})
