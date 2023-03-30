const { v4: uuidv4 } = require("uuid");
import type { Request, Response } from "express";
import { User, UserSchema } from "../Model/UserCopy";
const userData = require("../Data/userData");

const isDeleted = false;

const findUser = (userId: string) => {
    const userIndex = userData.findIndex(
        (user: UserSchema) => user.id === userId
    );
    return userIndex;
};

const isLoginExist = (login: string) => {
    const userIndex = userData.findIndex(
        (user: UserSchema) => user.login === login
    );
    return userIndex;
};

exports.getUsers = (req: Request, res: Response) => {
    const user = userData.filter((user: UserSchema) => !user.isDeleted);
    return res.status(200).json(user);
};

exports.getUserById = (req, res) => {
    const userId = req?.params?.userId.trim();
    const userIndex = findUser(userId);
    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }
    return res.status(200).json(userData[userIndex]);
};

exports.postUser = (req, res) => {
    const id = uuidv4();
    const { login, password, age } = req?.body;
    if (isLoginExist(login) !== -1) {
        return res.status(404).json("Email already exist.....");
    }
    const newUser = new User(id, login, password, age, isDeleted);
    userData.push(newUser);
    return res.status(200).json(newUser);
};

exports.updateUser = (req, res) => {
    const userId = req?.params?.userId.trim();
    const userIndex = findUser(userId);
    if (userIndex === -1) {
        return res.status(404).json("oops! user not found........");
    }
    userData[userIndex] = { ...userData[userIndex], ...req.body };
    return res.json(userData[userIndex]);
};

exports.deleteUser = (req, res) => {
    const userId = req?.params?.userId;
    const userIndex = findUser(userId);
    if (userIndex === -1) {
        return res.status(404).json("oops! user not found........");
    }
    userData[userIndex].isDeleted = true;
    return res.json(`User Deleted with id ${userId}`);
};

exports.getAutoSuggestUsers = (req, res) => {
    const { loginSubstring = "", limit = 10 } = req.query;

    const updatedLimit = Math.min(Number(limit), userData.length);

    const sugestedUserArray: UserSchema[] = [];

    userData.forEach((user: UserSchema) => {
        if (sugestedUserArray.length === updatedLimit) return;
        const match = user.login.includes(loginSubstring) && !user.isDeleted;
        if (match) {
            sugestedUserArray.push(user);
        }
    });
    sugestedUserArray.sort((a: UserSchema, b: UserSchema): number => {
        return a.login.localeCompare(b.login);
    });
    return res.json(sugestedUserArray);
};
