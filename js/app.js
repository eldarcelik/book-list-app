//Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

//UI Constructor
function UI() {}

//Add book
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-sm btn-danger">X</td>
  `
  list.appendChild(row);
}

//Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Show alert
UI.prototype.showAlert = function(message, className) {
  //Create alert
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  //Insert alert
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function() {
    div.remove();
  }, 3000);
}

//Delete book
UI.prototype.deleteBook = function(target) {
  if (target.classList.contains('btn-danger')) {
    target.parentElement.parentElement.remove();
  }
}

//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

  //Get values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  
  //Instance of Book
  const book = new Book(title, author, isbn);

  //Instanc of UI 
  const ui = new UI();

  //Validation 
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields!', 'alert-danger');
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Show alert
    ui.showAlert('Book added!', 'alert-success');
    //Clear fileds
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  //Instanc of UI 
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show alert
  ui.showAlert('Book removed!', 'alert-success');
  e.preventDefault();
});