import LitJsSdk from 'lit-js-sdk';

const client = new LitJsSdk.LitNodeClient()
const chain = 'mumbai'
const standardContractType = 'ERC1155'
const tokenAddress = "0x9Af4eF8D4D0b6DB0894A2AAA78B4123e8DBaE089";
const hexStringToArrayBuffer = (hexString) => {
  hexString = hexString.replace(/^0x/, '');
  if (hexString.length % 2 != 0) {
    // eslint-disable-next-line no-console
    console.log('WARNING: expecting an even number of characters in the hexString');
  }
  const bad = hexString.match(/[G-Z\s]/i);
  if (bad) {
    // eslint-disable-next-line no-console
    console.log('WARNING: found non-hex characters', bad);
  }
  const pairs = hexString.match(/[\dA-F]{2}/gi);
  const integers = pairs.map(function (s) {
    return parseInt(s, 16);
  });
  const array = new Uint8Array(integers);
  return array.buffer;
}


export const encrypt=async(message,tokenId) =>{
      await client.connect()

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);
    let _tokenId = tokenId.toString();
    const accessControlConditions = [
      {
        contractAddress: tokenAddress,
        standardContractType,
        chain,
        method: "balanceOf",
        parameters: [":userAddress", _tokenId],
        returnValueTest: {
          comparator: ">=",
          value: "1",
        },
      },
    ];
    let litNodeClient= client
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    })
    // eslint-disable-next-line no-console
    console.log({
      // encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString('hex'),
      encryptedString: await encryptedString.arrayBuffer(),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    })
    return {
      encryptedString: Buffer.from(await encryptedString.arrayBuffer()).toString('hex'),
      // encryptedString: await encryptedString.arrayBuffer(),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
  }

  export const decrypt= async(encryptedString, encryptedSymmetricKey,tokenId) =>{
        await client.connect();
        let litNodeClient = client;
    let _tokenId = tokenId.toString();


    const accessControlConditions = [
      {
        contractAddress: tokenAddress,
        standardContractType,
        chain,
        method: "balanceOf",
        parameters: [":userAddress", _tokenId],
        returnValueTest: {
          comparator: ">=",
          value: "1",
        },
      },
    ];
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    const symmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions,
      // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig
    })
    const decryptedString = await LitJsSdk.decryptString(
      new Blob([hexStringToArrayBuffer(encryptedString)]), // hexStringToArrayBuffer(encryptedString),
      symmetricKey
    );
    // eslint-disable-next-line no-console
    console.log({
      decryptedString
    })
    return { decryptedString }
  }


