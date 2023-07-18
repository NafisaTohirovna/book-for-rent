class BookManager {
  constructor(bookAdd) {
    this.bookList = document.getElementById("bookList");
    this.bookAdd = bookAdd;
    this.addBookBtn = document.getElementById("addBookBtn");
    this.bookNameInput = document.getElementById("bookName");
    this.bookAvtorInput = document.getElementById("bookAvtor");
    this.filterInput = document.getElementById("filterInput");
    this.addBookBtn.addEventListener("click", this.addBook.bind(this));
    this.filterInput.addEventListener("input", this.filterBooks.bind(this));
    this.renderBooks();
    this.loadFromLocalStorage();
  }

  renderBooks() {
    this.bookList.innerHTML = "";
    for (const item of this.bookAdd) {
      const bookInfo = document.createElement("li");
      bookInfo.classList.add("bookInfo");
      this.bookList.appendChild(bookInfo);

      const bookName = document.createElement("span");
      bookName.classList.add("bookName");
      bookInfo.appendChild(bookName);
      bookName.innerHTML = "📖" + item.bookName;

      const bookAvtor = document.createElement("span");
      bookAvtor.classList.add("bookAvtor");
      bookInfo.appendChild(bookAvtor);
      bookAvtor.innerHTML = "✍️" + item.bookAvtor;

      const rentBtn = document.createElement("button");
      rentBtn.classList.add("rentBtn");
      rentBtn.innerHTML = "💁‍♀️Ijaraga olish";
      rentBtn.addEventListener("click", () => {
        if (rentBtn.innerHTML != "🙅‍♀️Ijarada") {
          this.rentBook(item);
          rentBtn.innerHTML = "🙅‍♀️Ijarada";
        } else {
          this.rentBook(!item);
        }
        // Matnni "Ijarada" ga o'zgartirish
      });
      bookInfo.appendChild(rentBtn);

      const editBtn = document.createElement("button");
      editBtn.classList.add("editBtn");
      editBtn.innerHTML = "🔃Tahrirlash";
      editBtn.addEventListener("click", () => {
        this.editBook(item);
      });
      bookInfo.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerHTML = "❌O'chirish";
      deleteBtn.addEventListener("click", () => {
        this.removeBook(item);
      });
      bookInfo.appendChild(deleteBtn);
    }
  }

  addBook(e) {
    e.preventDefault();

    const bookName = this.bookNameInput.value;
    const bookAvtor = this.bookAvtorInput.value;

    if (bookName && bookAvtor) {
      this.bookAdd.push({ bookName, bookAvtor });
      this.renderBooks();
      this.saveToLocalStorage();
    }

    this.bookNameInput.value = "";
    this.bookAvtorInput.value = "";
  }

  editBook(book) {
    const bookIndex = this.bookAdd.indexOf(book);
    if (bookIndex !== -1) {
      const newBookName = prompt("Yangi kitob nomini kiriting:", book.bookName);
      const newBookAvtor = prompt(
        "Yangi yozuvchi ismini kiriting:",
        book.bookAvtor
      );

      if (newBookName && newBookAvtor) {
        this.bookAdd[bookIndex].bookName = newBookName;
        this.bookAdd[bookIndex].bookAvtor = newBookAvtor;
        this.renderBooks();
        this.saveToLocalStorage();
      }
    }
  }

  removeBook(book) {
    const bookIndex = this.bookAdd.indexOf(book);
    if (bookIndex !== -1) {
      this.bookAdd.splice(bookIndex, 1);
      this.renderBooks();
      this.saveToLocalStorage();
    }
  }

  rentBook(book) {
    const bookIndex = this.bookAdd.indexOf(book);
    if (bookIndex !== -1) {
      const BookMakerName = prompt("Ismingiz");
      const BookMakerNumber = prompt("Telefon raqamingiz");
      const days = prompt("Nechi kunga ijaraga olasiz:");
      const rentCost = Number(days) * 1;
      const today = new Date();
      const returnDate = new Date(
        today.setDate(today.getDate() + parseInt(days))
      );
      if (days && !isNaN(rentCost)) {
        alert(
          `
Kitob oluvchi ismi: ${BookMakerName}
Kitob oluvchi telefon raqami: ${BookMakerNumber}
          
Kitob nomi: ${book.bookName}
Yozuvchi ismi: ${book.bookAvtor}
Ijaraga olish uchun kunlar soni: ${days}
To'lov miqdori: $${rentCost}.00
Kitobni qaytarish sanasi: ${returnDate.toDateString()}`
        );
      }
    } else {
      alert(`Kitob ijarada`);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("bookData", JSON.stringify(this.bookAdd));
  }

  loadFromLocalStorage() {
    const bookData = localStorage.getItem("bookData");
    if (bookData) {
      this.bookAdd = JSON.parse(bookData);
      this.renderBooks();
    }
  }

  filterBooks() {
    const filterText = this.filterInput.value.toLowerCase();
    const filteredBooks = this.bookAdd.filter((book) => {
      const bookName = book.bookName.toLowerCase();
      const bookAvtor = book.bookAvtor.toLowerCase();
      return bookName.includes(filterText) || bookAvtor.includes(filterText);
    });

    this.bookList.innerHTML = "";
    for (const item of filteredBooks) {
      const bookInfo = document.createElement("li");
      bookInfo.classList.add("bookInfo");
      this.bookList.appendChild(bookInfo);

      const bookName = document.createElement("span");
      bookName.classList.add("bookName");
      bookInfo.appendChild(bookName);
      bookName.innerHTML = "📖" + item.bookName;

      const bookAvtor = document.createElement("span");
      bookAvtor.classList.add("bookAvtor");
      bookInfo.appendChild(bookAvtor);
      bookAvtor.innerHTML = "✍️" + item.bookAvtor;

      const rentBtn = document.createElement("button");
      rentBtn.classList.add("rentBtn");
      rentBtn.innerHTML = "💁‍♀️Ijaraga olish";
      rentBtn.addEventListener("click", () => {
        if (rentBtn.innerHTML != "🙅‍♀️Ijarada") {
          this.rentBook(item);
        } else {
          this.rentBook(!item);
        }
        rentBtn.innerHTML = "🙅‍♀️Ijarada";
      });
      bookInfo.appendChild(rentBtn);

      const editBtn = document.createElement("button");
      editBtn.classList.add("editBtn");
      editBtn.innerHTML = "🔃Tahrirlash";
      editBtn.addEventListener("click", () => {
        this.editBook(item);
      });
      bookInfo.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerHTML = "❌O'chirish";
      deleteBtn.addEventListener("click", () => {
        this.removeBook(item);
      });
      bookInfo.appendChild(deleteBtn);
    }
  }
}

const bookAddData = [
  { bookName: "Harry Potter ", bookAvtor: " J. K. Rowling" },
  { bookName: "Atomic Habits", bookAvtor: "James Clear" },
  { bookName: "Sherlock Holmes", bookAvtor: "Conan Doyle" },
  { bookName: "Games People Play", bookAvtor: "Eric Berne" },
];
const bookManager = new BookManager(bookAddData);
