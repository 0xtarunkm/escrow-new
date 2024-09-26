'use client';

import { useEscrow } from '@/utils/hooks/useEscrow';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { BN } from '@coral-xyz/anchor';

interface EscrowAccount {
  publicKey: PublicKey;
  account: {
    seed: BN;
    maker: PublicKey;
    bump: number;
    mintA: PublicKey;
    mintB: PublicKey;
  };
}

export default function Refund() {
  const [escrows, setEscrows] = useState<EscrowAccount[]>();
  const { publicKey } = useWallet();
  const { refundEscrow, getAllEscrowAccounts } = useEscrow();

  const fetchEscrows = async () => {
    const fetchedEscrows = await getAllEscrowAccounts();
    setEscrows(fetchedEscrows);
  };

  async function handleRefund(escrow: PublicKey) {
    if (!publicKey) {
      console.log('Wallet not connected');
      return;
    }

    try {
      const res = await refundEscrow(escrow);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={fetchEscrows}>fetch</button>
      <button
        onClick={() =>
          handleRefund(
            new PublicKey('3RWqN5AvQi19a39vkm99gxjcBjJFaLZHGNoCc2iFEWb8')
          )
        }
      >
        refund
      </button>
    </div>
  );
}
