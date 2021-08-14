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

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

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
        myShelf.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked));
        addBookToShelf();
    }
})

function addBookToShelf() {
    const divBook = document.createElement('div');
    divBook.classList.add(`bookNumber${(myShelf.length-1)}`);
    bookContainer.appendChild(divBook);
    const divTitle = document.createElement('div');
    divTitle.textContent = myShelf[(myShelf.length-1)].title;
    divBook.appendChild(divTitle);
    const divAuthor = document.createElement('div');
    divAuthor.textContent = myShelf[(myShelf.length-1)].author;
    divBook.appendChild(divAuthor);
    const divPages = document.createElement('div');
    divPages.textContent = myShelf[(myShelf.length-1)].pages;
    divBook.appendChild(divPages);
    function readStatus(book, status) {
        const label = document.createElement('label');
        label.classList.add('switch');
        divBook.appendChild(label);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `bookNumber${myShelf.indexOf(book)}`;
        input.checked = status;
        input.addEventListener('change', () => {
            book.status = input.checked;
        })
        label.appendChild(input);
        const span = document.createElement('span');
        span.classList.add('slider');
        span.classList.add('round');
        label.appendChild(span);
    }
    readStatus(myShelf[(myShelf.length-1)], myShelf[(myShelf.length-1)].status);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    divBook.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        divBook.remove();
    })
}
