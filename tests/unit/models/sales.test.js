const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const {
  dataSales,
  product,
  resultado,
  resultadoPorId,
} = require("./mocks/sales.model.mock");

const connection = require("../../../src/models/connection");

describe("Teste sales", () => {
  it("teste data", async () => {
    // Arrange
    sinon.stub(connection, "execute").resolves([dataSales]);
    // Act
    const inserId = await salesModel.cadastraDataVenda();
    // Assert
    expect(inserId).to.be.deep.equal(undefined);
  });
  it("teste data", async () => {
    // Arrange
    sinon.stub(connection, "execute").resolves([product]);
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
    // Act
    const inserId = await salesModel.cadastroVenda(objTest);
    const temId = Object.keys(inserId);
    // Assert
    expect(temId[0]).to.be.deep.equal("id");
    expect(inserId.itemsSold).to.be.deep.equal(objTest);
  });
  afterEach(function () {
    sinon.restore();
  });
  it("listar todas as sales", async () => {
    sinon.stub(connection, "execute").resolves([resultado]);

    //act
    const teste = await salesModel.listaTodasSales();
    const { date } = teste[0];

    expect(date).to.be.deep.equal("2023-01-17T01:35:43.000Z");
  });
  it("listar todas as sales por id", async () => {
    sinon.stub(connection, "execute").resolves([resultadoPorId]);

    //act
    const teste = await salesModel.findSaleById(1);
    // const { date } = teste[0];
    const { date } = teste[0];

    expect(date).to.be.deep.equal("2023-01-16T22:35:43.000Z");
  });

  it("listar todas as saless", async () => {
    sinon.stub(connection, "execute").resolves([resultado]);

    //act
    const salesProduct = await salesModel.selecionarSalesProduct();
    // const sales = await salesModel.selecionarSales();
    const result = await salesModel.criarObjResposta(
      [{ id: 1, date: "2023-01-17T01:35:43.000Z" }],
      [salesProduct[0]]
    );

    const arrays = {
      saleId: 1,
      date: "2023-01-17T01:35:43.000Z",
      productId: 1,
      quantity: 5,
    };

    expect(salesProduct[0]).to.be.deep.equal(arrays);
  });

  // const listaTodasSales = async () => {
  //   // console.log(salesProduct);
  //   const sales = await selecionarSales();
  //   const salesProduct = await selecionarSalesProduct();
  //   const obj = await criarObjResposta(sales, salesProduct);
  //   return obj;
  // };
});
