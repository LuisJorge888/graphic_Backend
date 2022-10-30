const { client } = require('./../mqtt/index');
const Topic = require('../models/topic');

async function createTopic(req, res, next) {

    let newTopic = await Topic.createTopic(req.body);
    if(newTopic){
        client.notificarNewTopic(newTopic);
    }
    sendResponseJson(newTopic, res);
}

async function getAllTopics(req, res, next) {

    const topics = await Topic.getAllTopics();

    sendResponseJson(topics, res);
}

async function getTopicById(req, res, next) {

    let idTopic = req.params.id;

    const topic = await Topic.getTopicById(idTopic);

    if (topic) {

        let value = await topic.getActualValue();
        if (value) {
            topic.value = {
                value: value.va_value,
                date: value.va_date
            }
        }

        body = topic.toPublicData();
    } else {
        body = {
            "msg": "No existe topic con id " + idTopic
        }
    }
    sendResponseJson(body, res);
}

async function sendResponseJson(body, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
}

module.exports = {
    createTopic,
    getAllTopics,
    getTopicById
}