const { v4: uuidv4 } = require("uuid");
import type { Request, Response } from "express";
import {User,UserSchema} from "../Model/UserCopy"
const userData = require("../Data/userData");
const sortUsersByLogin = require("../utils/sortUsersByLogin");

exports.getUsers = (req: Request, res: Response, next) => {
    const user = userData.filter((user:UserSchema) => !user.isDeleted);
    return res.status(200).json(user);
};

exports.getUserById = (req, res, next) => {
    const userId = req.userId;
    const user = userData.find((user) => userId === user.id);
    return res.status(200).json(user);
};

exports.postUser = (req, res, next) => {
    const id = uuidv4();
    const { login, password, age, isDeleted } = req?.body;
    const newUser = new User(id, login, password, age, isDeleted);
    userData.push(newUser);
    return res.status(200).json(newUser);
};

exports.updateUser = (req, res, next) => {
    const userId = req?.params?.userId.trim();
    const { login, password, age, isDeleted } = req?.body;
    const userIndex = userData.findIndex((user:UserSchema) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json("oops! user not found........");
    }
    const updatedUser = { login, password, age, isDeleted };
    userData[userIndex] = { ...userData[userIndex], ...updatedUser };
    return res.json(userData[userIndex]);
};

exports.deleteUser = (req, res, next) => {
    const userId = req?.params?.userId;
    console.log(userId);
    const userIndex = userData.findIndex((user:UserSchema) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json("oops! user not found........");
    }
    userData[userIndex].isDeleted = !userData[userIndex].isDeleted;
    return res.json("from delete user");
};

exports.getAutoSuggestUsers = (req, res, next) => {
    const { loginSubstring, limit } = req.query;
    if (!loginSubstring || !limit) {
        res.json("Please insert poper query");
    }

    const users = sortUsersByLogin(userData);
    const updatedLimit = Math.min(Number(limit), users.length);
    const regex = new RegExp(`${loginSubstring}`, "g");

    const sugestedUserArray:UserSchema[] = [];
    users.forEach((user:UserSchema) => {
        if (sugestedUserArray.length === updatedLimit) return;
        const match = user.login.match(regex);
        if (match) {
            sugestedUserArray.push(user);
        }
    });
    console.log(sugestedUserArray);
    return res.json(sugestedUserArray);
};
