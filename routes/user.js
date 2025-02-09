const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleUpdateById, handleDeleteById, handleCreateNewUser } = require('../controllers/user');

const router = express.Router();

//To list all the users
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router.
    route("/:id")

    // TO get the users with their id
    .get(handleGetUserById)

    // TO update users with their id
    .patch(handleUpdateById)

    //To delete the users with their id
    .delete(handleDeleteById);

module.exports = router;