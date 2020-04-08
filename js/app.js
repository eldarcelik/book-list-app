class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
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

  deleteBook(target) {
    if (target.classList.contains('btn-danger')) {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(message, className) {
    //Create alert
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //Insert alert
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //Disable submit and after 3 sec enable
    document.querySelector('input[type="submit"]').disabled = true;

    //Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('input[type="submit"]').disabled = false;
      div.remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Event listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {

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
document.getElementById('book-list').addEventListener('click', function (e) {
  //Instanc of UI 
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show alert
  ui.showAlert('Book removed!', 'alert-success');
  e.preventDefault();
});