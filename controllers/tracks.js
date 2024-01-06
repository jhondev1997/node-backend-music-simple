/*
TODO: Los archivos en controllers solo debe hacer el crud a la base de datos
*/

const { tracksModel } = require('../models'); /* todo: Esto funciona siempre y cuando la carpeta tenga un index, y este exporte cualquier elemento con el mismo nombre de la carpeta*/
const { matchedData, body } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

/*
* Obtener lista de la base de datos!
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    try {
        /* Debe tener algo tu solicitud o dará error*/
        const user = req.user;
        console.log(user)
        const data = await tracksModel.findAllData({});
        res.send({ data, user })
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'Error_Get_Items')
    }

};

/*
* Obtener un detalle
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
};

/*
* Insertar un registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    try {

        const body = matchedData(req);
        const data = await tracksModel.create(body);;
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'Error_Create_Items')
    }
};

/*
* Axtualizar un registro
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => { 
    try {
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({ data });
    } catch (e) {
        handleHttpError(res, 'Error_Update_Items')
    }
};

/*
* Eliminar un registro
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => { 
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
};

module.exports = ({ getItems, getItem, createItem, updateItem, deleteItem });