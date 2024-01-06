const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSing } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const { userModel } = require('../models');

/**
 * Encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */

const registerCtrl = async (req, res) => {
    try {
        const originalRequest = matchedData(req);
        req = matchedData(req);

        const user = await userModel.findOne({email: originalRequest.email});

        if(user){
            handleHttpError(res, "USER_ALREADY_EXIST", 409);
            return
        }

        const password = await encrypt(req.password);
        const body = { ...req, password }
        const dataUser = await userModel.create(body);
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await tokenSing(dataUser),
            user: dataUser
        }

        res.send({ data });
    } catch (e) {
        handleHttpError(res, "Error_Register_User")
    }
}

/**
 * Este controlador es el encargo de logear un usuario
 * @param {*} req 
 * @param {*} res 
 */
    
const loginCtrl = async (req, res) => {
    try {
        const body = matchedData(req);
        req = matchedData(req);
        const user = await userModel.findOne({email: body.email});

        if(!user){
            handleHttpError(res, "USER_DOESN'T_EXIST", 404)
            return
        }

        const hashPassword = user.get('password');
        
        const check = await compare(body.password, hashPassword);

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }

        user.set('password', undefined, {strict:false});

        const data = {
            token: await tokenSing(user), 
            user
        }

        res.send({data});
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerCtrl, loginCtrl };