import React from 'react'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { RiDiscordLine } from 'react-icons/ri'

function Footer() {
  const getCurrentYear = () => new Date().getFullYear()
  return (
    <div className='w-full flex justify-between items-center border-t'>
      <p className='text-base font-medium text-white px-5'>
        © {getCurrentYear()} {process.env.REACT_APP_NFT_NAME}
      </p>
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
      </ul>
    </div>
  )
}

export default Footer
