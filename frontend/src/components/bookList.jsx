import { useEffect, useState } from "react";
import Api from "../service/apiRoute";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../service/apiRoute";

const BookList = ({ setEditData, refresh }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await Api.get("/");
      setBooks(Array.isArray(res.data.records) ? res.data.records : []);
    } catch (error) {
      toast.error("Failed to load books");
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await Api.delete(`/${id}`);
      toast.error("Book deleted");
      fetchBooks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-dark text-white fw-bold">
        📚 Book List
      </div>

      <div className="card-body table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-secondary">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th width="120">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>₹ {book.price}</td>
                  <td>
                    <FaEdit
                      className="text-primary me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditData(book)}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteBook(book._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
