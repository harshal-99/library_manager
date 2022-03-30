## RaftLabs Assignment

1. run seed.js to read data from csv files



2. Go to (Open in firefox for best viewing experience)
- [/api/books](https://library-manager-three.vercel.app/api/book) to see all the books in DB
- [/api/magazine](https://library-manager-three.vercel.app/api/magazine) to see magazines 
- [/api/search?sort=true](https://library-manager-three.vercel.app/api/search?sort=true) to see all books and magazines in sorted order

3. Find a book or magazine by its ISBN
- [/api/search?isbn=555455454518](https://library-manager-three.vercel.app/api/search?isbn=555455454518)

4. Find all books and magazines by author's email
- [/api/search?authorEmail=null-walter@echocat.org](https://library-manager-three.vercel.app/api/search?authorEmail=null-walter@echocat.org)

5. Show all books and magazines with all details sorted by their title
- [/api/search?sort=true](https://library-manager-three.vercel.app/api/search?sort=true)

6. Export data into a csv file
- [/api/export/author](https://library-manager-three.vercel.app/api/export/author)
- [/api/export/book](https://library-manager-three.vercel.app/api/export/book)
- [/api/export/magazine](https://library-manager-three.vercel.app/api/export/magazine)


## Schema

# POST

`/api/books`
`title: String,
authors: [String],
description: String,
isbn: Number`


`/api/magazine`
`title: String,
authors: [String],
description: String,
publishedAt: String`

`/api/author`
`firstName: String,
lastName: String,
email: String`


## Testing

GET and POST request are tested for book, magazine and author route.
