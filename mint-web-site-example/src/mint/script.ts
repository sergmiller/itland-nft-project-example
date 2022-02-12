import ItlandNFT from './artifacts/ItlandNFT.json'

let config = {
	rinkebyRpc: "https://rinkeby.infura.io/v3/84653a332a3f4e70b1a46aaea97f0435",
 	rinkeby: "rinkeby",
 	ipfs: [
 	'https://gateway.pinata.cloud/ipfs/QmNmX9fb1JzkXcShX4uK2WjZjnGTNf3MhjD9XMgdCma4KC',
 	'https://gateway.pinata.cloud/ipfs/QmWSQwZwR5PwphSzRKMt6FKRrW1pwyLcSxtVCz8sAcV5fM',
 	'https://gateway.pinata.cloud/ipfs/QmWxKjcdBBWtqx7ojMLf7YB69DcoTgBmHEFWcw6fgAHtYe',
 	'https://gateway.pinata.cloud/ipfs/QmWzZwiRitqQNSKCB2ybE3sk8enPiTS23tuYe9cU1Q7WcT',
 	'https://gateway.pinata.cloud/ipfs/QmWCtsCGXU8sTdcv3u1emZfQDNFE63PWh8M4zbrreSBXAT',
 	],
 	chainId: 4,
 	owner: "0x8fd049EE1463A336D15b06Ae7c90DA141171C8a5",
 	collection: "0xe031d6e83992b2fe47d602a523f3a01829539212"
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

export async function mintNewToken(web3) {
    console.log("is web3 " + web3);
    const [creator] = await getWeb3Accounts(web3);
	console.log("creator is", creator);
    let nftCollecton = new web3.eth.Contract(ItlandNFT.abi, config.collection);
    let idx = getRandomItem()
    let tokenURI = config.ipfs[idx]
    console.log("tokenURI: " + tokenURI)
    let value = '0'
    if (creator != config.owner) {
        value = '10000000000000000' // 0.01 eth
    }
    try {
        let tx = nftCollecton.methods.mint(tokenURI).send({
            value: value,
            from: creator,
            gas: 1500000,
            gasPrice: '5000000000'
        });
//         console.log("TX: ", tx);
        return "https://rinkeby.rarible.com/collection/" + config.collection + "/items";
    }catch (e) {
        console.log(e.message)
        return "ERROR";
    }
}
