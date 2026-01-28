import { useState } from "react";
import BookForm from "../components/bookForm";
import BookList from "../components/bookList";

const Home = () => {
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const reload = () => setRefresh(!refresh);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">📚 Book Store</h2>

      <BookForm
        editData={editData}
        setEditData={setEditData}
        reload={reload}
      />

      <BookList
        setEditData={setEditData}
        refresh={refresh}
      />
    </div>
  );
};

export default Home;
