const MyToken = artifacts.require('MyToken');
const toWei = require('../helper.js');
const { expectRevert, constants } = require('@openzeppelin/test-helpers')

contract("myToken", async account => {
    let contractInstance;
    const token = 'DTN';
    const globalname= 'DavidToken';
    const allocate_token= 1000000000;
    const deployer = account[0];
    const reciever = account[1];
    const nilAddress = account[7];
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
        const totalSupply = await contractInstance.totalSupply();
         assert.equal( totalSupply.toString(), toWei(allocate_token));
     });
    it("allocates the initial supply to minter deployment", async () => {
        const deployerBalance = await contractInstance.returnOwnerBalance();
        const totalSupply = await contractInstance.totalSupply();
         assert.equal(deployerBalance.toString(), totalSupply.toString());
     });
     it("test revert  for transfer higher than sender balance", async () => {
        await expectRevert.unspecified(contractInstance.transfer(account[1], 4452453656354631, {from:account[0]}));
     });
     it("test revert for transfer higher than sender balance", async () => {
        await expectRevert.unspecified(
            contractInstance.transfer(constants.ZERO_ADDRESS, 456345, { from: account[0] })
          );
    });
    it("returns a zero balance for accont that has no transefer to it", async () => {
        const balance = await contractInstance.balanceOf(nilAddress);
        assert.equal(balance.toString(),0)
    });
    it("returns of createor", async () => {
        const balance = await contractInstance.returnOwnerBalance();
        assert.equal(balance.toString(), toWei(allocate_token))
    });
    it("returns token amount transfer to it", async () => {
        const amount = toWei(500);
        await contractInstance.transfer(reciever, amount);
        const balance = await contractInstance.balanceOf(reciever);
        assert.equal(balance.toString(), amount)
    });
    it("returns should not allow me to send token to myself", async () => {
        const amount = toWei(500);
        await expectRevert.unspecified(contractInstance.transferFrom(deployer, deployer, amount)); 
    });
    it("returns should not allow sending token users dont have", async () => {
        const recieved = toWei(10);
        const sent = toWei(30)
        await contractInstance.transfer(reciever, recieved);
        await expectRevert.unspecified(contractInstance.transferFrom(reciever, deployer, sent)); 
    });

    it('it should emit a Transfer Event', async () => {
        const amount = toWei(10);
        const { logs } = await contractInstance.transfer(reciever, amount , {from:deployer});
        assert.equal(logs.length, 1, 'No Transfer Event emitted');
        assert.equal(logs[0].event, 'CustomTransfer');
        assert.equal(logs[0].args._from, deployer);
        assert.equal(logs[0].args._to, reciever);
        assert.equal(logs[0].args._amount, amount);
      });

})