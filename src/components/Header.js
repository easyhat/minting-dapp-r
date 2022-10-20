/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { RiDiscordLine, RiWallet2Fill } from 'react-icons/ri'
import Blockies from 'react-blockies'

function Header({ setAccount, account }) {
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (typeof ethereum !== 'undefined') {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window
      if (typeof ethereum !== 'undefined') {
        const accounts = await ethereum.request({
          method: 'eth_accounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  // first load
  useEffect(() => {
    isWalletConnected()
  }, [])
  return (
    <nav className='flex justify-between items-center px-5 md:container mx-auto border-b py-4'>
      <img src='logo.png' className='w-10 p-0 m-0' alt='' />

      <ul className='flex justify-between text-black'>
        <li className='mx-4'>
          <a href='https://www.discord.com'>
            <RiDiscordLine size={30} />
          </a>
        </li>
        <li className='mx-4'>
          <a href='https://www.twitter.com'>
            <AiFillTwitterCircle size={30} />
          </a>
        </li>
        <li>
          {account ? (
            <span className='flex items-center  px-2  bg-amber-900 rounded-full'>
              <span>
                <Blockies
                  seed={account.toLowerCase()}
                  className='rounded-full'
                />
              </span>
              <span>
                {`${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`}
              </span>
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className='flex items-center bg-black rounded-lg text-white px-4 py-1 transition-all duration-200 hover:shadow-lg hover:shadow-black'
            >
              <RiWallet2Fill className='mr-2' size={20} />
              Connect
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Header
