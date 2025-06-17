const myLibrary = [];
const listOfBooks = document.querySelector(".list-of-books");

function Book(name, author, yearPublished, readStatus){
    this.name = name;
    this.author = author;
    this.yearPublished = yearPublished;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, yearPublished, readStatus = false) {

    // For each book we add to the library we'll also add to the UI
    let newBookCard = document.createElement("li");
    newBookCard.classList.add("book-card");

    let bookToAdd = new Book(name, author, yearPublished, readStatus);

    // We'll create each of the elements that go in our book's card

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

    // Now we'll append the elements to the card 
    newBookCard.append(bookImage);
    newBookCard.append(bookName);
    newBookCard.append(bookAuthor);
    newBookCard.append(bookYear);
    newBookCard.append(bookStatus);

    // Before appending the card to the list we'll add an even listener

    newBookCard.addEventListener("click", () => {
        changeHighlightedBook(name, author, yearPublished, readStatus);
    });

    listOfBooks.append(newBookCard);
    
    myLibrary.push(bookToAdd);
}

// Function that changes the displayed book to the library book that was clicked
function changeHighlightedBook(name, author, year, status, image = null){
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
}

// Function that adds a few books to the page
function createInitialLibrary() {
    addBookToLibrary("War and Peace", "Leo Tolstoy", "1867");
    addBookToLibrary("East of Eden", "John Steinbeck", "1952");
    addBookToLibrary("Dracula", "Bram Stoker", "1897");
}

createInitialLibrary();
