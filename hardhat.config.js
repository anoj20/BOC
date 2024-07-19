require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  solidity: {
        compilers: [
            {
                version: "0.8.0"
            },
            {
                version: "0.7.5"
            },
            {
                version: "0.7.4"
            },
            {
                version: "0.4.16"
            },
            {
                version: "0.6.11"
            },
            {
                version: "0.6.6"
            },
            {
                version: "0.5.16"
            }
        ]
    },
  networks: {
    cronostest: {
      url: 'https://cronos-testnet-3.crypto.org:8545'
      accounts: [''],
      gas: 2100000,
      gasPrice: 5000000000000,
    },
      cronosmainnet: {
      url: 'https://evm-cronos.crypto.org',
      accounts: [''],
     gas: 2100000,
      gasPrice: 5000000000000,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "https://cronos.crypto.org/explorer/api"
  }
};
