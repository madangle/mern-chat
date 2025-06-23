const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
} = require("../controllers/userController");

const { registerSchema } = require('../validators/userValidator');
const validate = require('../middlewares/validateRequest');

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/").post(validate(registerSchema), createUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/login").post(login);

module.exports = router;