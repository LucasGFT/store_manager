const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require("../../../src/models");
const modelMock = require("./mocks/products.model.mock");

const connection = require("../../../src/models/connection");

describe("Teste de lista de produtos", () => {
  it("Recuperando lista de produtos", async () => {
    // Arrange
    sinon.stub(connection, "execute").resolves([modelMock]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(modelMock);
  });
  it("Recuperando lista a partir de um id", async () => {
    // Arrange
    console.log("sasas");
    sinon.stub(connection, "execute").resolves([[modelMock][0]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(modelMock[0]);
  });
  afterEach(function () {
    sinon.restore();
  });
});
