import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema({
	title: {type: String, required: true},
	isbn: {type: Number, required: true},
	authors: [{
		type: String, required: true
	}],
	publishedAt: {type: String}
})

magazineSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()

		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Magazine = mongoose.model("Magazine", magazineSchema)


export default Magazine
