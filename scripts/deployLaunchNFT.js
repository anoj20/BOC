const { ethers } = require("hardhat");


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);

    // Deploy OHM
    //const USDC = await ethers.getContractFactory('CronosCRC20');
    //const usdc_contract = await USDC.deploy('USD Coin','USDC',6);
    //const NFT_BASIC = await ethers.getContractFactory('BOC_NFT_Basic');
    //const nft_basic = await NFT_BASIC.deploy('0x1087234fe877721F30016ebeD5BEd061397C8851','0xc21223249CA28397B4B6541dfFaEcC539BfF0c59','100000000');
    //const NFT_PREMIER = await ethers.getContractFactory('BOC_NFT_Premier');
    //const nft_premier = await NFT_PREMIER.deploy('0x1087234fe877721F30016ebeD5BEd061397C8851','0xc21223249CA28397B4B6541dfFaEcC539BfF0c59','1000000000');
    const NFT_EXCLUSIVE = await ethers.getContractFactory('BOC_NFT_Exclusive');
    const nft_exclusive = await NFT_EXCLUSIVE.deploy('0x1087234fe877721F30016ebeD5BEd061397C8851','0xc21223249CA28397B4B6541dfFaEcC539BfF0c59','10000000000');
    //const Multisig = await ethers.getContractFactory('MultiSigWallet');
    //const multisig = await Multisig.deploy(["0xfeE202Cf98C1F47cF23975689880AFD5B8E7073d", "0x17E72fa2E371c382C0491604e517c4D09DE8093e", "0xAAc4d41D74186971F8d52f699A8818F826baf1db","0x48291988c77bccdFD10E216425878a347645a8D5","0x3a78C8511C27b19cF5EB86eCE96e76551A0Cd2d5","0x7b072a6a022478446ac76B01aA8e75EE547cC0F7","0x420d52E115Eb5B324ef3078B3D6E8cfacb8A0b3E"],7);

    //console.log("Deploying BOCLaunchNFT");
    //console.log( "BOCLaunchNFT: " + nft_basic.address );
    //console.log("Deploying USDC");
    //console.log( "USDC: " + usdc_contract.address );
    //console.log("Deploying BOCLaunchNFTPremier");
    //console.log( "BOCLaunchNFTPremier: " + nft_premier.address );
    console.log("Deploying BOCLaunchNFTExclusive");
    console.log( "BOCLaunchNFTExclusive: " + nft_exclusive.address );

    //console.log("Deploying MultiSig");
    //console.log( "MultiSig: " + multisig.address );
    //sleep(40000);

}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})




































//
// // { networkConfig } = require('../helper-hardhat-config')
// const fs = require('fs')
//
// module.exports = async ({
//     getNamedAccounts,
//     deployments,
//     getChainId
// }) => {
//
//     const { deploy, log } = deployments
//     const { deployer } = await getNamedAccounts()
//     const chainId = await getChainId()
//
//     log("----------------------------------------------------")
//     const SVGNFT = await deploy('SVGNFT', {
//         from: deployer,
//         log: true
//     })
//     log(`You have deployed an NFT contract to ${SVGNFT.address}`)
//     const svgNFTContract = await ethers.getContractFactory("SVGNFT")
//     const accounts = await hre.ethers.getSigners()
//     const signer = accounts[0]
//     const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)
//     const networkName = networkConfig[chainId]['name']
//
//     log(`Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`)
//     log("Let's create an NFT now!")
//     let filepath = "./img/small_enough.svg"
//     let svg = fs.readFileSync(filepath, { encoding: "utf8" })
//     log(`We will use ${filepath} as our SVG, and this will turn into a tokenURI. `)
//     tx = await svgNFT.create(svg)
//     await tx.wait(1)
//     log(`You've made your first NFT!`)
//     log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`)
// }
//
// module.exports.tags = ['all', 'svg']
//
//
// // Deploy OHM
//     const OHM = await ethers.getContractFactory('OlympusERC20Token');
//     const ohm = await OHM.deploy();
//     console.log("Deploying ohm");
//     console.log( "OHM: " + ohm.address );
//     sleep(40000);