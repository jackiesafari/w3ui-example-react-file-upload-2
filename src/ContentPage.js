import React, { useState, useRef } from 'react'
import { useUploader } from '@w3ui/react-uploader'


import { withIdentity } from './components/Authenticator'
import { Camera } from 'react-camera-pro'

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

import { Wallet } from 'ethers'

import { Client } from '@xmtp/xmtp-js'



import './spinner.css'



export const YourApp = () => {
  return <ConnectButton />;
};




export const Stream = () => {
  const [streamName, setStreamName] = useState<0>(0);
  const {
    mutate: createStream,
    data: createdStream,
    status: createStatus,
  } = useCreateStream();

  
// You'll want to replace this with a wallet from your application
const wallet = Wallet.createRandom()
// Create the client with your wallet. This will connect to the XMTP development network by default
const xmtp = await Client.create(wallet)
// Start a conversation with XMTP
const conversation = await xmtp.conversations.newConversation(
  '0x3F11b27F323b62B159D2642964fa27C46C841897'
)
// Load all messages in the conversation
const messages = await conversation.messages()
// Send a message
await conversation.send('gm')
// Listen for new messages in the conversation
for await (const message of await conversation.streamMessages()) {
  console.log(`[${message.senderAddress}]: ${message.content}`)
}

 
  return (
    <>
      <input
        type="text"
        placeholder="Stream name"
        onChange={(e) => setStreamName(e.target.value)}
      />
 
      <button
        onClick={() => {
          createStream?.();
        }}
        disabled={createStatus === 'loading' || !createStream}
      >
        Create Stream
      </button>
    </>
   
  );
};



function dataURLtoFile (dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  const blob = new Blob([u8arr], { type: mime })
  return new File([blob], 'camera-image')
}


export function ContentPage () {
  const [{ uploadedCarChunks }, uploader] = useUploader()
  const [file, setFile] = useState(null)
  const [dataCid, setDataCid] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])

  
  const camera = useRef(null)

  if (!uploader) return null

  const takePhoto = async (e) => {
    e.preventDefault()
    const imgdata = camera.current.takePhoto()
    
    try {
      // Build a DAG from the file data to obtain the root CID.
      setStatus('encoding')
      const theFile = dataURLtoFile(imgdata)
      setStatus('uploading')
      const cid = await uploader.uploadFile(theFile)
      setImages([{ cid: '0f9e3f41-6e76-47ff-91e4-93978543827c', data: imgdata }, ...images])
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setStatus('done')
    }
  }
  const handleUploadSubmit = async e => {
    e.preventDefault()
    try {
      setStatus('uploading')
      const cid = await uploader.uploadFile(file)
      setDataCid(cid)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setStatus('done')
    }
  }
const printStatus = status === 'done' && error ? error : status


  return (
     
     <div>
      <p>
     <button onClick={takePhoto}>Take photo</button>
     </p>
     <Camera ref={camera} />


     <div className='db mb3'>
        <label htmlFor='file' className='db mb2'>File:</label>
        <input id='file' className='db pa2 w-100 ba br2' type='file' onChange={e => setFile(e.target.files[0])} required />
      </div>
      <button type='submit' className='ph3 pv2'>Upload</button>
      <ul className='images'>
      {images.map (({ cid, data})=> (
        <ImageListItem key={cid} cid={cid} data={data} />
        ))}

       

       </ul>
     </div>
  
             )}
             
             



          

const Done = ({ file, dataCid, uploadedCarChunks }) => (
  <div>
    <h1 className='near-white'>Done!</h1>
    <p className='f6 code truncate'>{dataCid.toString()}</p>
    <p><a href={`https://w3s.link/ipfs/${dataCid}`} className='blue'>View {file.name} on IPFS Gateway.</a></p>
    <p className='near-white'>Chunks ({uploadedCarChunks.length}):</p>
    {uploadedCarChunks.map(({ cid, size }) => (
      <p key={cid.toString()} className='f7 truncate'>
        {cid.toString()} ({size} bytes)
      </p>
    ))}
  </div>
)
function ImageListItem ({ cid, data }) {
  if (/bagb/.test(`${cid}`)) {
    return <li key={cid}>CAR cid: {cid}</li>
  }
  const imgUrl = `https://w3s.link/ipfs/${cid}`
  const imgSrc = data || imgUrl
  return (
    <li key={cid}>
      <a href={imgUrl}>
        <img width="200px" alt='camera output' src={imgSrc} />
      </a>
    </li>
  )

  
}



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
// You'll want to replace this with a wallet from your application
const wallet = Wallet.createRandom()
// Create the client with your wallet. This will connect to the XMTP development network by default
const xmtp = await Client.create(wallet)
// Start a conversation with XMTP
const conversation = await xmtp.conversations.newConversation(
  '0x3F11b27F323b62B159D2642964fa27C46C841897'
)
// Load all messages in the conversation
const messages = await conversation.messages()
// Send a message
await conversation.send('gm')
// Listen for new messages in the conversation
for await (const message of await conversation.streamMessages()) {
  console.log(`[${message.senderAddress}]: ${message.content}`)
}
export default withIdentity(ContentPage)
