const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require('ethereum-cryptography/keccak');

// generate private key
const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

// fetch public key
const publicKey = secp256k1.getPublicKey("77b93429d680473bc4266e76718fea96322fb5cc81feb7ea780d2a793274d8f1");
console.log('public key:', toHex(publicKey));

// generate address from last 20bytes of public key
const address = (keccak256(publicKey.slice(1)).slice(-20));
console.log("Address: ", toHex(address));