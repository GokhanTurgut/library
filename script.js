const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookStatus = document.getElementById('status');
const submitBtn = document.getElementById('submit');

let myShelf = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToShelf() {

}

submitBtn.addEventListener('click', () => {
    myShelf.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value));
})


myShelf.push(new Book('metaphysics', 'aristo', 200, true));


