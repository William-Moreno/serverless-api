'use strict';

const superagent = require('superagent');
const apiUrl = 'https://aok7i852b5.execute-api.us-west-2.amazonaws.com/beta';

let tempId;

describe('Testing serverless API routes', () => {
  it('Should return a list of records using GET /pets', async () => {
    const response = await superagent.get(`${apiUrl}/pets`);

    expect(response.body.length).toBeTruthy();
    expect(response.body[0].name).toEqual('Sparky');
  });

  it('Should return a specific record when provided an id using GET /pets/id', async () => {
    const response = await superagent.get(`${apiUrl}/pets/293`);

    expect(response.body[0].name).toEqual('Flerken');
  });

  it('Should create and add a record to the database using POST /pets', async () => {
    const response = await superagent.post(`${apiUrl}/pets`).send({
      name: 'Tweety',
      type: 'Bird',
    });
    tempId = response.body.id;

    expect(response.body.name).toEqual('Tweety');
    expect(response.body.id).toBeTruthy();
  });

  it('Should update record in the database when provided an id using PUT /pets/id', async () => {
    const response = await superagent.put(`${apiUrl}/pets/${tempId}`).send({
      name: 'Blue',
      type: 'Bird',
    });

    expect(response.body.id).toEqual(tempId);
    expect(response.body.name).toEqual('Blue');
  });

  it('Should remove a record from the database with an id using DELETE /pets/id', async () => {
    const response = await superagent.delete(`${apiUrl}/pets/${tempId}`);

    expect(response.body).toBeFalsy();
  });
});