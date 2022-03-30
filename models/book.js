import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	title: {type: String, required: true},
	authors: [{
		type: String, required: true
	}],
	isbn: {type: Number, required: true},
	description: {type: String}
})


bookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Book = mongoose.model("Book", bookSchema)

export default Book
