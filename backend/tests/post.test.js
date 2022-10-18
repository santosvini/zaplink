const Code = require("@hapi/code");
const Lab = require("@hapi/lab");

const { init } = require("../server");

const { expect } = Code;
const { before, describe, it } = (exports.lab = Lab.script());

describe("POST /contacts", () => {
  let resp;

  describe("Quando o payload é nulo", () => {
    before(async () => {
      var server = await init()

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: null,
      });
    });

    it("Deve retornar status code 400", async () => {
      expect(resp.statusCode).to.equal(400);
    });
  });

  describe("Quando o payload é bonito", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Emerson Sheik",
        number: "47956231025",
        description: "Atacante do Bangu",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 200", async () => {
      expect(resp.statusCode).to.equal(200);
    });

    it("Deve retornar o ID do contato", async () => {
      expect(resp.result).to.be.a.object();
      expect(resp.result._id.toString().length).to.equal(24);
    });
  });

  describe("Quando envio uma requisição POST sem nome", () => {
    before(async () => {
      var server = await init();

      let contact = {
        number: "47956231025",
        description: "Atacante do Bangu",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Name is required");
    })

  });

  describe("Quando o nome está em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "",
        number: "47956231025",
        description: "Atacante do Bangu",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Name is required");
    })

  });

  describe("Quando envio uma requisição POST sem whastapp", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Vini Santos",
        description: "QA & Front End",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Number is required");
    })

  });

  describe("Quando o whastapp está em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Vini Santos",
        number: "",
        description: "Atacante do Bangu",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Number is required");
    })

  });

  describe("Quando envio uma requisição POST sem description", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Vini Santos",
        number: "47956231025",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Description is required");
    })

  });

  describe("Quando o description está em branco", () => {
    before(async () => {
      var server = await init();

      let contact = {
        name: "Vini Santos",
        number: "55998877655",
        description: "",
      };

      resp = await server.inject({
        method: "POST",
        url: "/contacts",
        payload: contact,
      });
    });

    it("Deve retornar status code 409", async () => {
      expect(resp.statusCode).to.equal(409);
    });

    it('Deve retonar uma mensagem', async () => {
      expect(resp.result.message).to.equal("Description is required");
    })

  });

});