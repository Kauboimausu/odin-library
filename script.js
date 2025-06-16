const myLibrary = [];
let index = 0;

function Book(name, author, yearPublished, pageCount){
    this.name = name;
    this.author = author;
    this.yearPublished = yearPublished;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, yearPublished, pageCount) {
    let bookToAdd = new Book(name, author, yearPublished, pageCount);
    
    myLibrary.push(bookToAdd);
}

function createInitialLibrary() {
    addBookToLibrary("War and Peace", "Leo Tolstoy", "1867");
    addBookToLibrary("East of Eden", "John Steinbeck", "1952");
    addBookToLibrary("Dracula", "Bram Stoker", "1897");
}

createInitialLibrary();