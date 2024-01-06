const mongoose = require("mongoose"); //*siempe se va a requerir
const mongooseDelete = require('mongoose-delete');

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    // *Ponlo tal y como esta en esta parte
    versionKey: false,
    timestamps: true,
  }
);

/**
 * implementar método propio con relacion a storage
*/

TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      }
    },
    {
      $unwind: "$audio"
    }
  ])
  return joinData;
};

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      }
    },
    {
      $unwind: "$audio"
    }
  ])
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme); //*Exporta el modelo de mongose con el nombre y su esquema