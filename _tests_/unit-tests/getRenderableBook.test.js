'use strict';

const getRenderableBook = require('../../src/lib/getRenderableBook');

describe('getRenderableBook', () => {
  let bookObj = {"image_url":"http://test.url", "title":"bob", "author":"bobby", "isbn":5, "description":"bob does stuff"};

  it('requires an object', () => {
    expect(() => {getRenderableBook()}).toThrow('book inforamtion needed');
  });

  it('populates the default image url', () => {
    let result = getRenderableBook(bookObj);
    expect(result.image_url).toEqual("http://test.url");
  });

  it('returns defaults when passed an empty object', () => {
    let result = getRenderableBook({});
    expect(result.title).toEqual('No title available');
  });

  it('populatess a book object with the given values', () => {
    let result = getRenderableBook(bookObj);
    expect(result.image_url).toEqual("http://test.url");
    expect(result.title).toEqual('bob');
    expect(result.author).toEqual('bobby');
    expect(result.isbn).toEqual(5);
    expect(result.description).toEqual('bob does stuff');
  });


});
