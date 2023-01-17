const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { objResult, objTest } = require("./mocks/sales.controllers.mocks");

describe("Testando salesController", () => {
  it("Deve retornar o status 201 e a lista", async function () {
    // arrange
    const res = {};
    const arrayTest = [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const req = {
      body: arrayTest,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesServices, "listaTodasSales").resolves(arrayTest);

    // act
    await salesController.inserirSales(req, res);

    // // assert
    // expect(teste).to.be.equal('message');
    expect(res.status).to.have.been.calledWith(201);
  });
  it("Deve listar todas sales", async function () {
    // arrange
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesServices, "").resolves();

    // act
    await salesController.listaTodasSales(req, res);

    // // assert
    expect(res.status).to.have.been.calledWith(200);
  });
  it("Procurar sales por id", async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        id: 2,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesServices, "").resolves();

    // act
    await salesController.findSaleById(req, res);

    // // assert
    expect(res.status).to.have.been.calledWith(200);
  });
  it("Procurar sales por id errado", async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        id: 99,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesServices, "").resolves();

    // act
    await salesController.findSaleById(req, res);

    // // assert
    expect(res.status).to.have.been.calledWith(404);
  });
});
