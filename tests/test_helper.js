import Author from "../models/author.js";
import Magazine from "../models/magazine.js";
import Book from "../models/book.js";

export const initialAuthors = [
	{
		email: 'null-walter@echocat.org',
		firstName: 'Paul',
		lastName: 'Walter'
	},
	{
		email: 'null-mueller@echocat.org',
		firstName: 'Max',
		lastname: 'Müller'
	},
	{
		email: 'null-ferdinand@echocat.org',
		firstName: 'Franz',
		lastName: 'Ferdinand'
	},
	{
		email: 'null-gustafsson@echocat.org',
		firstName: 'Karl',
		lastName: 'Gustafsson'
	},
	{
		email: 'null-lieblich@echocat.org',
		firstName: 'Werner',
		lastName: 'Lieblich'
	},
	{
		email: 'null-rabe@echocat.org',
		firstName: 'Harald',
		lastName: 'Rabe'
	}
]

export const initialBooks = [
	{
		title: "I'll help you cook. The successful universal cookbook with a large baking section",
		isbn: '5554-5545-4518',
		authors: 'null-walter@echocat.org',
		description: "If you are looking for a basic cookbook, you are faced with a wealth of alternatives these days. It's difficult to find the right mix of basic work and recipe collection for you. You should be clear about what you want to focus on or what cooking and baking skills you can already assume."
	},
	{
		title: 'The big GU cookbook cooking for children',
		isbn: '2145-8548-3325',
		authors: 'null-ferdinand@echocat.org,null-lieblich@echocat.org',
		description: 'It starts with... the first spoonfuls for mommy, daddy and the rest of the world. Yes and then? What manufacturers of baby food can do, you can often do it yourself in no time at all, maybe even healthier, often fresher. The cookbook appeals to older babies and school children, and it does so in a playful, age-appropriate way.'
	},
	{
		title: 'Slim in your sleep',
		isbn: '4545-8558-3232',
		authors: 'null-gustafsson@echocat.org',
		description: `Slim in your sleep sounds like a beautiful dream, but it really is possible. But not after a salami pizza for dinner. The basics of this new concept are a type-approp
		riate insulin food combining diet as well as food and exercise in rhythm with the biological clock. How the biological clock ticks and what should be on the menu depends on your personal archetype: nomad or farmer?`
	},
	{
		title: 'The perfect dinner. The best recipes',
		isbn: '2221-5548-8585',
		authors: 'null-lieblich@echocat.org',
		description: 'You also want to create a perfect dinner? With this book you can do it!'
	},
	{
		title: 'The Pirate Cookbook. A specialty cookbook with the 150 most delicious recipes',
		isbn: '3214-5698-7412',
		authors: 'null-rabe@echocat.org',
		description: 'The pirate cookbook proves that the pirate captains were feared warhorses, but on the other hand sometimes had a superior sense of taste. ... In short, an ideal book to provide a culinary setting for maritime events.'
	},
	{
		title: 'Awesome Italian',
		isbn: '1024-5245-8584',
		authors: 'null-lieblich@echocat.org,null-walter@echocat.org,null-rabe@echocat.org',
		description: "Celebrity chef Jamie Oliver has been touring Italy in his VW bus -- and he's got all kinds of things bring some culinary souvenirs. It's worth checking your luggage..."
	},
	{
		title: "O'Reilly's Cookbook for Geeks",
		isbn: '2215-0012-5487',
		authors: 'null-mueller@echocat.org',
		description: `According to popular belief, geeks thrive on cola and frozen pizza, which they wolf down absentmindedly at night on the computer. So far the cliché! But that cooking 
	has a lot to do with programming, that it is similarly creative, that many paths lead to individual goals and that some recipes are just crazy and - yes, geeky: that's what two cooks in this book show.`
	},
	{
		title: "Schuhbeck's cooking school. Learn to cook with Alfons Schuhbeck",
		isbn: '1215-4545-5895',
		authors: 'null-walter@echocat.org',
		description: `Every beginning is easy! At least when you have a teacher like Alfons Schuhbeck by your side when you learn to cook. With its help, even the most clumsy beginner can 
	get top marks for his dishes. The trick that the award-winning master chef uses is visualization. The individual work steps are shown on color photos in the format of approx. 3x4 cm. B
	elow these are brief and concise information on the preparation. In this way, Schuhbeck's cooking school conveniently presents everything at a glance. And the interested novice cook ca
	n concentrate on the main thing - cooking. The color photo on the left shows what the food should look like, on which the ingredients - thanks to the clever layout - are also listed very clearly. Schuhbeck also gives concise recommendations on ingredients and preparation.`
	}
]


export const initialMagazines = [
	{
		title: 'Beautiful cooking',
		isbn: '5454-5587-3210',
		authors: 'null-walter@echocat.org',
		publishedAt: '21.05.2011'
	},
	{
		title: 'My familie and me',
		isbn: '4545-8541-2012',
		authors: 'null-mueller@echocat.org',
		publishedAt: '10.07.2011'
	},
	{
		title: 'Cooking for gourmets',
		isbn: '2365-5632-7854',
		authors: 'null-lieblich@echocat.org,null-walter@echocat.org',
		publishedAt: '01.05.2012'
	},
	{
		title: 'Gourmet',
		isbn: '2365-8745-7854',
		authors: 'null-ferdinand@echocat.org',
		publishedAt: '14.06.2010'
	},
	{
		title: 'The Wine Connoisseurs',
		isbn: '2547-8548-2541',
		authors: 'null-walter@echocat.org',
		publishedAt: '12.12.2011'
	},
	{
		title: 'Vinum',
		isbn: '1313-4545-8875',
		authors: 'null-gustafsson@echocat.org',
		publishedAt: '23.02.2012'
	}
]


export const authorsInDB = async () => {
	const authors = await Author.find({})
	return authors.map(auth => auth.toJSON())
}

export const magazinesInDb = async () => {
	const magazines = await Magazine.find({})
	return magazines.map(mag => mag.toJSON())
}

export const booksInDb = async () => {
	const books = await Book.find({})
	return books.map(book => book.toJSON())
}
