const Mytoken = artifacts.require("MyToken");

module.exports = (deployer) => {
    deployer.deploy(Mytoken);
};
