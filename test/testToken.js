const myToken = artifacts.require('MyToken');
let contractInstance;
contract("myToken", async account => {
    beforeEach(async () => {
       contractInstance = await myToken.deployed()
     })
     it("should return the name", async () => {
        const returnName = await contractInstance("David");
         assert.equal(returnName, "David")
     } );
     it("should return the tokenName", async () => {
        const returnName = await contractInstance("TKN");
         assert.equal(returnName, "TKN")
     } );
    it("should return decimal", async () => {
       const returnDecimal = await contractInstance.decimals();
        assert.equal(returnDecimal,10000)
    } );
})