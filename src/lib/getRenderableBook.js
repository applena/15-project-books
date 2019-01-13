module.exports = (book)=>{
  book.image_url = book.image_url||'https://i.imgur.com/J5LVHEL.jpg';
  book.title = book.title || 'No title available';
  book.author = book.author|| 'No authors available';
  book.isbn = book.isbn || 'No ISBN available';
  book.description = book.description || 'No description available';
  return book;
};
