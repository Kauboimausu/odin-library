const myLibrary = [];
let index = 0;

function Book(name, author, yearPublished, pageCount){
    this.name = name;
    this.author = author;
    this.yearPublished = yearPublished;
    this.pageCount = pageCount;
    this.id = crypto.randomUUID();
}

// This will change the library index when a button is pressed on the page
// Whether it increases depends on the button pressed
function changeLibraryIndex(increase) {
    if(increase) {
        // This makes sure we reset the index in case of overflow
        index = index++ % myLibrary.length;
    }
}

function addBookToLibrary(name, author, yearPublished, pageCount) {
    let bookToAdd = new Book(name, author, yearPublished, pageCount);
    
    myLibrary.push(bookToAdd);
}

function createInitialLibrary() {
    addBookToLibrary("War and Peace", "Leo Tolstoy", "1867", 1225);
    addBookToLibrary("East of Eden", "John Steinbeck", 602);
    addBookToLibrary("Dracula", "Bram Stoker", "1897", 456);
}

createInitialLibrary();