'use server';

import { GlobalStateType } from "@/context/GlobalStateTypes";

const SERVER_URL = `${process.env.BACKEND_ADDRESS}:${process.env.BACKEND_PORT}`;

export async function testRootAPICall(globalContext: GlobalStateType): Promise<any> {
  const rootUrl = SERVER_URL;

  const response = await fetch(rootUrl, {
    method: 'GET',
  })
    .catch(error => console.log(`Fetching ${rootUrl} failed: ${error.message}`));


  const body = response?.json() ?? null;

  return body
}