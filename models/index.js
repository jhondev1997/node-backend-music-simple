/* 
*Cada carpeta que se quiera exportar y simplificar
*Siempre debe tener un index (como este)
*Y en el exportar la funcion, elemento, etx, con el mismo nombre de la carpeta
*/

const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = (ENGINE_DB == 'nosql') ? './nosql' : './mysql';

const models = {
    userModel: require(`${pathModels}/users`),
    tracksModel: require(`${pathModels}/tracks`),
    storageModel: require(`${pathModels}/storage`),
}

module.exports = models; //*siempre exportarlo 