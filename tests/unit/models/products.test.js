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
    sinon.stub(connection, "execute").resolves([[modelMock][0]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(modelMock[0]);
  });
  it("Adicionar na lista", async () => {
    // Arrange
    const name = { name: "Lucas" };
    sinon.stub(connection, "execute").resolves([modelMock]);
    // Act
    const result = await productsModel.insert(name);
    // Assert
    expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
  });
  it("Alterar produto", async () => {
    sinon.stub(connection, "execute").resolves([modelMock]);
    // Act
    await productsModel.atualizarProducts("Armadura Homem de Ferro", 3);
    // Assert
    expect(modelMock[3].name).to.be.deep.equal("Armadura Homem de Ferro");
  });
  afterEach(function () {
    sinon.restore();
  });
});
