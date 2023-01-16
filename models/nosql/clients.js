const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const ClientsScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        age: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        address: {
            type: String,
        },
        tel: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

ClientsScheme.statics.findAllData = function () {
    const data = this.find({});
    return data;
};

ClientsScheme.statics.findOneData = function (id) {
    const data = this.findOneData({id});
    return data;
};

// UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("clients", ClientsScheme);