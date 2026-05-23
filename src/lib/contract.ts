const _raw = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
const _ZERO = '0x0000000000000000000000000000000000000000';
const _valid = /^0x[0-9a-fA-F]{40}$/.test(_raw);

if (!_valid && typeof window === 'undefined') {
  console.error('NEXT_PUBLIC_CONTRACT_ADDRESS is not a valid address:', _raw || '(empty)');
}

export const CONTRACT_ADDRESS = (_valid ? _raw : _ZERO) as `0x${string}`;
export const IS_CONTRACT_DEPLOYED = _valid && _raw !== _ZERO;

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
