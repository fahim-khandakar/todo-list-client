import "./App.css";
import bookPhoto from "../src/assets/book logo.png";
import { useEffect, useState } from "react";

function App() {
  const [books, setBook] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [books]);
  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const auther = form.auther.value;
    const year = form.year.value;
    const book = { title, auther, year };
    console.log(book);

    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <div className="heading">
        <img src={bookPhoto} alt="" />
        <h1>
          JSBangladesh <span>Book</span>List
        </h1>
      </div>
      <div className="form_container">
        <form onSubmit={handleAddBook} id="form">
          <div className="form_book">
            <label htmlFor="title">Book's Name</label>
            <input type="text" name="title" id="title" />
          </div>

          <div className="form_book">
            <label htmlFor="auther">Writer's Name</label>
            <input type="text" name="auther" id="auther" />
          </div>
          <div className="form_book">
            <label htmlFor="year">release Year</label>
            <input type="text" name="year" id="year" />
          </div>

          <input type="submit" value="Add Book" className="btn" />
        </form>
        <table className="table_container">
          <thead>
            <tr>
              <th>Book's Name</th>
              <th>Writer's Name</th>
              <th>Release Year</th>
            </tr>
          </thead>
          <tbody id="book_list">
            {books.map((book) => {
              return (
                <tr key={book._id}>
                  <th>{book.title}</th>
                  <th>{book.auther}</th>
                  <th>{book.year}</th>
                  <th onClick={() => handleDelete(book._id)} className="delete">
                    Delete
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
