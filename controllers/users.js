const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { encrypt, compare } = require("../utils/handlePassword");


const ENGINE_DB = process.env.ENGINE_DB;


/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await usersModel.findAllData({});
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un item
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await usersModel.findOne({id});
        res.send({ data });
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * insertar un item 
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await usersModel.create(body);

        dataUser.set("password", undefined, { strict: false });
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
        };
        res.status(201);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/**
 * actualizar un item
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const idUser = await usersModel.findOneAndUpdate(
            id, body
        );
        const data = await usersModel.findOne({idUser});
        res.status(200);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_UPDATE_ITEMS");
    }
};

/**
 * eliminar un item
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        let { id } = req;
        if (ENGINE_DB === "nosql") {
            id = {_id: id}
        }
        const deleteResponse = await usersModel.deleteOne(id);
        const data = {
            deleted: deleteResponse.matchedCount
        }
        res.status(200);
        res.send({ data });
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }