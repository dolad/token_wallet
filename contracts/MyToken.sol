// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract MyToken is ERC20 {
    uint8 private _decimal = 5;
    uint256 public allocate_token = 1000000000 * 10 ** uint(_decimal);

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
        balances[msg.sender] += allocate_token;  
    } 


    function decimals() override public view returns (uint8) {
        return _decimal;
    }

    function totalSupply() override public view returns (uint) {
        return allocate_token;
    }

    function returnOwnerBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function transfer(address _recipient, uint256 _amount) public override returns (bool success) {
        require(_recipient != address(0), "Error: transfer to the zero address");
        require(balances[msg.sender] >= _amount, 'Error Insufficient balance in the recepient wallet');
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
        emit CustomTransfer(msg.sender, _recipient, _amount);
        return true;
    }
    function transferFrom(address _sender, address _recipient, uint256 _amount) public override returns (bool success) {
        require(balances[_sender] >=  _amount);
        require(_recipient != address(0), "Error: transfer to the zero address");
        require(_amount <= allowances[_sender][msg.sender]);
        balances[_sender] -= _amount;
        balances[_recipient] += _amount;
        allowances[_sender][msg.sender] -= _amount;
        emit CustomTransfer(_sender, _recipient, _amount);
        return true;
    }
    function approve(address _spender, uint256 _amount) public override returns (bool success){
        allowances[msg.sender][_spender] = _amount;
        emit CustomApproval(msg.sender,_spender,_amount);
        return true;
    }
    function balanceOf( address account) override public view returns (uint256) {
        return balances[account];
    }

}