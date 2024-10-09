'use client'

import React, { ReactNode, createContext, useState, useEffect } from 'react';
import { GlobalStateType } from '@/context/GlobalStateTypes';
import { testRootAPICall } from '@/lib/actions/serverAction';

type ContextType = GlobalStateType & {
  testResponse?: unknown
}

const DEFAULT_CONTEXT : ContextType = {
  accessToken: undefined, 
  refreshToken: undefined,
  testResponse: undefined,
}

export const GlobalContext = createContext(DEFAULT_CONTEXT);

export function GlobalState({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [testResponse, setTestResponse] = useState();

  useEffect(() => {
    const response = testRootAPICall({
      accessToken,
      refreshToken
    })
      .then((res) => setTestResponse(res))
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    console.log('test response has changed: ', testResponse)
  }, [testResponse]);

  return (
    <GlobalContext.Provider 
      value={{
        accessToken, 
        refreshToken,
        testResponse
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}