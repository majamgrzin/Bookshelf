'use strict'

const bookshelf = document.querySelector('#bookshelf');

//Show Formular
const showForm = document.querySelector('#plus');
showForm.addEventListener('click', () => {
    const formular = document.querySelector('#book-formular');
    formular.classList.add('show-form');
})

//Cancel-Button
const cancelForm = document.querySelector('.btn_cancel');
cancelForm.addEventListener('click', () => {
    const formular = document.querySelector('#book-formular');
    formular.classList.remove('show-form');
})

//Add Book Formular
let books = [];
const addBook = document.querySelector('.btn_add');
//Konstruktor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
addBook.addEventListener('click', () => {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('.status').checked;
    let newBook = new Book(title, author, pages, read);
    books.push(newBook);

    //reset Formular
    const formular = document.querySelector('#book-formular');
    formular.classList.remove("show-form");
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('.status').checked = "";
    addBookToLibrary();
});

//create HTML (new Book)
function addBookToLibrary() {
    //schleife für löschen von arrays in HTML
    const divBook = bookshelf.children;
    if (divBook.length > 0) {
        for (let item of divBook) {
            item.remove();
        }
    }
    let i = 0;
    books.forEach(book => {
        let divBooks = document.createElement('div');
        divBooks.classList.add('book');
        divBooks.dataset.index = i; //creating index number
        i++;

        let p1 = document.createElement('p');
        p1.classList.add('title')
        p1.textContent = "Title: " + book.title;

        let p2 = document.createElement('p');
        p2.classList.add('author')
        p2.textContent = "Author: " + book.author;

        let p3 = document.createElement('p');
        p3.classList.add('pages')
        p3.textContent = "Pages: " + book.pages;

        let p4 = document.createElement('p');
        p4.classList.add('read')
        p4.textContent = "Read: " + book.read;

        let i1 = document.createElement('i');
        i1.innerHTML = '<i class="fas fa-book-reader" id="read-unread"></i>';

        let i2 = document.createElement('i');
        i2.innerHTML = '<i class="far fa-trash-alt" id="delete-book"></i>'

        divBooks.appendChild(p1)
        divBooks.appendChild(p2)
        divBooks.appendChild(p3)
        divBooks.appendChild(p4)
        divBooks.appendChild(i1)
        divBooks.appendChild(i2)
        bookshelf.appendChild(divBooks)

    })
}

// Events on Icons
const addEventBook = (rootElement) => {
    rootElement.addEventListener('click', (e) => {

        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.matches('#delete-book')) { //delete icon
                const deleteBook = document.querySelector('#delete-book');
                let deleteIndex = deleteBook.parentElement.parentElement.dataset.index;
                console.log(deleteIndex);
                books.splice(0, 1); //removing array with index 0
                deleteBook.parentElement.parentElement.remove();// remove in HTML
            }

            if (targetElement.matches('#read-unread')) { //change reading status icon
                let test = targetElement.parentElement.parentElement.children[3].textContent;
                if (test === 'Read: true') {
                    test = targetElement.parentElement.parentElement.children[3].textContent = 'Read: false'
                } else {
                    test = targetElement.parentElement.parentElement.children[3].textContent = 'Read: true'
                }
            }
            targetElement = targetElement.parentElement;


        }
    }, true)
}
addEventBook(bookshelf, 'click');