const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */


const checkRol =(roles) => (req, res, next)=>{
    try {
        const {user} = req;
        console.log(user)
        const rolerByUser = user.role; 
        const checkValueRol = roles.some((rolSingle)=> rolerByUser.includes(rolSingle));
        if(!checkValueRol){
            handleHttpError(res, "Error_NOT_PERMISSIONS", 403);
            return
        }
        next();

    } catch (e) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = {checkRol};