const dynamoose = require('dynamoose');


const petsSchema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'type': String,
});

module.exports = dynamoose.model('pets', petsSchema);