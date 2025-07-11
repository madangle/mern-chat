const express = require("express");
const router = express.Router();

const {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat
} = require("../controllers/chatController");

router.route("/").post(getChats);
router.route("/").post(createChat);
router.route("/:id").get(getChat);
router.route("/:id").put(updateChat);
router.route("/:id").delete(deleteChat);

module.exports = router;
