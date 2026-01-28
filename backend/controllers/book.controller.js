const Book = require("../models/book.model");

/* CREATE */
exports.store = async (req, res) => {
  const { title, author, price } = req.body;

  await Book.create({ title, author, price })
    .then(() => {
      res.json({
        success: true,
        message: "Book has been inserted"
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err.message
      });
    });
};

/* GET ALL */
exports.index = async (req, res) => {
  await Book.find()
    .then((records) => {
      res.json({
        success: true,
        records: records.length > 0 ? records : "No records"
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err.message
      });
    });
};

/* GET BY ID */
exports.show = async (req, res) => {
  await Book.findById(req.params.id)
    .then((records) => {
      res.json({
        success: true,
        records: records || "No records"
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err.message
      });
    });
};

/* UPDATE */
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  await Book.findByIdAndUpdate(id, { title, author, price })
    .then(() => {
      res.json({
        success: true,
        message: "Book has been updated"
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err.message
      });
    });
};

/* DELETE */
exports.destroy = async (req, res) => {
  const { id } = req.params;

  await Book.findByIdAndDelete(id)
    .then(() => {
      res.json({
        success: true,
        message: "Book has delete"
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err.message
      });
    });
};
