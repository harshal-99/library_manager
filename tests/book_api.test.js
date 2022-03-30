import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import Book from "../models/book.js";
import {booksInDb, initialBooks} from "./test_helper.js";

const api = supertest(app)

beforeEach(async () => {
	await Book.deleteMany({})

	for (const initialBook of initialBooks) {
		await api
			.post('/api/book')
			.send(initialBook)
	}
})

describe("only valid books are added", () => {
	test("title, authors and isbn are required", async () => {
		const book = {
			title: "A very interesting book",
			authors: ["me", "my friend"],
			isbn: 123123123
		}

		await api
			.post('/api/book')
			.send(book)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const incompleteBook = {
			title: '',
			authors: [],
			isbn: null
		}

		await api
			.post('/api/book')
			.send(incompleteBook)
			.expect(400)
			.expect('Content-Type', /application\/json/)

	})
})

describe("when a book is created", () => {
	test("it is saved to database", async () => {
		const newBook = {
			title: "A very interesting book",
			authors: ["me", "my friend"],
			isbn: 123123123
		}

		await api
			.post('/api/book')
			.send(newBook)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const books = await booksInDb()
		const isbns = books.map(book => book.isbn)
		expect(isbns).toContain(123123123)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})
