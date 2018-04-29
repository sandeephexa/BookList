// Book constructor
function Book(title,author,isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
}

// UI constructor
function UI(){}

UI.prototype.addBookToList = function(book){
const list = document.getElementById('book-list');

const row = document.createElement('tr');

// insert columns
row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>`;

list.appendChild(row);
}

// delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// error alert
UI.prototype.showAlert = function(message,className){
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

// clear UI fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Add event listeners
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
    ui.addBookToList(book);
    // clear UI fields
    ui.clearFields();
    // show success message
    ui.showAlert('Book added !','success');

   }
  
    e.preventDefault();
});

// delete book from UI event listener
document.getElementById('book-list').addEventListener('click',function(e){
    // instantiate UI
      const ui = new UI();
      // delete UI element
      ui.deleteBook(e.target);
      // show alert message
      ui.showAlert('book removed !','success');
     
      e.preventDefault();
});



