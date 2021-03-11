
// const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const petsModel = require('./pets.schema.js');


exports.handler = async (event) => {

  let data;

  try {

    const { name, phone } = JSON.parse(event.body);
    let idGen = Math.ceil(Math.random() * 1000);
    let id = `${idGen}`;

    let record = new petsModel({ id, name, phone });
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