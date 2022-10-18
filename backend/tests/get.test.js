const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('Quando envio uma requisição GET /contacts', () => {

  let res

  before(async () => {
    var server = await init();

    res = await server.inject({
      method: 'get',
      url: '/contacts'
    })

  })

  it('Deve retornar status code 200', async () => {
    expect(res.statusCode).to.equal(200);
  })

  it('Deve retornar um array', async () => {
    expect(res.result).to.be.array();
  })

})