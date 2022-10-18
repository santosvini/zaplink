const Code = require("@hapi/code");
const Lab = require("@hapi/lab");

const { init } = require("../server");

const { expect } = Code;
const { before, describe, it } = (exports.lab = Lab.script());

describe("DELETE /contacts", () => {

  describe("Dado que eu tenho um contato indesejado", () => {
    
    const contact = {
      name: "Joaquim xavier",
      number: "11999998888",
      description: "Corretoe de imóveis",
    }

    let resp
    let server
    let contactId

    before(async() => {
      server = await init();

      resp = await server.inject({
        method: 'post',
        url: '/contacts',
        payload: contact,
      })

      contactId = resp.result._id;

    })

    it('Quando eu apago o contato', async () => {
      resp = await server.inject({
        method: 'delete',
        url: '/contacts/' + contactId,
      })
    })

    it('Deve retornar o código 204', () => {
      expect(resp.statusCode).to.equal(204);
    })

  })

})