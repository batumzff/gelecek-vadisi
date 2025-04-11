const router = require("express").Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const {
  productSchema,
  productUpdateSchema,
  validateParamsIdSchema,
  getProductsSchema,
} = require("../validations/productValidation");

const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");

router.get(
  "/",
  authenticate,
  validate({ query: getProductsSchema }),
  getProducts
);
router.get(
  "/:id",
  authenticate,
  validate({ params: validateParamsIdSchema }),
  getProductById
);
router.post(
  "/",
  authenticate,
  validate({ body: productSchema }),
  createProduct
);
router.put(
  "/:id",
  authenticate,
  validate({ params: validateParamsIdSchema, body: productUpdateSchema }),
  updateProduct
);
router.delete("/:id", authenticate, deleteProduct);

module.exports = router;
