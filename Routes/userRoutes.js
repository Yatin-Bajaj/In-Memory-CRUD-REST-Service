const router = require("express").Router();
const schema = require("../utils/validationSchema");
const { userValidationMiddelware } = require("../utils/validationMiddelware");

const {
    getUsers,
    postUser,
    getAutoSuggestUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../Controller/userController");

router.get("/users", getUsers);

router.get("/user/:userId", getUserById);

router.post(
    "/create-user",
    userValidationMiddelware(schema.bodySchema),
    postUser
);

router.post("/users-suggestion", getAutoSuggestUsers);

router.put("/update-user/:userId", updateUser);

router.delete("/delete-user/:userId", deleteUser);

module.exports = router;