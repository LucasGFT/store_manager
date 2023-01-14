const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const {
  products,
  productComId,
} = require("./mocks/products.controllers.mocks");

describe("Teste de unidade do productController", function () {
  describe("Listando as os produtos disponiveis", function () {
    it("Deve retornar o status 200 e a lista", async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findAll")
        .resolves({ type: null, message: products });

      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
    it("Deve retornar o status 200 e a lista", async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findById")
        .resolves({ type: null, message: productComId });

      // act
      await productsController.listProductById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productComId);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
