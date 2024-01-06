/*
TODO: Los archivos en controllers solo debe hacer el crud a la base de datos
*/

const { storageModel } = require('../models'); /* todo: Esto funciona siempre y cuando la carpeta tenga un index, y este exporte cualquier elemento con el mismo nombre de la carpeta*/
const { handleHttpError } = require("../utils/handleError");
const { matchedData, body } = require("express-validator");
const fs = require('fs');
const getFunctions = require('../utils/handleFunctions');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/*
* Obtener lista de la base de datos!
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {
    /* Debe tener algo tu solicitud o dará error*/
    try {
        const functionId = getFunctions({modelo:storageModel});
        const data = await functionId.find;
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'Error_List_Items')
    }
};

/*
* Obtener un detalle
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const getFindId = getFunctions({modelo:storageModel, id: id});
        const data = await getFindId.findById;
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DETAIL_ITEM-Storage")
    }
};

/*
* Insertar un registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    try {
        const { body, file } = req
        const fileData = {
            url: `${PUBLIC_URL}/${file.filename}`,
            filename: file.filename
        }
        const data = await storageModel.create(fileData);
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM-Storage")
    }
};

/*
* Axtualizar un registro
* @param {*} req
* @param {*} res
*/
// const updateItem = async(req, res)=>{};

/*
* Eliminar un registro
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        // const dataFile = await storageModel.findById(id);
        const getFindId = getFunctions({modelo:storageModel, id: id});
        const dataFile = await getFindId.findById;
        
        // await storageModel.deleteOne(id);
        // await storageModel.destroy({where: {id: id}})
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        
        await getFunctions({modelo:storageModel, id: id, parse: id});

        const data = {
            filePath,
            delete: 1
        }

        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_DETAIL_ITEM-Storage")
        console.log(e)
    }
};

module.exports = ({ getItems, getItem, createItem, deleteItem });