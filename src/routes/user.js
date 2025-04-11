const { Router } = require("express");
const { register, login } = require("../controllers/user");
const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validations/userValidation");

const router = Router();
router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);

module.exports = router;
