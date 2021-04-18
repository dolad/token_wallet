const myToken = artifacts.require('MyToken');
let contractInstance;
contract("myToken", async account => {
    beforeEach(async () => {
       contractInstance = await myToken.deployed()
     })
    it("should return decimal", async () => {
       const returnDecimal = await contractInstance.decimals();
        assert.equal(returnDecimal,10000)
    } )
})