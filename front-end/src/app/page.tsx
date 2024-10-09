'use client';

import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export default function App() {
  const globalContext = useContext(GlobalContext);

  const {testResponse} = globalContext 

  return (
    <main className="text-center">
      <div>
        Hello from Full Stack Dicitionary!
      </div>

      <div className="respose-test">
        {JSON.stringify(testResponse)}
      </div>
    </main>
  );
}
