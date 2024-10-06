// Book Class
class Book{
    constructor(title,author,ISBN){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isAvailable = true;
    }

    // issue book
    issueBook(){
        if(this.isAvailable){
            this.isAvailable = false;
            console.log(`The book is ${this.title} has been issued.`)
        }else{
            console.log(`The book is ${this.title} already issued.`)
        }
    }

    // return book
    returnBook(){
        if(this.isAvailable){
            this.isAvailable = true;
            console.log(`The book is ${this.title} has been returned.`)
        }else{
            console.log(`The book is ${this.title} already returned.`)
        }
    }
}

// Library Class
class Library{
    constructor(){
        this.books = [];
    }

    // add books
    addBook(book){
        this.books.push(book);
        console.log(`This book ${book.title} has been added to the library.`)
    }

    // display all books
    displayBooks(){
        if(this.books.length == 0){
            console.log("No books available in library.")
        }else{
            console.log("Books in the library:");
            this.books.forEach((book,index)=>{
                console.log(`${index+1}. Title:- ${book.title}, Author:- ${book.author}, ISBN:- ${book.ISBN}, available:- ${book.isAvailable}`)
            })
        }
    }
}

// user class
class User{
    constructor(name){
        this.name = name;
        this.borrowedBooks = [];
    }
    // borrow book
    borrowedBook(book){
        if(book.isAvailable){
            book.issueBook();
            this.borrowedBooks.push(book);
            console.log(`${this.name} is borrowed the book ${book.title}.`);
        }else{
            console.log(`Sorry! the book ${book.title} is already borrowed.`);
        }
    }

    // return book
    returnedBook(book){
        const bookIndex = this.borrowedBooks.indexOf(book);
        if(bookIndex != -1){
            book.returnBook();
            this.borrowedBooks.splice(bookIndex,1);
            console.log(`${this.name} returned the book ${book.title}`);
        }else{
            console.log(`${this.name} doesn't have the book ${book.title}`);
        }
    }

    // display borrowed books
    displayBorrowedBooks(){
        if(this.borrowedBooks.length == 0){
            console.log(`${this.name} has not borrowed any books.`)
        }else{
            console.log(`${this.name} borrowed books:`)
            this.borrowedBooks.forEach((book)=>{
                console.log(`- ${book.title} by ${book.author}`);
            })
        }
    }

}


// create a library
const library = new Library();

// Create some Books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084");
const book3 = new Book("1984", "George Orwell", "9780451524935");

// add books in library
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// display all books
library.displayBooks();


// create a user
const user = new User("Chirag");
user.borrowedBook(book1);
library.displayBooks();

user.displayBorrowedBooks();

user.returnedBook(book1);

library.displayBooks();

