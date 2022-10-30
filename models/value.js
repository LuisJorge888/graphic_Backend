const { DataTypes, Model } = require('sequelize');
const { db } = require("../database/conexion");

class Value extends Model {

    static classLevelMethod() {
        return 'Values';
    }

    static async createValue({ va_to_id, va_value }) {

        const newValue = await Value.create({ va_to_id, va_value });

        if (newValue.validate()) {
            return await newValue.save();
        }
        console.error(newValue);
        return null;
    }

    static async getValueById(idValue) {

        const value = await Value.findByPk(idValue);
        if (value == null) {
            return false;
        }
        return value;
    }
}

Value.init({
    va_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    va_to_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    va_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    sequelize: db, // We need to pass the connection instance
    modelName: 'Value', // We need to choose the model name
    tableName: 'Values',
    createdAt: 'va_date',
    updatedAt: false,
    deletedAt: false
});

module.exports = Value;