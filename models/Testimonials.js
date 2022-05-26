import db from "../config/db.js";
import Sequelize from "sequelize";

export const Testimonials = db.define("testimonials", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    }
});

