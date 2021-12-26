// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TipTipTap is Ownable, Pausable {

    enum TypeNetwork  {VIETTEL, VINAPHONE, MOBIPHONE}
    string private challenge;
    uint8 public players;
    uint8 public minimalToPlay;
    mapping(TypeNetwork => string) private storeCard;
    mapping(address => bool) private isApply;
    mapping(bytes32 => bool) private results;
    mapping(address => string) private winner;

    event Players(uint8 players);

    constructor(string memory _challenge, string memory _result, uint8 _minimal, string memory seri){
        challenge = _challenge;
        minimalToPlay = _minimal;
        storeCard[TypeNetwork.VIETTEL] = seri;
        results[keccak256(abi.encodePacked(_result))] = true;
        _pause();
    }
    function applyNow() whenPaused public {
        require(!isApply[msg.sender],"You was apply");
        isApply[msg.sender] = true;
        players = players + 1;
        emit Players(players);
        if(players == minimalToPlay) {
            _unpause();
        }
    }
    function setChallenge(string memory _challenge) public onlyOwner {
        challenge = _challenge;
    }
    function setCard(string memory seri) public onlyOwner {
        storeCard[TypeNetwork.VIETTEL] = seri;
    }
    function setMinimalToPlay(uint8 minimal) public onlyOwner {
        minimalToPlay = minimal;
    }
    function play() public view whenNotPaused returns(string memory){
        return challenge;
    }
    
    function submit(string memory _result) public whenNotPaused{
        require(results[keccak256(abi.encodePacked(_result))], "You not passed");
        winner[msg.sender] = storeCard[TypeNetwork.VIETTEL];
        _pause();
    }
    function getCard() public view returns(string memory){
        return winner[msg.sender];
    }
}