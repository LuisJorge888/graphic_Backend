const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.2')

client.on('connect', function () {
  console.log("Mqtt connect");
  //client.subscribe('demo', function (err) {
  //  if (!err) {
  //    client.publish('demo', 'Hello mqtt')
  //  }
  //})
})

client.on('error', (err) => {
  console.log(err)
})

client.on('message', function (topic, message) {
  console.log(message.toString())
  client.end()
})

client.notificarNewTopic = (topic) => {
  client.publish("newTopic", 
  `{
    "to_id": ${topic.to_id},
    "to_name": "${topic.to_name}", 
    "to_value": ${topic.to_value},
    "to_update_at": "${topic.to_update_at}",
    "to_va_id": 0
  }`);

}

module.exports = {
    client
}