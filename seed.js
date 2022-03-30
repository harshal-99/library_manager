import csv from "csvtojson";
import mongoose from "mongoose";

import Author from "./models/author.js";
import Book from "./models/book.js";
import Magazine from "./models/magazine.js";
import {MONGODB_URI} from "./utils/config.js";


await mongoose.connect(MONGODB_URI)

await Author.deleteMany({})
await Book.deleteMany({})
await Magazine.deleteMany({})

const readFromFile = async (fileName) => {
	return csv({delimiter: ';'})
		.fromFile(fileName);
}

let authors = await readFromFile('./data/authors.csv')

let books = await readFromFile('./data/books.csv')

let magazines = await readFromFile('./data/magazines.csv')

console.log(magazines)


for (let i = 0; i < magazines.length; i++) {
	if (magazines[i].authors.includes(',')) {
		magazines[i].authors = magazines[i].authors.split(',')
	} else {
		magazines[i].authors = [magazines[i].authors]
	}
}

for(let i = 0; i < books.length; i++) {
	if(books[i].authors.includes(',')) {
		books[i].authors = books[i].authors.split(',')
	} else {
		books[i].authors = [books[i].authors]
	}
}

for (let i = 0; i < authors.length; i++) {
	authors[i] = new Author({
		firstName: authors[i].firstname,
		lastName: authors[i].lastname,
		email: authors[i].email
	})
	await authors[i].save()

}

for (let i = 0; i < books.length; i++) {
	books[i].isbn = Number(books[i].isbn.replaceAll('-', ''))
	books[i] = new Book({
		title: books[i].title,
		authors: books[i].authors,
		isbn: books[i].isbn,
		description: books[i].description
	})
	await books[i].save()
}

for (let i = 0; i < magazines.length; i++) {
	magazines[i].isbn = Number(magazines[i].isbn.replaceAll('-', ''))
	magazines[i] = new Magazine({
		title: magazines[i].title,
		isbn: magazines[i].isbn,
		authors: magazines[i].authors,
		publishedAt: magazines[i].publishedAt
	})
	await magazines[i].save()
}


await mongoose.connection.close()


