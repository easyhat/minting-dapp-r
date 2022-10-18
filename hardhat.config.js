require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL || ''
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const ETHERSCAN_API = process.env.ETHERSCAN_API || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
  solidity: '0.8.17',
}
