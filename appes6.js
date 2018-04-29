class Book{
  constructor(title,author,isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
  }
}

class UI {
    //add book
    addBookToList(book){
    
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        // insert columns
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }
    // show alert
    showAlert(message,className){
          // create element
    const div = document.createElement('div');
    // add classname
     div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    // get child
    const form = document.querySelector('#book-form');
    // add div between container and form
    container.insertBefore(div,form);
    // timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
    }

    //delete book
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    // clear fields
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// local storage
class Storage{

    static getBooks(){
        console.log('inside getBooks');
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
     
        const books = Storage.getBooks();
        // instantiate UI
        const ui = new UI();
        // loop through books
        books.forEach(function(book){
            ui.addBookToList(book);
        })
    }

    static addBook(book){
   
        console.log('inside addBook');
        const  books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){

        const books = Storage.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Add event listeners

// event listener when DOM loads
document.addEventListener('DOMContentLoaded', Storage.displayBooks);


// add book to UI
document.getElementById('book-form').addEventListener('submit',function(e){
    // get form values
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const isbn = document.getElementById('isbn').value;
    // instantiate book
     const book = new Book(title,author,isbn);
    // instantiate UI 
    const ui = new UI();
    // add book to list
 
     console.log(ui);
    // validate
    if(title === '' || author === '' || isbn === '' )
    {
        ui.showAlert('fill in all fiels','error');
    }
    else{
        // add book to list
     ui.addBookToList(book);
     // clear UI fields
     ui.clearFields();
    
     // show success message
     ui.showAlert('Book added !','success');
     
     // add to local storage
     Storage.addBook(book);
 
    }
   
     e.preventDefault();
 });
 
 // delete book from UI event listener
 document.getElementById('book-list').addEventListener('click',function(e){
     // instantiate UI
       const ui = new UI();
       // delete UI element
       ui.deleteBook(e.target);
       // delete from Local Storage
       Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
       // show alert message
       ui.showAlert('book removed !','success');
      
       e.preventDefault();
 });