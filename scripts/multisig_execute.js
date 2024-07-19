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

const BOCNFTAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'
const BOCNFTLaunchPremierAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'
const BOCNFTLaunchExclusiveAddress = '0x256e4532d42542Fe36B6F1d1439e91F31d9c70BE'
const FraxAddress = '0xF2001B145b43032AAF5Ee2884e456CCd805F677D'
const TreasuryAddress = '0x2E2f69acbfb6dDFCeA637424Ee96a0acD5eDC2ba'
const OlympusBondingCalculatorAddress = '0x4899FB567875536e14967E4aC147Fe04976098A0'
const DistributorAddress = '0x6392e507AB4d4d7501B0226A483432199C52aaC8'
const SBOCAddress = '0xBA6CDb55296281FC931BABdf1cF383Dce87Ea110'
const StakingAddress = '0x52A74D075c19B2eDF284650e9be2Aa4A60b0b712'
const StakingWarmpupAddress = '0x646283A39796b79cF7B12Ceb7442D9001EC5E1e0'
const StakingHelperAddress = '0x3BaD754ae47BBE5aaa2Cc1920E62d81692679059'
const DAIBondAddress = '0x46201dD00B1f5A01641d0c4302689D195FF3064a'
const FraxBondAddress = '0x2Cd04805Ac676a57CE1DaEE3D3a98cEA7122B7bD'
const ExercisePOLYBondAddress = ''
const pBOCBondAddress = ''

const CronaswapFactoryAddress = '0x004615D9cCab58bDE10877BE03F053c94599F3ce'
const CronaswapRouterAddress = '0x989dBb40f0B8a431e9D79dfd28fdC3df3717D9c0'



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
    console.log('1');
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


    //const data = dai.methods.transfer(deployer.address, initialMint).encodeABI();// Submit operation to multisig


    const multisig_dai = await dai.balanceOf[multisig.address];

    //abiCoder = await new ethers.utils.AbiCoder();
    //const data = abiCoder.encode([ "address", "uint" ], [ deployer.address, 22700000000 ]);0x00f1Ab7F7D754f237629E93b32606ca1561d20f1
    const data = "0x095ea7b300000000000000000000000000f1ab7f7d754f237629e93b32606ca1561d20f10000000000000000000000000000000000000000000000000000000549068300"
    const data2 = "0xa9059cbb000000000000000000000000fee202cf98c1f47cf23975689880afd5b8e7073d0000000000000000000000000000000000000000000000000000000549068300"
    // let tx = await multisig.submitTransaction(dai.address, 0, data);
    //  sleep(10000);
    // let tx2 = await multisig.submitTransaction(dai.address, 0, data2)
    let tx = await multisig.executeTransaction(0);
     sleep(30000);
    let tx2 = await multisig.executeTransaction(1);

    //let tx = await multisig.executeTransaction(3);


    let t1 =  await multisig.getTransactionCount(true,true);
    console.log( "const Tx = '" + tx + "'")
    console.log( "const 0 = '" + t2 + "'")
    // console.log( "const multisig_dai = '" + multisig_dai + "'")
    // console.log( "const 2 = '" + multisig.transactions[2] + "'")
    // console.log( "const 3 = '" + multisig.transactions[3] + "'")
    // console.log( "const 4 = '" + multisig.transactions[4]+ "'")
    // console.log( "const 5 = '" + multisig.transactions[5] + "'")

//
//     // const CronaswapFactory = await ethers.getContractFactory('CronaSwapFactory');
//     // const CronaswapRouter = await ethers.getContractFactory('CronaSwapRouter');
//     const CSFactory = await ethers.getContractFactory("CronaSwapFactory");
//     const CSFactorycontract = await CSFactory.attach(CronaswapFactoryAddress);
//     await CSFactorycontract.createPair(BOCAddress,DAIAddress);
//     sleep(20000);
//     const LPaddress = await CSFactorycontract.getPair(BOCAddress,DAIAddress);
//     sleep(20000);
//     //console.log("Deploying Initial Liquidity Pool");
//     console.log( "const LPAddress = '" + LPaddress.toString() + "'")
//     //
//     //  sleep(10000);
//
// //     //
// //     // // // Deploy treasury
// //     // // //@dev changed function in treaury from 'valueOf' to 'valueOfToken'... solidity function was coflicting w js object property name
// const Treasury = await ethers.getContractFactory('BankofCronosTreasury');
//     const treasury = await Treasury.deploy(BOCAddress, DAIAddress, FraxAddress, LPaddress,  0 );
//     //console.log("Deploying treasury");
//     console.log( "const TreasuryAddress = '" + treasury.address + "'");
//     sleep(10000);
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
//     //await dai.approve(treasury.address, largeApproval );
//     sleep(10000);
//     await frax.approve(treasury.address, largeApproval );
//     console.log("dai and frax approval for treasury");
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
//     // // Deposit 9,000,000 DAI to treasury, 600,000 OHM gets minted to deployer and 8,400,000 are in treasury as excesss reserves
// //     await treasury.deposit('8000000000000000000000', dai.address, '632000000000');
// //     console.log("deposit 8k USDC in treasury, 1600 (IPNO) + 80 (Initial LP) BOC for deployer and 6320 in treasury as excess reserve");
// // sleep(10000);
// //     // // Deposit 5,000,000 Frax to treasury, all is profit and goes as excess reserves
// // //     await treasury.deposit('5000000000000000000000000', frax.address, '5000000000000000');
// // //     console.log("deposit 5m FRAX in treasury, 0 BOC for deployer and 5m in treasury as excess reserve");
// // // sleep(10000);
// //     // // Stake OHM through helper
// //     await stakingHelper.stake('100000000000');
// //     console.log("Staking...");
// // sleep(10000);
// //     // // Bond 1,000 OHM and Frax in each of their bonds
// //     await daiBond.deposit('1000000000000000000000', '60000', deployer.address );
// //     sleep(10000);
// //     await fraxBond.deposit('1000000000000000000000', '60000', deployer.address );
// //     console.log("Deposit Frax and DAI bonds");
// // sleep(10000);
// //     console.log( "OHM: " + ohm.address );
// //     // console.log( "DAI: " + dai.address );
// //     // console.log( "Frax: " + frax.address );
// //     console.log( "Treasury: " + treasury.address );
// //     console.log( "Calc: " + olympusBondingCalculator.address );
// //     console.log( "Staking: " + staking.address );
// //     console.log( "sOHM: " + sOHM.address );
// //     console.log( "Distributor " + distributor.address);
// //     console.log( "Staking Wawrmup " + stakingWarmup.address);
// //     console.log( "Staking Helper " + stakingHelper.address);
// //     console.log("DAI Bond: " + daiBond.address);
// //     console.log("Frax Bond: " + fraxBond.address);
}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})