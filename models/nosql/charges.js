const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const chagerScheme = new mongoose.Schema(
    {
        charge: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);
// UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("charges", chagerScheme);