import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import "express-async-errors"

import {MONGODB_URI} from "./utils/config.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";

import authorRouter from "./controllers/authors.js";
import magazineRouter from "./controllers/magazines.js";
import bookRouter from "./controllers/books.js";
import searchRouter from "./controllers/search.js";
import exportRouter from "./controllers/export.js";

const app = express()

logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB', error.message)
	})


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/author', authorRouter)
app.use('/api/book', bookRouter)
app.use('/api/magazine', magazineRouter)
app.use('/api/search', searchRouter)
app.use('/api/export', exportRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
export default app
