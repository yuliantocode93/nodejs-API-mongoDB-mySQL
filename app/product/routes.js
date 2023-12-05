const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productControler = require("./controler");

router.get("/product", productControler.index);
router.get("/product/:id", productControler.view);
router.post("/product/", upload.single("image"), productControler.store);
router.put("/product/:id", upload.single("image"), productControler.update);
router.delete("/product/:id", upload.single("image"), productControler.destroy);
module.exports = router;
