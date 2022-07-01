import type { Blockchain } from '@ankr.com/ankr.js/dist/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useMemo, useState } from 'react';
import {
  chainsToNativeSymbols,
  getAllNativeCurrencyBalances,
  getTotalMultichainBalance,
} from './api';

function App() {
  const [totalBalance, setTotalBalance] = useState<number>();
  const [allNativeBalances, setAllNativeBalances] = useState<{
    [key in Blockchain]?: number;
  }>({});

  const nativeBalancesSorted = useMemo(() => {
    // sort allNativeBalances by value, descending and convert it back to an object
    const res = Object.entries(allNativeBalances).sort(([, a], [, b]) => b - a);
    return res;
  }, [allNativeBalances]);

  useEffect(() => {
    (async () => {
      const totalBal = await getTotalMultichainBalance(
        '0x0ED6Cec17F860fb54E21D154b49DAEFd9Ca04106'
      );
      const nativeBalances = await getAllNativeCurrencyBalances(
        '0x0ED6Cec17F860fb54E21D154b49DAEFd9Ca04106'
      );
      setAllNativeBalances(nativeBalances);
      setTotalBalance(Math.round(totalBal));
    })();
  }, []);

  return (
    <div className='flex flex-col items-center py-8'>
      <h1 className='font-black text-4xl text-blue-800'>Defi Dashboard</h1>

      <p className='mt-2 max-w-[400px]'>
        Query account balances, which currencies exist on a blockchain, how many
        token holders a currency has, and token prices - all fueled directly by
        on-chain data.
      </p>

      <p className='mt-2 font-bold'>yo, what's in your wallet?</p>

      <div className='flex flex-col items-center mt-4'>
        <ConnectButton />
      </div>

      <div className='bg-zinc-200 py-4 px-8 rounded flex flex-col mt-8 w-[300px] items-center'>
        <h3 className='text-blue-800 font-bold'>Net Worth</h3>
        <span className='text-3xl font-bold'>${totalBalance}</span>
      </div>

      <div className='bg-zinc-200 py-4 px-8 rounded flex flex-col mt-4 w-[300px] items-center'>
        <h3 className='text-blue-800 font-bold'>Wallet</h3>
        <ul className='mt-4 flex flex-col gap-2'>
          {nativeBalancesSorted.map(([chain, bal], idx) => (
            <li key={chain + idx} className='capitalize flex flex-col'>
              <span>{chain}</span>
              <span className='font-bold text-2xl'>
                {bal.toFixed(2)} {chainsToNativeSymbols[chain]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
