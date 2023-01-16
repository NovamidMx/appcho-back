const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const roleScheme = new mongoose.Schema(
    {
        role: {
            type: ["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
// UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("roles", roleScheme);