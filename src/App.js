import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'

import ContentPage from './ContentPage'
import logo from './logo.png'


  import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';


const client = createReactClient({
 provider: studioProvider({ apiKey: '${process.env.LIVEPEER_API_KEY }'}),
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
    
  )
}

function IdentityLoader ({ children }) {
  const { loadDefaultIdentity } = useAuth()
  // eslint-disable-next-line
  useEffect(() => { loadDefaultIdentity() }, []) // try load default identity - once.
  return children
}

export default App
