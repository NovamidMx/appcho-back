const { matchedData } = require("express-validator");
const { clientsModel } = require("../models");
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
        const data = await clientsModel.findAllData({});
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
        const data = await clientsModel.findOne({id});
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
    console.log(req);
    try {
        req = matchedData(req);
        const body = { ...req };
        console.log(body);
        const dataClient = await clientsModel.create(body);

        const data = {
            client: dataClient,
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
        const idClient = await clientsModel.findOneAndUpdate(
            id, body
        );
        const data = await clientsModel.findOne({idClient});
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
        const deleteResponse = await clientsModel.deleteOne(id);
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