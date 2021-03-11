
// const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const petsModel = require('./pets.schema.js');


exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;
  
  
  try {    
    const { name, type } = JSON.parse(event.body);

    let record = new petsModel({ id, name, type });
    data = await record.save();

  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }

  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  }

  return response;
}