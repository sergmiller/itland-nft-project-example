import ItlandNFT from './artifacts/ItlandNFT.json'

let config = {
	polygonRpc: "https://polygon.infura.io/v3/84653a332a3f4e70b1a46aaea97f0435",
 	chainId: 13,
 	collection: "0x167eb338a708f665b7a73de79ed870a7885b9669"
}

async function getWeb3Accounts(web3) {
    return await web3.eth.getAccounts();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomItem() {
  let idx = getRandomInt(10);
  if (idx <= 1) { // 0, 1 - 10%
    return idx;
  }
  if (idx <= 3) { // 2 ,3 -> 2 - 20%
    return 2;
  }
  if (idx <= 6) { // 4,5,6 -> 3 - 30%
    return 3;
  }
  return 4; // 7,8,9 -> 4 - 30%
}

export async function mintNewToken(ipfs, web3) {
    console.log("is web3 " + web3);
    const [creator] = await getWeb3Accounts(web3);
	console.log("creator is", creator);
// 	if (!collection) {
	let collection = config.collection
// 	}
	console.log("collection is", collection);
    let nftCollecton = new web3.eth.Contract(ItlandNFT.abi, collection);
    let tokenURI = ipfs
    console.log("tokenURI: " + tokenURI)
    let value = '0'
    try {
        let tx = nftCollecton.methods.mint(tokenURI).send({
            value: '0',
            from: creator
        });
//         console.log("TX: ", tx);
        return "https://rarible.com/collection/polygon/" + collection + "/items";
    }catch (e) {
        console.log(e.message)
        return "ERROR";
    }
}
