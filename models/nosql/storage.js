const mongoose = require('mongoose'); //*Siempre se va a requerir mongoose
const mongooseDelete = require('mongoose-delete');

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        // *Ponlo tal y como esta en esta parte
        timestamps:true , //createAt, UpdateAt
        versionKey: false
    }
);

StorageScheme.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("storages", StorageScheme) //*Exporta el modelo de mongose con el nombre y su esquema