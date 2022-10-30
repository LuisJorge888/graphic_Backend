const { DataTypes, Model } = require('sequelize');
const { db } = require("../database/conexion");
const Value = require("./value");

class Topic extends Model {

  static classLevelMethod() {
    return 'Topic';
  }

  static async getAllTopics() {
    return await Topic.findAll();
  }

  static async getTopicById(idTopic) {

    const topic = await Topic.findOne({
      where: {
        to_id: idTopic
      },
      include: Value
    });

    if (topic == null) {
      return false;
    }

    if (topic.hasIdValue()) {
      let value = await topic.getActualValue();
      if (value) {
        topic.value = {
          value: value.va_value,
          dateL: value.va_date
        }
      }
    }

    return topic;
  }

  static async createTopic({ topicName: topicName, topicValue }) {

    const newTopic = await Topic.create({ to_name: topicName, to_value: topicValue});

    if (newTopic.validate()) {
      return await newTopic.save();
    }
    console.error(newTopic);
    return null;
  }

  hasIdValue() {
    return this.to_va_id ? true : false;
  }

  setNewValueRef(value) {
    
    this.to_value = this.to_value + value.va_value;
    this.to_va_id = value.va_id;
    return this.save();
  }

  async getActualValue() {

    if (this.to_va_id) {

      let value = await Value.getValueById(this.to_va_id);

      return (value == null) ? false : value;
    }

    return null;
  }

  toPublicData() {
    return {
      to_id: this.to_id,
      to_name: this.to_name,
      to_va_id: this.to_va_id,
      last_update: this.to_update_at,
      value: this.value
    }
  }

}

Topic.init({
  to_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  to_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 240],
    }
  },
  to_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  to_va_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  }
}, {
  sequelize: db, 
  modelName: 'Topic',
  tableName: 'topics',
  createdAt: 'to_create_at',
  updatedAt: 'to_update_at',
  deletedAt: 'to_delete_at'
});

Topic.hasMany(Value, {
  foreignKey: {
    name: "va_to_id"
  },
  allowNull: false,
})

Value.belongsTo(Topic, {
  foreignKey: {
    name: "va_to_id"
  },
  allowNull: true,
})

module.exports = Topic;