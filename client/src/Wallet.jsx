import { useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex } from 'ethereum-cryptography/utils'

function Wallet({ address, setAddress, balance, setBalance, privAddr, setPrivAddr }) {
	
	const [amount, setAmount] = useState(0);
	const [wallet, setWallet] = useState("");

	const handleGenerateWallet = async () => {
		
		const priv = secp256k1.utils.randomPrivateKey();
		const ethAddr = getEthAddress(secp256k1.getPublicKey(priv));
		setAddress(`0x${ethAddr}`);
		setPrivAddr(priv);

		const response = await server.post(`generate`, { body: { balance: amount, ethAddr } });
    	const balance = response.data.balance;
    	setBalance(100);	
	}
	
  async function onChange(evt) {
    const address = evt.target.value;
    setWallet(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <p className="generate-a-wallet">Generate a wallet below</p>
		{
			 (
				<>
					<div className="wallet-addr">WALLET: {address}</div>
					<div className="private-key"> Private key: {privAddr.slice(1,15)}....</div>
				</>
			)
	 	}

      <div className="balance">Balance: {balance}</div>	
			{
				!address && (
					<>
						<button className="generate-btn" onClick={handleGenerateWallet}>
							Generate wallet
						</button>
					</>
				)
			}
    </div>
  );
}

export default Wallet;

function getEthAddress(publicKey) {
	const hash = keccak256(publicKey.slice(1, publicKey.length));
	return (toHex(hash.slice(-20)));
}
