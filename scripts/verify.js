const { run } = require('hardhat')

// verify contract
const verify = async (contractAddress, args) => {
  console.log('Veriying Contract ...')
  try {
    run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.error(err.message)
    }
  }
}

module.exports = { verify }
