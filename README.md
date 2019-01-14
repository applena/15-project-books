![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Book App

### Author: Lena Eivy

### Links and Resources
* [repo](https://github.com/applena/15-project-books)
* [travis](http://xyz.com)
* [front-end](https://eivy-lab15-book-app.herokuapp.com/) (when applicable)

#### Documentation
* [swagger](http://localhost:3001/docs/) (API assignments only)
* [jsdoc](http://localhost:3001/jsdocs/) (All assignments)

### Modules
#### `getRenderableBook.js`
##### Exported Values and Methods

###### `getRenderableBook(book) -> object`
returns a book object that is renderable into the page

#### `Books.mongo.js`
##### Exported Values and Methods

###### `Books.mongo() -> string`
books class that models books data works with mongo

#### Book.sql.js`
##### Exported Values and Methods

###### `Books.sql() -> string`
books class that works with sql database

#### `bookSchema.js`
##### Exported Values and Methods

###### `booksSchema() -> string`
A mongo schema for the book object

#### `bookshleves.mongo.js`
##### Exported Values and Methods

###### `bookshelves() -> string`
mongo model for the bookshelves

#### `bookshelves.sql().js`
##### Exported Values and Methods

###### `bookshelves.sql() -> string`
sql model for bookshelves

#### `delete.books.id.js`
##### Exported Values and Methods

###### `delete.books.id.js -> object`
deletes a book

#### `get.books.id.js`
##### Exported Values and Methods

###### `get.books.id() -> string`
gets a book by id

#### get.searches.new.js`
##### Exported Values and Methods

###### `get.searches.new -> string`
returns a search from google books

#### `get json books.js`
##### Exported Values and Methods

###### `get json books -> string`
return books in json format

#### `post.books.js`
##### Exported Values and Methods

###### `post.books -> string`
adds a book to the DB

#### `put.books().js`
##### Exported Values and Methods

###### `put.books() -> string`
updates a book from the database


### Setup
#### `.env` requirements
* `PORT` - 3001
* `MONGODB_URI` - `mongodb://localhost:27017`

#### Running the app
* `npm start`
* Endpoint: `/`
  * Returns a list of books
* Endpoint: `/books`
  * Returns a JSON object with books in it.
* Endpoint: `/books:id`
  * renders a detailed book page by id.
* Endpoint: `/searches/new`
  * Returns a page where user can search for books by title or author.
* Endpoint: `/searches`
  * Returns a list of books that match the criteria provided

* to run the app:
- run `npm start` in one terminal
- in another terminal run `mongod` to run your  mongo db
  - make sure you are using mongo db in your .env file (or use SQL if you prefer)
- open `http://localhost:3001/` to run the app in your browser
  
#### Tests
* to run the test: `npm test`
* asserting that the paths connect and do the things that they are supposed to do

