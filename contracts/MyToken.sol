// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyToken is ERC20 {
    uint8 private _decimal = 5;
    constructor() ERC20 ("DavidToken", "DTN") {
    }   
    function decimals() override public view returns (uint8) {
        return _decimal;
    }
}