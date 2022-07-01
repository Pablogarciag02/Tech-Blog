const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model { }

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        post_id: {
            type: DataTypes.INTEGER,
            references: {
                table: "posts",
                field: "id",
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                table: "user",
                field: "id",
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comments"
    }
);

module.exports = Comments;