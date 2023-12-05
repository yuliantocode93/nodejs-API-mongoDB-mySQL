const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require("path");
const Product = require("./model");

// Create a product
router.post("/product", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    Product.create({
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(400).send("No file uploaded");
  }
});

// Get all products
router.get("/product", (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

// Get a product by ID
router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

// Update a product by ID
router.put("/product/:id", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;

  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);

    Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      },
      { new: true }
    )
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(400).send("No file uploaded");
  }
});

// Delete a product by ID
router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
