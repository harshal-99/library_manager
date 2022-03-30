import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
	email: {type: String, required: true, minLength: 3},
	firstName: {type: String, required: true, minLength: 3},
	lastName: {type: String, required: true, minLength: 3}
})

authorSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


const Author = mongoose.model("Author", authorSchema)

export default Author
