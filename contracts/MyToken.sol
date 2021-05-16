// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract MyToken is ERC20 {
    uint8 private _decimal = 5;
    uint256 public allocate_token = 1000000;

    event CustomTransfer (
        address indexed _from,
        address indexed _to,
        uint256 _amount
    );

    event CustomApproval(
        address indexed _owner,
        address indexed _spender,
        uint256 _amount
    );
    mapping(address => uint256) public  balances;
    mapping(address => mapping(address => uint256)) public  allowances;

    constructor() ERC20 ("DavidToken", "DTN") {
        _mint(msg.sender, allocate_token);
    }   
    function decimals() override public view returns (uint8) {
        return _decimal;
    }
    function transfer(address _recipient, uint256 _amount) public override returns (bool success) {
        require(balances[msg.sender] >= _amount, "Insuffient amount from sender");
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
        Transfer(msg.sender, _recipient, _amount);
        return true;
    }
    function transferFrom(address _sender, address _recipient, uint256 _amount) public override returns (bool success) {
        require(balances[_sender] >=  _amount, "Insufficient amount from sender");
        // this specify the amount entitled to spend
        require(_amount <= allowances[_sender][msg.sender]);
        balances[_sender] -= _amount;
        balances[_recipient] += _amount;
        allowances[_sender][msg.sender] -= _amount;
        CustomTransfer(_sender, _recipient, _amount);
        return true;
    }
    function approve(address _spender, uint256 _amount) public override returns (bool success){
        allowances[msg.sender][_spender] = _amount;
        CustomApproval(msg.sender,_spender,_amount);
        return true;
    }
}