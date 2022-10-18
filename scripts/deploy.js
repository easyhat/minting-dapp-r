const { ethers, network } = require('hardhat')
const { verify } = require('./verify')
async function main() {
  const dogPunksFactory = await ethers.getContractFactory('DogPunks')
  console.log('Deploying Contract ...')
  const dogPunks = await dogPunksFactory.deploy()
  await dogPunks.deployed()
  // verify contract
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API) {
    const args = []
    console.log('Waiting for block confirmations...')
    await dogPunks.deployTransaction.wait(6)
    await verify(dogPunks.address, args)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
