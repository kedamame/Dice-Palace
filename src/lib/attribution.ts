import { concatHex, encodeFunctionData, type Hex } from 'viem';
import { Attribution } from 'ox/erc8021';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';

const BUILDER_CODE = 'bc_c15ea14k';

let _suffix: Hex | null = null;

function getSuffix(): Hex {
  if (!_suffix) {
    try {
      _suffix = Attribution.toDataSuffix({ codes: [BUILDER_CODE] }) as Hex;
    } catch {
      _suffix = '0x' as Hex;
    }
  }
  return _suffix;
}

export function encodeRecordScore(rounds: number): { to: typeof CONTRACT_ADDRESS; data: Hex } {
  const calldata = encodeFunctionData({
    abi: CONTRACT_ABI,
    functionName: 'recordScore',
    args: [BigInt(rounds)],
  });
  return { to: CONTRACT_ADDRESS, data: concatHex([calldata, getSuffix()]) };
}
