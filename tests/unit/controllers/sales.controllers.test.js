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
    sinon.stub(salesServices, "cadastroVenda").resolves(arrayTest);

    // act
    await salesController.inserirSales(req, res);

    // assert
    // expect(res.status).to.be.equal('message');
    // expect(res.json).to.have.been.calledWith(products);
  });
});
