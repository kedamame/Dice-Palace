// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title DicePalaceScores
/// @notice Records Sic Bo game scores on Base
/// @dev Deploy to Base Mainnet (chain ID 8453), then set CONTRACT_ADDRESS in src/lib/contract.ts
contract DicePalaceScores {
    event ScoreRecorded(address indexed player, uint256 rounds, uint256 timestamp);

    mapping(address => uint256) public bestScore;

    function recordScore(uint256 rounds) external {
        if (rounds > bestScore[msg.sender]) {
            bestScore[msg.sender] = rounds;
        }
        emit ScoreRecorded(msg.sender, rounds, block.timestamp);
    }

    function getBestScore(address player) external view returns (uint256) {
        return bestScore[player];
    }
}
