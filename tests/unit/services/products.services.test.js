const { expect } = require("chai");
const sinon = require("sinon");
const { productsServices } = require("../../../src/services");
const { productsModel } = require("../../../src/models");

const { testeService, messageById } = require("./mocks/products.service.mock");

describe("Verificando service pessoa passageira", function () {
  describe("listagem de pessoas passageiras", function () {
    it("retorna a lista completa de pessoas passageiras", async function () {
      // arrange
      sinon.stub(productsModel, "findAll").resolves(testeService);

      // act
      const result = await productsServices.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(testeService);
    });
    it("retorna a lista produtos por id", async function () {
      // arrange
      sinon.stub(productsModel, "findById").resolves(testeService);
      // act
      const result = await productsServices.findById(1);
      const { message } = result;

      // assert
      expect(result.type).to.be.equal(null);
      expect(message.message[0]).to.deep.equal(messageById[0]);
    });
    it("erro ao usar id inexistente", async function () {
      // arrange
      sinon.stub(productsModel, "findById").resolves();
      // act
      const result = await productsServices.findById(5);
      // const { message } = result;

      // assert
      expect(result.type).to.be.equal("ID_NOT_INCLUSE");
      // expect(result.message).to.deep.equal(testeService);
    });
    it("Inserir produto", async function () {
      // arrange
      const name = { name: "Lucas" };

      sinon.stub(productsModel, 'insert').resolves(testeService[0]);
      sinon.stub(productsModel, 'findById').resolves(testeService[0]);
      // act
      const result = await productsServices.insert(name);
      // const { message } = result;

      // assert
      expect(result.type).to.be.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
