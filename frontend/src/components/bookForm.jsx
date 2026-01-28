import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Api from "../service/apiRoute";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaBook } from "react-icons/fa";

const BookForm = ({ editData, setEditData, reload }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({ title: "", author: "", price: "" });
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await Api.patch(`/${editData._id}`, data);
        toast.success("Book updated successfully");
        setEditData(null);
      } else {
        await Api.post("/", data);
        toast.success("Book added successfully");
      }
      reset();
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-gradient bg-dark text-white d-flex align-items-center">
        <FaBook className="me-2" />
        {editData ? "Edit Book (Admin)" : "Add New Book (Admin)"}
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Book Title</label>
              <input
                className="form-control"
                placeholder="Enter book title"
                {...register("title", { required: true })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Author</label>
              <input
                className="form-control"
                placeholder="Author name"
                {...register("author", { required: true })}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                {...register("price", { required: true })}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className={`btn w-100 ${
                  editData ? "btn-warning" : "btn-success"
                }`}
              >
                {editData ? <FaEdit /> : <FaPlus />}{" "}
                {editData ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
