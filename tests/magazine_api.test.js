import mongoose from "mongoose";
import supertest from "supertest"

import app from "../app.js";
import Magazine from "../models/magazine.js";
import {magazinesInDb, initialMagazines} from "./test_helper.js";

const api = supertest(app)

beforeEach(async () => {
	await Magazine.deleteMany({})
	for (const initialMagazine of initialMagazines) {
		await api
			.post('/api/magazine')
			.send(initialMagazine)
	}
})

describe("only valid magazines are added", () => {
	test("title, isbn and authors are required", async () => {
		const magazine = {
			title: '',
			isbn: null,
			authors: []
		}

		await api
			.post('/api/magazine')
			.send(magazine)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
})

describe("when a magazine is created", () => {
	test("it is saved to database", async () => {
		const magazine = {
			title: 'An interesting magazine',
			isbn: 1234123412,
			authors: ["me", "my friend"]
		}

		await api
			.post('/api/magazine')
			.send(magazine)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const magazines = await magazinesInDb()
		const isbns = magazines.map(mag => mag.isbn)
		expect(isbns).toContain(magazine.isbn)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})
