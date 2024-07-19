// @dev. This script will deploy this V1.1 of Olympus. It will deploy the whole ecosystem except for the LP tokens and their bonds. 
// This should be enough of a test environment to learn about and test implementations with the Olympus as of V1.1.
// Not that the every instance of the Treasury's function 'valueOf' has been changed to 'valueOfToken'... 
// This solidity function was conflicting w js object property name


const { ethers } = require("hardhat");
// const configParams = require("../utils/deploymentParams.rinkeby.js")
// const DeploymentHelper = require("../utils/testnetDeploymentHelpers.js")




function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}




async function main() {

     // import OHM from './artifacts/contracts/OlympusERC20.sol/OlympusERC20.json'
     // import DAI from './artifacts/contracts/mocks/DAI.sol/DAI.json'
    // import Frax from './artifacts/contracts/mocks/Frax.sol/Frax.json'
    // import Treasury from './artifacts/contracts/Treasury.sol/Treasury.json'
    // import OlympusBondingCalculator from './artifacts/contracts/StandardBondingCalculator.sol/OlympusBondingCalculator.json'
    // import Distributor from './artifacts/contracts/StakingDistributor.sol/Distributor.json'
    // import SOHM from './artifacts/contracts/sOlympusERC20.sol/sOlympusERC20.json'
    // import Staking from './artifacts/contracts/Staking.sol/Staking.json'
    // import StakingWarmpup from './artifacts/contracts/StakingWarmup.sol/StakingWarmup.json'
    // import StakingHelper from './artifacts/contracts/StakingHelper.sol/StakingHelper.json'
    // import DAIBond from './artifacts/contracts/MockBondDepository.sol/MockBondDepository.json'
    // import FraxBond from './artifacts/contracts/MockBondDepository.sol/MockBondDepository.json'
    // import CronaswapFactory from './artifacts/contracts/CronaSwapFactory.sol/CronaSwapFactory.json'
    // import CronaswapRouter from './artifacts/contracts/CronaSwapRouter.sol/CronaSwapRouter.json'
const BOCMultisigAddress = '0x1087234fe877721F30016ebeD5BEd061397C8851'
const BOCAddress = '0xe5786DDFc4D6DcA0973D1c5b02987cBbac66ed87'
const DAIAddress = '0xc21223249ca28397b4b6541dffaecc539bff0c59'
const FraxAddress = '0xF2001B145b43032AAF5Ee2884e456CCd805F677D'


const BOCNFTAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'
const BOCNFTLaunchPremierAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'
const BOCNFTLaunchExclusiveAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'

const LPaddress = '0xb08e10C936688Ca42Bf41F52EC96238EBCE681fc'
const TreasuryAddress = '0x22c17f35604ddd82c64eC5D542d5bbB9F0321E6F'
const OlympusBondingCalculatorAddress = '0x11C4B564D8835fA8D309E65a3d003dED1a2c835e'
const DistributorAddress = '0xd831BA6CCFB5067F48540eE054C32c7Cd676aCF5'
const SBOCAddress = '0xfB3594a8D2b518B118aF0D232304525bf203E13A'
const StakingAddress = '0x423d172ef3F5160e22CD30972653134cC2F2a1B2'
const StakingWarmpupAddress = '0x91836C57c45968Ef2F36359998B19285e1A45784'
const StakingHelperAddress = '0x9816DCe3f5b0Ed97533CbA2f0fe96b8F015cABb5'
const DAIBondAddress = '0x419C1A088B530196DD84212C073C3CB1f248e5E8'
const FraxBondAddress = '0x0fC2c680f2C6244008124D3958c27F4Fa7f8114d'
const pBOCBondAddress = '0xd6Af8a8831E765Ee25D4E071eF7A9167962c29fC'
const ExercisePOLYBondAddress = '0x0833E2bE57D9856a8F2d4BF14A3Fb1F08A723C3d'

    const CronaswapFactoryAddress = '0x73A48f8f521EB31c55c0e1274dB0898dE599Cb11'
    const CronaswapRouterAddress = '0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918'

//
// const airdrop = [
//   {address : "0x17E72fa2E371c382C0491604e517c4D09DE8093e", allocation: 100},
//   {address : "0xAAc4d41D74186971F8d52f699A8818F826baf1db", allocation: 100},
//   {address : "0x48291988c77bccdFD10E216425878a347645a8D5", allocation: 100},
//   {address : "0x3a78C8511C27b19cF5EB86eCE96e76551A0Cd2d5", allocation: 100},
//   {address : "0x7b072a6a022478446ac76B01aA8e75EE547cC0F7", allocation: 100},
//   {address : "0x420d52E115Eb5B324ef3078B3D6E8cfacb8A0b3E", allocation: 100}
// ];
//
// const airdrop_data = airdrop.map(record => {
//     console.log("Address: " + record.address + " Allocation: " + record.allocation)
// })


    const [deployer, MockDAO] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ' + deployer.address);


    const initialMint = '22700000000';

    // Initial staking index
    const initialIndex = '1';

    // First block epoch occurs
    const firstEpochBlock = '1407000';

    // What epoch will be first epoch
    const firstEpochNumber = '338';

    // How many blocks are in each epoch (cronos should be 4800)
    const epochLengthInBlocks = '100';

    // Initial reward rate for epoch
    const initialRewardRate = '500';

    // Ethereum 0 address, used when toggling changes in treasury
    const zeroAddress = '0x0000000000000000000000000000000000000000';

    // Large number for approval for Frax and DAI
    const largeApproval = '100000000000000000000000000000000';



    // DAI bond BCV
    const daiBondBCV = '369';
    //console.log('1');
    // Frax bond BCV
    const fraxBondBCV = '369';

    // Bond vesting length in blocks. 33110 ~ 5 days
    const bondVestingLength = '33110';

    // Min bond price
    const minBondPrice = '50000';

    // Max bond payout
    const maxBondPayout = '50'

    // DAO fee for bond
    const bondFee = '10000';

    // Max debt bond can take on
    const maxBondDebt = '1000000000000';

    // Initial Bond debt
    const intialBondDebt = '0'


     // const ohm = new ethers.Contract(BOCAddress, OHM, deployer)
     // const dai = new ethers.Contract(DAIAddress, DAI, deployer)
    // const frax = new ethers.Contract(FraxAddress, Frax, deployer)
    // const treasury = new ethers.Contract(TreasuryAddress, Treasury, deployer)
    // const olympusBondingCalculator = new ethers.Contract(OlympusBondingCalculatorAddress, OlympusBondingCalculator, deployer)
    // const distributor = new ethers.Contract(DistributorAddress, Distributor, deployer)
    // const sOHM = new ethers.Contract(SBOCAddress, SOHM, deployer)
    // const staking = new ethers.Contract(StakingAddress, Staking, deployer)
    // const stakingWarmup = new ethers.Contract(StakingWarmpupAddress, StakingWarmpup, deployer)
    // const stakingHelper = new ethers.Contract(StakingHelperAddress, StakingHelper, deployer)
    // const daiBond = new ethers.Contract(DAIBondAddress, DAIBond, deployer)
    // const fraxBond = new ethers.Contract(FraxBondAddress, FraxBond, deployer)


     const Multisig = await ethers.getContractFactory('MultiSigWallet');
     const multisig = await Multisig.attach(BOCMultisigAddress);
     // const Multisig = await ethers.getContractFactory('MultiSigWallet');
     // const multisig = await Multisig.deploy(["0xfeE202Cf98C1F47cF23975689880AFD5B8E7073d", "0x17E72fa2E371c382C0491604e517c4D09DE8093e", "0xAAc4d41D74186971F8d52f699A8818F826baf1db","0x48291988c77bccdFD10E216425878a347645a8D5","0x3a78C8511C27b19cF5EB86eCE96e76551A0Cd2d5","0x7b072a6a022478446ac76B01aA8e75EE547cC0F7","0x420d52E115Eb5B324ef3078B3D6E8cfacb8A0b3E"],7);
     //console.log("Deploying MultiSig");
     console.log( "const BOCMultisigAddress = '" + multisig.address + "'");
     //sleep(10000);

    // Deploy OHM
    const OHM = await ethers.getContractFactory('BankOfCronosERC20Token');
    const ohm = await OHM.attach(BOCAddress);
    // const OHM = await ethers.getContractFactory('BankOfCronosERC20Token');
    // const ohm = await OHM.deploy();
    //console.log("Deploying boc");
    console.log( "const BOCAddress = '" + ohm.address + "'");
    //sleep(10000);

    // Deploy USDC
    const DAI = await ethers.getContractFactory('contracts/mocks/DAI.sol:CronosCRC20');
    const dai = await DAI.attach(DAIAddress);
    // const DAI = await ethers.getContractFactory('contracts/mocks/DAI.sol:CronosCRC20');
    // const dai = await DAI.deploy( 'USD Coin','USDC ',6 );
    //console.log("Deploying USDC");
    console.log( "const DAIAddress = '" + dai.address + "'");
    // const dai = await DAI.deploy( 'USD Coin','USDC ',6 );
    // //console.log("Deploying USDC");
    // console.log( "DAIAddress = " + dai.address );
    // sleep(10000);
    // await dai.mint_by_cronos_module( deployer.address, initialMint );
    // sleep(10000);
    //
    //
    // // Deploy Frax
    const Frax = await ethers.getContractFactory('FRAX');
    const frax = await Frax.attach(FraxAddress);
    // const frax = await Frax.deploy( 0 );
    // sleep(10000);
    // //console.log("Deploying frax");
     console.log( "const FraxAddress = '" + frax.address + "'")
    // await frax.mint( deployer.address, initialMint );
    // sleep(10000);
    // // Deploy 10,000,000 mock DAI and mock Frax
    //
    // await frax.mint( deployer.address, initialMint );
    // setTimeout(() => {  console.log(dai.address); }, 10000);





    // const CronaswapFactory = await ethers.getContractFactory('CronaSwapFactory');
    // const CronaswapRouter = await ethers.getContractFactory('CronaSwapRouter');
    // const CSFactory = await ethers.getContractFactory("CronaSwapFactory");
    // const CSFactorycontract = await CSFactory.attach(CronaswapFactoryAddress);
    // await CSFactorycontract.createPair(BOCAddress,DAIAddress);
    // sleep(20000);
    // const LPaddress = await CSFactorycontract.getPair(BOCAddress,DAIAddress);
    // sleep(20000);
    // //console.log("Deploying Initial Liquidity Pool");
    // console.log( "const LPAddress = '" + LPaddress.toString() + "'")
    //
    //  sleep(10000);

//     //
//     // // // Deploy treasury
//     // // //@dev changed function in treaury from 'valueOf' to 'valueOfToken'... solidity function was coflicting w js object property name
// const Treasury = await ethers.getContractFactory('BankofCronosTreasury');
//     const treasury = await Treasury.deploy(BOCAddress, DAIAddress, FraxAddress, LPaddress,  0 );
//     //console.log("Deploying treasury");
//     console.log( "const TreasuryAddress = '" + treasury.address + "'");
//     sleep(10000);
    const Treasury = await ethers.getContractFactory('BankofCronosTreasury');
    const treasury = await Treasury.attach(TreasuryAddress);
    // const frax = await Frax.deploy( 0 );
    // sleep(10000);
    // //console.log("Deploying frax");
     console.log( "const TreasuryAddress = '" + treasury.address + "'")


await ohm.approve(deployer.address, 1000000000000);sleep(10000);
    // await ohm.transfer("0x17E72fa2E371c382C0491604e517c4D09DE8093e",100000000000); sleep(10000);
    // await ohm.transfer("0xAAc4d41D74186971F8d52f699A8818F826baf1db",100000000000); sleep(10000);
    // await ohm.transfer("0x48291988c77bccdFD10E216425878a347645a8D5",100000000000); sleep(10000);
    // await ohm.transfer("0x3a78C8511C27b19cF5EB86eCE96e76551A0Cd2d5",100000000000); sleep(10000);
    // await ohm.transfer("0x7b072a6a022478446ac76B01aA8e75EE547cC0F7",100000000000); sleep(10000);
    // await ohm.transfer("0x420d52E115Eb5B324ef3078B3D6E8cfacb8A0b3E",100000000000); sleep(10000);

await ohm.transfer('0x35f9da7b297cb91931ea65ad337a3801e513c30c',50000000000); sleep(10000);
await ohm.transfer('0x43dc8e95f8127727d67b7dca70d1630b14ce68b0',50000000000); sleep(10000);
await ohm.transfer('0x77ae6ae1e19f8693b81ee75517ef45f9aa4a5939',50000000000); sleep(10000);
await ohm.transfer('0x9959121cde03fbdeacf87cacd68495a2ee7cfc8d',40000000000); sleep(10000);
await ohm.transfer('0x9d59c0c05d49005ac65464b5dfbe0dcc57d2ec33',40000000000); sleep(10000);
await ohm.transfer('0xc3a6ea28023ab78570a3a51a5d2412080ec53e2c',40000000000); sleep(10000);
await ohm.transfer('0x7074a0adfc8a55b1a8827bcc4e870a2e909d914f',30000000000); sleep(10000);
await ohm.transfer('0xe1912bbe33abb20eed524d790ef34d9f18ce2919',30000000000); sleep(10000);
await ohm.transfer('0x1bdab37269f1816e3855ed2b7336345c724eecb6',20000000000); sleep(10000);
await ohm.transfer('0x3ef9e67fc7c0f12d17eab53ac055c51f9b911f42',20000000000); sleep(10000);
await ohm.transfer('0x1a210638dba171ebe880ba6f24be6397b231b52f',20000000000); sleep(10000);
await ohm.transfer('0xadbdc8ba6ec33cd3abae1ba7047c37419ac038b4',20000000000); sleep(10000);
await ohm.transfer('0xaf00bafd8239079cb339a126620308ec68d18910',20000000000); sleep(10000);
await ohm.transfer('0xc5c8eff68183581f8a108ce6414a21a6675a4b79',20000000000); sleep(10000);
await ohm.transfer('0xe718b96fa05a01da1f7128c1d3370b4420bab27b',20000000000); sleep(10000);
await ohm.transfer('0xfbb370498fdd23f74747275812b52c3432447577',20000000000); sleep(10000);
await ohm.transfer('0x53c4bdf99890d71b6ad8a00f343f408e10dc7a16',10000000000); sleep(10000);
await ohm.transfer('0x5af0474fe32f19026942c12dbba4c9b5f8745896',10000000000); sleep(10000);
await ohm.transfer('0x715261d27bf49ad3b7c1c8aee2bad9647616af5c',10000000000); sleep(10000);
await ohm.transfer('0x7afbb427001d27ffa0e76cf01fdf6bbf6424f8c9',10000000000); sleep(10000);
await ohm.transfer('0x7b1d3bb271aa9144a0f058553383fb0b696f441b',10000000000); sleep(10000);
await ohm.transfer('0x7dbd552e5b81d1d3d7ad830857ea967f5886e689',10000000000); sleep(10000);
await ohm.transfer('0x8957060c114f90581823510b8286cdc7f760150c',10000000000); sleep(10000);
await ohm.transfer('0x8b7be62c5a29c04353afba70fc286dee19731b89',10000000000); sleep(10000);
await ohm.transfer('0x8f983757172e630805005a7d89f26837e5b7a2df',10000000000); sleep(10000);
await ohm.transfer('0x900a11612046f49b5821591586edeb842048bbaa',10000000000); sleep(10000);
await ohm.transfer('0x902a92e5fad1e00eba103cdaf89d3ba6aecde0ee',10000000000); sleep(10000);
await ohm.transfer('0x978bf4a8f4ef1358b723ed1dc2a8a96cc5618a81',10000000000); sleep(10000);
await ohm.transfer('0x9ab1433913c1014e2166b3c7f039d9528b1fc540',10000000000); sleep(10000);
await ohm.transfer('0x9b560c26c139175c8daabe09c18822582c34b5c1',10000000000); sleep(10000);
await ohm.transfer('0xa173268253c239eaf1b557f6878d0ebadeecec3e',10000000000); sleep(10000);
await ohm.transfer('0xa47360de76bcf800f3c451e800fb417dc8b4c3eb',10000000000); sleep(10000);
await ohm.transfer('0xa608f20fb261d7dcf259dadbcc7350a8f99c748c',10000000000); sleep(10000);
await ohm.transfer('0xac2eb83efc3e151bc11e3db87cb83eec54b97a76',10000000000); sleep(10000);
await ohm.transfer('0x25d2f06437c2dfd1374e1c32d7fd3888bb338fbe',10000000000); sleep(10000);
await ohm.transfer('0xae13245d7ab6621b8583f5a734f8f8728de4dcd1',10000000000); sleep(10000);
await ohm.transfer('0x2a7ff6317686fc9bead722a52045efa119a52c84',10000000000); sleep(10000);
await ohm.transfer('0xb1c693f1970c896a5ee5e7ea67c8feeb5358990a',10000000000); sleep(10000);
await ohm.transfer('0xb1cd8e2fac4f901ad0f7275edacbf01ff22b4c9e',10000000000); sleep(10000);
await ohm.transfer('0xb3d3ce9a3cbe818bd845bd2a668463e330ca56f3',10000000000); sleep(10000);
await ohm.transfer('0xbcb5f8e4a821d2f310139fdaa7d5390a55f2b94f',10000000000); sleep(10000);
await ohm.transfer('0xc0b36d3f37cc6030e9768bd49bbcfebb6c711cd4',10000000000); sleep(10000);
await ohm.transfer('0xc1cfbba6a19cce6c3266096e216cb17bf838abb8',10000000000); sleep(10000);
await ohm.transfer('0xc2a330c9fb05e4970be01f9eaab06b24e26815f3',10000000000); sleep(10000);
await ohm.transfer('0x2bc73328e2af3126e02ed0c60801f262776b9cc8',10000000000); sleep(10000);
await ohm.transfer('0xc4178ced0398f32dc669fedc9a959ce6623b7d64',10000000000); sleep(10000);
await ohm.transfer('0x3308c3975cde7349ab69a77654cf07e86c3ac4d0',10000000000); sleep(10000);
await ohm.transfer('0xccb97f166f5e91f8819176dd293db97f53e6004c',10000000000); sleep(10000);
await ohm.transfer('0xdc5fbc11167e145d033defa0e4a58447ae50cb19',10000000000); sleep(10000);
await ohm.transfer('0xdedb249bb0cb77bf31f8f6b477419c0f0c149ac0',10000000000); sleep(10000);
await ohm.transfer('0xdefd0de775d82a61d1a93efc18913e7b16906e1c',10000000000); sleep(10000);
await ohm.transfer('0xdf84b6941601d20e8b0a8fd787541709144e4c8e',10000000000); sleep(10000);
await ohm.transfer('0xdfd4a7ac8236deae66bb14575a058319f1d7de23',10000000000); sleep(10000);
await ohm.transfer('0xe0b60fb1072c2e837d82e7a461257ce9cc5a0969',10000000000); sleep(10000);
await ohm.transfer('0x354731bd106b468cb4d79bfa7ea3ecd5729e20d7',10000000000); sleep(10000);
await ohm.transfer('0xe33280b7f19c8abb77ae89e1c64d6fbfc16e37f0',10000000000); sleep(10000);
await ohm.transfer('0x3a78c8511c27b19cf5eb86ece96e76551a0cd2d5',10000000000); sleep(10000);
await ohm.transfer('0xeca96fb6a53e1d2c06673252e2aaaa2e7d0b949c',10000000000); sleep(10000);
await ohm.transfer('0xf1ef87e98b784ebb26d676ff1fcb7d7d8e1e1ab8',10000000000); sleep(10000);
await ohm.transfer('0xf69e8da88b033ccc831f4796acf49d1a5f04ff46',10000000000); sleep(10000);
await ohm.transfer('0xf777a9fc53a8857ac9ecee6a41dcb7d6110b7d6f',10000000000); sleep(10000);
await ohm.transfer('0x504fca4c6eacd7e34db36ba286f7b35ff70c1e50',10000000000); sleep(10000);
await ohm.transfer('0xfc559845fb191bea6c7204945cfa16fdf83e7381',10000000000); sleep(10000);
await ohm.transfer('0x36351a45eeb9ae0c332fe5378ae179a7b6fbe7b9',300000000000); sleep(10000);
await ohm.transfer('0x1a307a71b08c725ef1a1f83bf0944a3fdee6caa3',100000000000); sleep(10000);
await ohm.transfer('0x1a4394ad3d5b6a40d0528d586f2edb282a847399',100000000000); sleep(10000);
await ohm.transfer('0x2385233abb910357e2b97a16d40e0443e53d0769',100000000000); sleep(10000);
await ohm.transfer('0x3a4825c03c3c9f78c508983ab63541812b94e44a',100000000000); sleep(10000);
await ohm.transfer('0x46d06b412580f2e52a6a947476602af9343a05a8',100000000000); sleep(10000);
await ohm.transfer('0x772cb3de4472202e88e1e0b29d4926bd7ab74efa',100000000000); sleep(10000);
await ohm.transfer('0xc331764ca4ac331b6d0c60101de234d7a4a14491',100000000000); sleep(10000);
await ohm.transfer('0xd0d0a5f972a3e937fda5c18f756bd334c60039e2',100000000000); sleep(10000);
await ohm.transfer('0xec050a7ee1a41052fa60487f0cfb53e8dea5a850',100000000000); sleep(10000);
await ohm.transfer('0xfc559845fb191bea6c7204945cfa16fdf83e7381',100000000000); sleep(10000);


// // //     // // Deploy bonding calc
//     const OlympusBondingCalculator = await ethers.getContractFactory('OlympusBondingCalculator');
//     const olympusBondingCalculator = await OlympusBondingCalculator.deploy( BOCAddress );
//     //console.log("Deploying olympusBondingCalculator");
//     console.log( "const OlympusBondingCalculatorAddress = '" + olympusBondingCalculator.address + "'");
//     sleep(10000);
// // //     // // Deploy staking distributor
//     const Distributor = await ethers.getContractFactory('Distributor');
//     const distributor = await Distributor.deploy(treasury.address, BOCAddress , epochLengthInBlocks, firstEpochBlock);
//     //console.log("Deploying distributor");
//     console.log( "const DistributorAddress = '" + distributor.address + "'");
// sleep(10000);
// // //     // // Deploy sOHM
//     const SOHM = await ethers.getContractFactory('sOlympus');
//     const sOHM = await SOHM.deploy();
//     //console.log("Deploying sOHM");
//     console.log( "const SBOCAddress = '" + sOHM.address + "'");
// sleep(10000);
// // //     // // Deploy Staking
//     const Staking = await ethers.getContractFactory('OlympusStaking');
//     const staking = await Staking.deploy( BOCAddress, sOHM.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock );
//     //console.log("Deploying staking");
//     console.log( "const StakingAddress = '" + staking.address + "'");
// sleep(10000);
// // //     // // Deploy staking warmpup
//     const StakingWarmpup = await ethers.getContractFactory('StakingWarmup');
//     const stakingWarmup = await StakingWarmpup.deploy(staking.address, sOHM.address);
//     //console.log("Deploying stakingWarmup");
//     console.log( "const StakingWarmpupAddress = '" + stakingWarmup.address + "'");
// sleep(10000);
// // //     // // Deploy staking helper
//     const StakingHelper = await ethers.getContractFactory('StakingHelper');
//     const stakingHelper = await StakingHelper.deploy(staking.address, BOCAddress);
//     //console.log("Deploying stakingHelper");
//     console.log( "const StakingHelperAddress = '" + stakingHelper.address + "'");
//     sleep(10000);
// // //     // // Deploy DAI bond
// // //     // @dev changed function call to Treasury of 'valueOf' to 'valueOfToken' in BondDepository due to change in Treausry contract
//     const DAIBond = await ethers.getContractFactory('contracts/BondDepository.sol:OlympusBondDepository');
//     const daiBond = await DAIBond.deploy(BOCAddress, DAIAddress, treasury.address, BOCMultisigAddress, zeroAddress);
//     //console.log("Deploying daiBond");
//     console.log( "const DAIBondAddress = '" + daiBond.address + "'");
//     sleep(10000);
// // //     // // Deploy Frax bond
// // //     // //@dev changed function call to Treasury of 'valueOf' to 'valueOfToken' in BondDepository due to change in Treausry contract
//     const FraxBond = await ethers.getContractFactory('contracts/BondDepository.sol:OlympusBondDepository');
//     const fraxBond = await FraxBond.deploy(BOCAddress, FraxAddress, treasury.address, BOCMultisigAddress, zeroAddress);
//     //console.log("Deploying fraxBond");
//     console.log( "const FraxBondAddress = '" + fraxBond.address + "'");
// sleep(10000);
//
//     // Deploy pBOC
//     const PBOC = await ethers.getContractFactory('PreOlympusToken');
//     const pboc = await PBOC.deploy();
//     //console.log("Deploying pBOC");
//     console.log( "const pBOCBondAddress = '" + pboc.address + "'");
// sleep(10000);
//
//     // Deploy ExercisepBOC
//     const ExercisePOLY = await ethers.getContractFactory('ExercisePOLY');
//     const exercisepoly = await ExercisePOLY.deploy(deployer.address, pboc.address, BOCAddress, DAIAddress, treasury.address);
//     //console.log("Deploying ExercisepBOC");
//     console.log( "const ExercisePOLYBondAddress = '" + exercisepoly.address + "'");
// sleep(10000);
//
//      await exercisepoly.setTerms(deployer.address, 10000000000, 10 );
//      sleep(10000);
//      await exercisepoly.setTerms('0x256D2C45E9AEa6A1026f6E88C93E605a81D7F27B', 2000000000, 2 );
//      sleep(10000);
//      await exercisepoly.setTerms('0x17E72fa2E371c382C0491604e517c4D09DE8093e', 4000000000, 4 );
//      sleep(10000);
//      await exercisepoly.setTerms(BOCMultisigAddress, 10000000000, 10 );
//      sleep(10000);
//
// //     // // queue and toggle DAI and Frax bond reserve depositor
//     await treasury.queue('0', daiBond.address);
//     sleep(10000);
//     await treasury.queue('0', fraxBond.address);
//     sleep(10000);
//     await treasury.toggle('0', daiBond.address, zeroAddress);
//     sleep(10000);
//     await treasury.toggle('0', fraxBond.address, zeroAddress);
//     sleep(10000);
//     console.log( "Treasury Queue/Toggle");
// //     //
// //     // // Set DAI and Frax bond terms
//     await daiBond.initializeBondTerms(daiBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt);
//     sleep(10000);
//     await fraxBond.initializeBondTerms(fraxBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, intialBondDebt);
//     sleep(10000);
// //     console.log('5');
// //     // Set staking for DAI and Frax bond
//     await daiBond.setStaking(staking.address, stakingHelper.address);
//     sleep(10000);
//     await fraxBond.setStaking(staking.address, stakingHelper.address);
//     sleep(10000);
//     console.log( "Set staking and intialize bond terms");
// //
// //
// //     // // Initialize sOHM and set the index
//     await sOHM.initialize(staking.address);
//     sleep(10000);
//     await sOHM.setIndex(initialIndex);
//     sleep(10000);
//      console.log( "Set staking and intialize bond terms");
// //
// //
// //     // // set distributor contract and warmup contract
//     await staking.setContract('0', distributor.address);
//     sleep(10000);
//     await staking.setContract('1', stakingWarmup.address);
//     sleep(10000);
// //
// //
// //     // // Set treasury for OHM token
//     await ohm.setVault(treasury.address);
//     sleep(10000);
// //
// //     // // Add staking contract as distributor recipient
//     await distributor.addRecipient(staking.address, initialRewardRate);
//     sleep(10000);
// //
// //     // // queue and toggle reward manager
//     await treasury.queue('8', distributor.address);
//     sleep(10000);
//     await treasury.toggle('8', distributor.address, zeroAddress);
//     console.log("Treasury queue/toggle 8");
// sleep(10000);
//     // // queue and toggle deployer reserve depositor
//     await treasury.queue('0', deployer.address);
//     sleep(10000);
//     await treasury.toggle('0', deployer.address, zeroAddress);
//     console.log("Treasury queue/toggle 0");
// sleep(10000);
//     // // queue and toggle liquidity depositor
//     await treasury.queue('4', deployer.address);
//     sleep(10000);
//     await treasury.toggle('4', deployer.address, zeroAddress);
//     console.log("Treasury queue/toggle 4");
// sleep(10000);
//     // // Approve the treasury to spend DAI and Frax
//      await dai.approve(treasury.address, 11400000000 );
//      sleep(10000);
//     await frax.approve(treasury.address, largeApproval );
//     console.log("dai approval for treasury");
// sleep(10000);
//     // // Approve dai and frax bonds to spend deployer's DAI and Frax
//     //await dai.approve(daiBond.address, largeApproval );
//     sleep(10000);
//     await frax.approve(fraxBond.address, largeApproval );
//     console.log("dai and frax approval for bonds");
// sleep(10000);
//     // // Approve staking and staking helper contact to spend deployer's OHM
//     await ohm.approve(staking.address, largeApproval);
//     sleep(10000);
//     await ohm.approve(stakingHelper.address, largeApproval);
//     console.log("approve ohm for staking and staking helper");
// sleep(10000);
    // // Deposit 9,000,000 DAI to treasury, 600,000 OHM gets minted to deployer and 8,400,000 are in treasury as excesss reserves
    //  sleep(10000);
    // await treasury.deposit('11400000000', dai.address, '902700000000');
    // console.log("deposit 11.4k USDC in treasury, 2260 (IPNO) + 113 (Initial LP) BOC for deployer and 9027 in treasury as excess reserve");

//     // // Deposit 5,000,000 Frax to treasury, all is profit and goes as excess reserves
// //     await treasury.deposit('5000000000000000000000000', frax.address, '5000000000000000');
// //     console.log("deposit 5m FRAX in treasury, 0 BOC for deployer and 5m in treasury as excess reserve");
// // sleep(10000);
//     // // Stake OHM through helper
//     await stakingHelper.stake('100000000000');
//     console.log("Staking...");
// sleep(10000);
//     // // Bond 1,000 OHM and Frax in each of their bonds
//     await daiBond.deposit('1000000000000000000000', '60000', deployer.address );
//     sleep(10000);
//     await fraxBond.deposit('1000000000000000000000', '60000', deployer.address );
//     console.log("Deposit Frax and DAI bonds");
// sleep(10000);
//     console.log( "OHM: " + ohm.address );
//     // console.log( "DAI: " + dai.address );
//     // console.log( "Frax: " + frax.address );
//     console.log( "Treasury: " + treasury.address );
//     console.log( "Calc: " + olympusBondingCalculator.address );
//     console.log( "Staking: " + staking.address );
//     console.log( "sOHM: " + sOHM.address );
//     console.log( "Distributor " + distributor.address);
//     console.log( "Staking Wawrmup " + stakingWarmup.address);
//     console.log( "Staking Helper " + stakingHelper.address);
//     console.log("DAI Bond: " + daiBond.address);
//     console.log("Frax Bond: " + fraxBond.address);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})