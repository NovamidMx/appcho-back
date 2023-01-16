const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:3, max:99}),
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("id")
    .exists()
    .notEmpty(),
    check("name")
    .exists()
    .notEmpty(),
    check("age")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty(),
    check("password")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem };