import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import ClipLoader from 'react-spinners/ClipLoader'
import abi from '../utils/abi.json'
import { contractAddress } from '../utils/config'

function Mint({ account }) {
  const [mintAmount, setMintAmount] = useState(0)
  const [totalSupply, setTotalSupply] = useState('?')
  const [loading, setLoading] = useState(false)
  const isConnected = Boolean(account)

  // functions
  const increment = () => {
    setMintAmount(mintAmount + 1)
  }
  const decrement = () => {
    if (mintAmount > 0) {
      setMintAmount(mintAmount - 1)
    } else {
      alert('You can not use number under 0')
    }
  }

  const handleMint = async () => {
    try {
      setLoading(true)
      if (isConnected) {
        const cost = process.env.REACT_APP_WEI_COST
        const gasLimit = process.env.REACT_APP_GAS_LIMIT
        const totalCostWei = (Number(cost) * mintAmount).toString()
        const totalGasLimit = (Number(gasLimit) * mintAmount).toString()
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, abi, signer)
          console.log('%j', signer)
          const tx = await contract.mint(mintAmount, {
            value: totalCostWei,
            gasLimit: totalGasLimit.toString(),
          })
          await tx.wait()
          setTotalSupply(parseInt(await contract.totalSupply()))
        }
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)

      console.error(err.message)
    }
  }

  const getTotalSupply = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const tSupply = await contract.totalSupply()
        setTotalSupply(parseInt(tSupply))
      }
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getTotalSupply()
  }, [])
  return (
    <div className='md:w-1/2 w-full flex flex-col mx-auto mt-5 text-white'>
      <h2 className='text-center name md:text-5xl text-2xl text-amber-900'>
        {process.env.REACT_APP_NFT_NAME} NFTs
      </h2>
      <div className='bg-black rounded-lg md:w-4/5 mt-5 w-full mx-auto flex flex-col items-center py-5'>
        <h2 className='text-white md:text-2xl font-semibold text-xl'>
          <span className='text-amber-600'>{totalSupply}</span>/{' '}
          <span>{process.env.REACT_APP_MAX_SUPPLY}</span>
        </h2>
        <h3 className='text-lg text-white my-3'>
          Total Price:{process.env.REACT_APP_NFT_PRICE} ETH
        </h3>
        <p className='text-amber-600 text-base'>(Excluding gas fees)</p>
        <div className='flex my-4'>
          <button
            className='transition-all duration-200 hover:text-amber-600 cursor-pointer'
            onClick={decrement}
          >
            <AiFillMinusCircle size={30} />
          </button>
          <span className='mx-2 text-lg text-amber-600 font-semibold'>
            {mintAmount}
          </span>
          <button
            className='transition-all duration-200 hover:text-amber-600 cursor-pointer'
            onClick={increment}
          >
            <AiFillPlusCircle size={30} />
          </button>
        </div>
        <button
          onClick={handleMint}
          className='bg-amber-600 rounded-lg  mt-5 px-10 py-1 transition-all duration-200 hover:shadow-md hover:shadow-orange-500 hover:bg-amber-500 hover:scale-105 flex items-center'
        >
          {loading && <ClipLoader size={20} color='#36d7b7' />}
          &nbsp; Mint
        </button>
        {!isConnected && (
          <p className='text-white text-sm mt-5'>
            Not Connected to your Wallet Yet
          </p>
        )}
      </div>
      <div className='space-y-4 my-5 text-center'>
        <p>
          Please make sure you are connected to the correct address and the
          correct network (Ethereum Mainnet) before purchasing. The operation
          cannot be undone after purchase.
        </p>
        <p>
          We have set the gas limit to {process.env.REACT_APP_GAS_LIMIT} to
          successfully mint your NFT. We recommend that you do not lower the gas
          limit.
        </p>
      </div>
    </div>
  )
}

export default Mint
