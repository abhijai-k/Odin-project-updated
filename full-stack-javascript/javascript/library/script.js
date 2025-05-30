const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const container = document.getElementById('bookContainer');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    container.appendChild(card);
  });

  attachCardEventListeners();
}

function attachCardEventListeners() {
  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.closest('.book-card').getAttribute('data-id');
      removeBook(id);
    });
  });

  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.closest('.book-card').getAttribute('data-id');
      toggleReadStatus(id);
    });
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Dialog functionality
const dialog = document.getElementById('bookDialog');
document.getElementById('newBookBtn').addEventListener('click', () => dialog.showModal());
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());

document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read') === 'on';

  addBookToLibrary(title, author, pages, read);
  e.target.reset();
  dialog.close();
});

// Manually add a few books for testing
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
