import { DataTypes } from "sequelize";
import User from "./User.js"
import db from "../db/conn.js"

const Coment = db.define("Coment", {
    title: {
        type: DataTypes.STRING,
        required: true,
    },
    content: {
        type: DataTypes.STRING,
        required: true,
    }
})

Coment.belongsTo(User)
User.hasMany(Coment)

export default Coment