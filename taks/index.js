const { client } = require('./../mqtt/index');
const { getAllTopics } = require('../models/topic');
const Value = require('../models/value');

function generateNewValues(){

    getAllTopics().then(topics => {
        topics.forEach(topic => {
            console.log(topic.to_name);
            let positive = Math.floor(Math.random() * 10) + 1;
            let negative = Math.floor(Math.random() * -10) + 1;

            let data = {
                va_to_id: topic.to_id,
                va_value: negative + positive,
            }

            Value.createValue(data).then((newRecord) => {
                topic.setNewValueRef(newRecord).then((topicUpdate) => {
                    client.publish(topicUpdate.to_id.toString(), topicUpdate.to_value.toString())
                })
                
            });

        })
    })
}   

module.exports = {
    generateNewValues
}