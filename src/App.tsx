import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { getTotalMultichainBalance } from './api';

function App() {
  const [totalBalance, setTotalBalance] = useState<number>();

  useEffect(() => {
    (async () => {
      const totalBal = await getTotalMultichainBalance(
        '0x0ED6Cec17F860fb54E21D154b49DAEFd9Ca04106'
      );
      console.log({ totalBal });
      setTotalBalance(Math.round(totalBal));
    })();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl'>Defi Dashboard</h1>

      <ConnectButton />

      <h3>Total balance: ${totalBalance}</h3>
    </div>
  );
}

export default App;
