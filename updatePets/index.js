
// const { v4: uuid } = require('uuid');
const dynamoose = require('dynamoose');
const petsModel = require('./pets.schema.js');


exports.handler = async (event) => {

  let data;
  let id = event.pathParameters && event.pathParameters.id;
  
  if(id) {
      data = await petsModel.query('id').eq(id).exec();
    }
  let retreivedData = JSON.stringify(data);
  let retName = retreivedData.name;
  let retType = retreivedData.type;


  try {    
    const { name, type } = JSON.parse(event.body);
    if(!name) {
      data = await petsModel.update({ id, retName, type });
    } else if(!type) {
      data = await petsModel.update({ id, name, retType });
    } else {
      data = await petsModel.update({ id, name, type });
    }

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