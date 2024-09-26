'use client';

import { useEscrow } from '@/utils/hooks/useEscrow';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

const USDC_ADDRESS = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';

export default function Maker() {
  const [amount, setAmount] = useState(0);
  const { publicKey, connected } = useWallet();
  const { makeEscrow } = useEscrow();

  async function onSubmit() {
    if (!publicKey || !connected) {
      console.log('Please connect your wallet');
      return;
    }

    try {
      const res = await makeEscrow({
        mintA: USDC_ADDRESS,
        mintB: USDC_ADDRESS,
        deposit: amount,
        receive: 10,
      });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button onClick={onSubmit}>deposit</button>
    </div>
  );
}
