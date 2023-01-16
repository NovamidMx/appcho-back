const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            select: false
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UserScheme.statics.findAllData = function () {
    const data = this.find({});
    return data;
};

UserScheme.statics.findOneData = function (id) {
    const data = this.findOneData({id});
    return data;
};

// UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserScheme);