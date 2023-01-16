const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { dataSales, product } = require("./mocks/sales.model.mock");

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
    expect(temId[0]).to.be.deep.equal('id');
    expect(inserId.itemsSold).to.be.deep.equal(objTest);
  });
  afterEach(function () {
    sinon.restore();
  });
});
