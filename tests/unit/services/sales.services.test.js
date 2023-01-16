const { expect } = require("chai");
const sinon = require("sinon");
const { salesServices } = require("../../../src/services");
const { salesModel } = require("../../../src/models");

const { message, testeService } = require("./mocks/sales.service.mock");
describe("Inserir produto", () => {
  it("Inserir produto", async function () {
    // arrange
    const objTest = [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    sinon.stub(salesModel, "cadastroVenda").resolves([testeService]);
    // act
    const result = await salesServices.cadastroVenda(objTest);

    // assert
    expect(result.type).to.be.equal(null);
    expect(result.message[0].message).to.be.equal(message);
  });
});
