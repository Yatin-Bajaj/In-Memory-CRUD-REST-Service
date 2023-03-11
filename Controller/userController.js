const { v4: uuidv4 } = require("uuid");

const User = require("../Model/User");
const userData = require("../Data/userData");
const sortUsersByLogin = require("../utils/sortUsersByLogin");

exports.getUsers = (req, res, next) => {
    const user = userData.filter((user) => user.isDeleted);
    res.json(user);
};

exports.getUserById = (req, res, next) => {
    const userId = req.userId;
    const user = userData.find((user) => userId === user.id);
    res.json(user);
};

exports.postUser = (req, res, next) => {
    const id = uuidv4();
    const { login, password, age, isDeleted } = req?.body;
    console.log(`age type: ${typeof age}`);
    console.log(`isDeleted type: ${typeof isDeleted}`);

    const newUser = new User(id, login, password, age, isDeleted);
    userData.push(newUser);
    res.json(newUser);
};

exports.updateUser = (req, res, next) => {
    const userId = req?.params?.userId.trim();
    const { login, password, age, isDeleted } = req?.body;
    const userIndex = userData.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        res.json("oops! user not found........");
    }

    userData[userIndex].login = login;
    userData[userIndex].password = password;
    userData[userIndex].age = age;
    userData[userIndex].isDeleted = isDeleted;

    res.json(userData[userIndex]);
};

exports.deleteUser = (req, res, next) => {
    const userId = req?.params?.userId;
    console.log(userId);
    const userIndex = userData.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        res.json("oops! user not found........");
    }
    userData[userIndex].isDeleted = !userData[userIndex].isDeleted;
    res.json("from delete user");
};

exports.getAutoSuggestUsers = (req, res, next) => {
    const { loginSubstring, limit } = req.query;
    if (!loginSubstring || !limit) {
        res.json("Please insert poper query");
    }

    const users = sortUsersByLogin(userData);
    const updatedLimit = Math.min(Number(limit), users.length);
    const regex = new RegExp(`${loginSubstring}`, "g");

    const sugestedUserArray = [];
    users.forEach((user) => {
        if (sugestedUserArray.length === updatedLimit) return;
        const match = user.login.match(regex);
        if (match) {
            sugestedUserArray.push(user);
        }
    });
    console.log(sugestedUserArray);
    res.json(sugestedUserArray);
};
