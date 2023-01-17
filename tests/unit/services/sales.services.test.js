const { expect } = require("chai");
const sinon = require("sinon");
const { salesServices } = require("../../../src/services");
const { salesModel } = require("../../../src/models");

const { message, testeService, resultado } = require("./mocks/sales.service.mock");
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
  it("listar produtos", async function () {
    // arrange
    sinon.stub(salesModel, "listaTodasSales").resolves(resultado);
    // act
    const { type, message } = await salesServices.listaTodasSales();

    // assert
    expect(type).to.be.equal(null);
    expect(message.message[0].saleId).to.be.equal(1);
    // expect(result.message[0].message).to.be.equal(message);
  });
  it("listar produtos por id", async function () {
    // arrange

    sinon.stub(salesModel, "findSaleById").resolves(resultado);
    // act
    const { type, message } = await salesServices.findSaleById(1);

    // assert
    // expect(type).to.be.equal(null);
    expect(message.message[0].date).to.be.equal("2023-01-17T01:35:43.000Z");
    // expect(result.message[0].message).to.be.equal(message);
  });
});
