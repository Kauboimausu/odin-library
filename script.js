let myLibrary = [];
const listOfBooks = document.querySelector(".list-of-books");


class Book {
    constructor(name, author, yearPublished, readStatus, id) {
        this.name = name;
        this.author = author;
        this.yearPublished = yearPublished;
        this.readStatus = readStatus;
        this.id = id;
    }
}

Book.prototype.toggleStatus = function() {
    
    // We toggle the status of the book
    this.readStatus = !this.readStatus;

    // Then we'll change the UI to reflect the new status

    const cardStatusButton = document.getElementById("" + this.id).lastChild;
    if (this.readStatus){
        console.log("Card Updated");
        cardStatusButton.classList.remove("not-read");
        cardStatusButton.classList.add("read");
        cardStatusButton.textContent = "Read";
    } else {
        console.log("Card Updated");
        cardStatusButton.classList.remove("read");
        cardStatusButton.classList.add("not-read");
        cardStatusButton.textContent = "Not Read";
    }

    // Next we'll change the highlighted book if necessary
    // Note that this is not a perfect solution since 2 books can have the same name

    const highlightedBookTitle = document.querySelector(".highlighted-book-title").textContent;
    if(this.name === highlightedBookTitle) {
        const highlightedBookStatus = document.querySelector(".highlighted-book-status");
        if(highlightedBookStatus.classList.contains("read")) {
            console.log("Highlight Updated");
            highlightedBookStatus.textContent = "Not Read";
            highlightedBookStatus.classList.add("not-read");
            highlightedBookStatus.classList.remove("read");
        } else {
            console.log("Highlight Updated");
            highlightedBookStatus.textContent = "Read";
            highlightedBookStatus.classList.add("read");
            highlightedBookStatus.classList.remove("not-read");
        }
    }

};

// Function that toggles the status of the book
function removeBookWithID(id){
    // First we toggle the status of the object
    myLibrary = myLibrary.filter(book => book.id != id);
    // Then we'll change the graphical elements that indicate the status of the book

}

function toggleStatusAux(bookToChange){
    bookToChange.toggleStatus();
}

function addBookToLibrary(name, author, yearPublished, readStatus = false) {

    // For each book we add to the library we'll also add to the UI
    let newBookCard = document.createElement("li");
    newBookCard.classList.add("book-card");

    // We'll also generate an ID for the book 

    let bookID = crypto.randomUUID();
    newBookCard.id = bookID;

    let bookToAdd = new Book(name, author, yearPublished, readStatus, bookID);

    // We'll create each of the elements that go in our book's card

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-book");
    deleteButton.textContent = "Delete";

    let bookImage = document.createElement("img");
    bookImage.classList.add("shelved-book");
    bookImage.src = "src/book.png";

    let bookName = document.createElement("h4");
    bookName.classList.add("shelved-book-title");
    bookName.textContent = name;

    let bookAuthor = document.createElement("p");
    bookAuthor.classList.add("shelved-book-author");
    bookAuthor.textContent = author;

    let bookYear = document.createElement("p");
    bookYear.classList.add("shelved-book-year");
    bookYear.textContent = yearPublished;

    let bookStatus = document.createElement("button");
    if(readStatus) {
        bookStatus.classList.add("read");
        bookStatus.textContent = "Read";
    } else {
        bookStatus.classList.add("not-read");
        bookStatus.textContent = "Not Read";
    }
    bookStatus.classList.add("shelved-book-status");

    // We'll add an event listener to the delete button

    deleteButton.addEventListener("click", () => {
        removeBookWithID(bookID);
        newBookCard.remove();
    });

    // Now we'll append the elements to the card 
    newBookCard.append(deleteButton);
    newBookCard.append(bookImage);
    newBookCard.append(bookName);
    newBookCard.append(bookAuthor);
    newBookCard.append(bookYear);
    newBookCard.append(bookStatus);

    // Before appending the card to the list we'll add an even listener

    newBookCard.addEventListener("click", () => {
        changeHighlightedBook(name, author, yearPublished, readStatus, bookID);
    });

    listOfBooks.append(newBookCard);
    
    myLibrary.push(bookToAdd);

    // We'll add an event listener to the book status button

    bookStatus.addEventListener("click", toggleStatusAux(bookToAdd), {capture: true});
}


// Function that changes the displayed book to the library book that was clicked
function changeHighlightedBook(name, author, year, status, bookID){
    const highlightedBookName = document.querySelector(".highlighted-book-title");
    highlightedBookName.textContent = name;
    const highlightedBookAuthor = document.querySelector(".highlighted-book-author");
    highlightedBookAuthor.textContent = author;
    const highlightedBookYear = document.querySelector(".highlighted-book-year");
    highlightedBookYear.textContent = year;
    const highlightedBookStatus = document.querySelector(".highlighted-book-status");

    if(status) {
        highlightedBookStatus.textContent = "Read";
        highlightedBookStatus.classList.remove("not-read");
        highlightedBookStatus.classList.add("read");
    } else {
        highlightedBookStatus.textContent = "Not Read";
        highlightedBookStatus.classList.remove("read");
        highlightedBookStatus.classList.add("not-read");
    }

    let book = myLibrary.find(book => book.id === bookID);

    highlightedBookStatus.addEventListener("click", toggleStatusAux(book), {capture: true});
}


// Function that adds a few books to the page
function createInitialLibrary() {
    addBookToLibrary("War and Peace", "Leo Tolstoy", "1867");
    addBookToLibrary("East of Eden", "John Steinbeck", "1952");
    addBookToLibrary("Dracula", "Bram Stoker", "1897");
}


createInitialLibrary();



// We select the add a new book form element

const addNewBook = document.querySelector("#new-book-form");

// We'll create the asynchronous function to handle new book submissions

async function handleNewBook(){

    let newBookData = new FormData(addNewBook);
    console.log(newBookData);
    let bookTitle = newBookData.get("new-book-name");
    let bookAuthor = newBookData.get("new-book-author");
    let bookYear = newBookData.get("new-book-year");
    let bookStatus = newBookData.get("new-book-status");

    addBookToLibrary(bookTitle, bookAuthor, bookYear, bookStatus);
}

// We'll add an even listener when the form is submitted

addNewBook.addEventListener("submit", (e) => {
    e.preventDefault();
    handleNewBook();
});