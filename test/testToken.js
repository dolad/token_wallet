const MyToken = artifacts.require('MyToken');
contract("myToken", async account => {
    let contractInstance;
    const token = 'DTN';
    const globalname= 'DavidToken';
    const allocate_token= 1000000;
    beforeEach( async () => {
      contractInstance = await MyToken.deployed();
     })
     it("it return the appropraite name ", async () => {
         const name = await contractInstance.name(); 
         assert.equal(name, globalname);
     });
     it("should return the tokenName", async () => {
         const tokenSymbol = await contractInstance.symbol();
         assert.equal(tokenSymbol, token);
     });
    it("should return decimal", async () => {
       const returnDecimal = await contractInstance.decimals();
        assert.equal(returnDecimal.toString(), 5);
    });
    it("should have appropriate totalSupply", async () => {
        const totalSupply = await contractInstance.allocate_token();
         assert.equal(totalSupply.toNumber(), allocate_token);
     });
    it("allocates the initial supply to minter deployment", async () => {
        const deployer = account[0];
        const initialBalance = await contractInstance.balanceOf(deployer);
        const totalSupply = await contractInstance.allocate_token();
         assert.equal(totalSupply.toNumber(), initialBalance.toNumber());
     });
    
})