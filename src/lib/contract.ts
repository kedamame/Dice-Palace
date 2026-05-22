// Deploy contracts/DicePalaceScores.sol to Base and replace this address
export const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

export const CONTRACT_ABI = [
  {
    inputs: [{ name: 'rounds', type: 'uint256' }],
    name: 'recordScore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'player', type: 'address' }],
    name: 'getBestScore',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'player', type: 'address' },
      { indexed: false, name: 'rounds', type: 'uint256' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'ScoreRecorded',
    type: 'event',
  },
] as const;
