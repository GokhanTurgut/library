const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookStatus = document.getElementById('status');
const submitBtn = document.getElementById('submit');
const bookContainer = document.getElementById('bookContainer');
const addBookBtn = document.getElementById('addBook');
const closeBtn = document.getElementById('close');
const addBookModal = document.getElementById('addBookModal');

let myShelf = [];

// If local storage is not empty get books and put them into MyShelf
if (JSON.parse(localStorage.getItem('books'))) {
    myShelf = JSON.parse(localStorage.getItem('books'));
    myShelf.forEach((book) => {
        book.display = false;
    })
    displayBooks();
}

class Book {
    constructor(title, author, pages, status, display) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.display = display;
    }
}

const eventListeners = (() => {
    addBookBtn.addEventListener('click', () => {
        addBookModal.style.display = "flex";
    })
    
    closeBtn.addEventListener('click', () => {
        addBookModal.style.display = "none";
    })
    
    window.onclick = function(event) {
        if (event.target == addBookModal) {
          addBookModal.style.display = "none";
        }
    }
    
    submitBtn.addEventListener('click', () => {
        if (bookTitle.value == '' || bookAuthor.value == '' || bookPages.value == '') return;
        else {
            myShelf.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked, false));
            displayBooks();
        }
    })
})()

function displayBooks() {
    myShelf.forEach((book, index) => {
        if (!book.display) {
            const divBook = document.createElement('div');
            divBook.classList.add('books');
            divBook.classList.add(`bookNumber${index}`);
            divBook.dataset.indexNumber = index;
            bookContainer.appendChild(divBook);
            const divTitle = document.createElement('div');
            divTitle.textContent = book.title;
            divBook.appendChild(divTitle);
            const divAuthor = document.createElement('div');
            divAuthor.textContent = book.author;
            divBook.appendChild(divAuthor);
            const divPages = document.createElement('div');
            divPages.textContent = book.pages;
            divBook.appendChild(divPages);
            function readStatus(book, index, status) {
                const label = document.createElement('label');
                label.classList.add('switch');
                divBook.appendChild(label);
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = `bookNumber${index}`;
                input.checked = status;
                input.addEventListener('change', () => {
                    book.status = input.checked;
                    storage();
                })
                label.appendChild(input);
                const span = document.createElement('span');
                span.classList.add('slider');
                span.classList.add('round');
                label.appendChild(span);
            }
            readStatus(book, index, book.status);
            const deleteBtn = document.createElement('span');
            deleteBtn.classList.add('material-icons');
            deleteBtn.textContent = 'delete';
            divBook.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', () => {
                divBook.remove();
                myShelf.splice(divBook.dataset.indexNumber, 1);
                storage();
            })
            book.display = true;
            storage();
        }
    })    
}

function storage() {
    localStorage.setItem('books', JSON.stringify(myShelf));
}

// Example Books
// myShelf.push(new Book('The Silmarillion', 'J. R. R. Tolkien', 365, false, false));
// myShelf.push(new Book('Republic', 'Plato', 416, true, false));
// displayBooks();