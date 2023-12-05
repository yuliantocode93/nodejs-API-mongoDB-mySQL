const router = require("express").Router();
const Product = require("./model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploads = multer({ dest: "uploads" });

// POST
router.post("/product", uploads.single("image"), async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(400).send("Image not found");
  }
});

// GET all products
router.get("/product", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET a product by ID
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

// UPDATE a product
router.put("/product/:id", uploads.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file;

    const updatedProduct = await Product.update(
      {
        users_id,
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    if (updatedProduct) {
      res.json({
        status: "OK",
        messages: "Product successfully updated",
        data: updatedProduct,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

// DELETE a product
router.delete("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });

    if (deletedProduct) {
      res.json({
        status: "OK",
        messages: "Product successfully deleted",
        data: deletedProduct,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

module.exports = router;
