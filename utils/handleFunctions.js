const ENGINE_DB = process.env.ENGINE_DB;
const getFunctions = ({modelo, id, parse}) => {
    
    if(ENGINE_DB === 'nosql'){
        const data = {
            find: modelo.find(),
            findById: modelo.findById(id),
            deleteOne: modelo.deleteOne({id})
        }
        return data;
    } else if(ENGINE_DB === 'mysql'){
        const data = {
            find: modelo.findAll(),
            findById : modelo.findOne({id: id}),
            deleteOne: modelo.destroy({where:{id: `${parse}`}})
        }
        return data;
    } else{
        return 'No hay nada';
    }
}

module.exports = getFunctions;