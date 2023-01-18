import React, { useEffect } from 'react'

import { AuthProvider, useAuth } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'

import ContentPage from './ContentPage'
import logo from './logo.png'
import { useMemo, useState } from 'react';
 


  import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

import { Player, useCreateStream } from '@livepeer/react';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'






export const YourApp = () => {
  return <ConnectButton />;
};

export const Stream = () => {
  const [streamName, setStreamName] = useState<0>(0);
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);
 
  const isLoading = useMemo(() => status === 'loading', [status]);
 

  

function PlayerComponent() {
  return (
    <Player
      title="Agent 327: Operation Barbershop"
      playbackId="6d7el73r1y12chxr"
    />
  );
}
 
 

  ;


  const client = createReactClient({
    provider: studioProvider({
      apiKey: '0f9e3f41-6e76-47ff-91e4-93978543827c',
      baseUrl: 'https://studio.my-domain.com/root/api',
    }),
  });


function MyApp({ Component, pageProps }){

  return (
    <LivepeerConfig client={client}>
     <Component {...pageProps} />
    </LivepeerConfig>
  );
}
     


function App () {
  return (
    
    
    <AuthProvider>
      <UploaderProvider>
        
        <IdentityLoader>

          <div className='flex flex-column justify-center items-center sans-serif light-silver'>
            <header>
              <img src={logo} width='250' alt='logo' />
            </header>
            <h1 className = "text-6xl font-bold"> Stream from the Future </h1>
            <div className='w-90 w-50-ns mw6'>
              <ContentPage /> 
            </div>
          </div>
          
        </IdentityLoader>
        
      </UploaderProvider>
    </AuthProvider>
    
  );  
    ;
  };
  
  


function IdentityLoader ({ children }) {
  const { loadDefaultIdentity } = useAuth()
  // eslint-disable-next-line
  useEffect(() => { loadDefaultIdentity() }, []) // try load default identity - once.
  return children
}


  return (
    <div>
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />
 
      {stream?.playbackId && (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
        />
      )}
 
      <div>
        {!stream && (
          <button
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
          >
            Create Stream
          </button>
        )}
      </div>
    </div>
  );
};
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};



export default App;


