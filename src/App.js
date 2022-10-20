import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Mint from './components/Mint'
function App() {
  const [account, setAccount] = useState()
  return (
    <div className='w-full h-screen bg-amber-500'>
      <Header setAccount={setAccount} account={account} />
      <Mint account={account} />
      <Footer />
    </div>
  )
}

export default App
