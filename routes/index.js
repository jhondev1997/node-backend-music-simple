const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName)=>{
    // Todo: tracjs.js [tracks, js]
    return fileName.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file); //Todo: indexm trackss

    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`)) //Todo http://localhost:3000/
    }
})

module.exports = router;