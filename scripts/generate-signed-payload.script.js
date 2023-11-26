const ethers = require('ethers');
const fs = require('fs');

// Call start
(async () => {
  let users = [];
  let payloads = [];
  for (let i = 0; i <= 2; i++) {
    const rawWallet = ethers.Wallet.createRandom();
    const username = `user${i + 1}`;
    const password = `changeme${i + 1}`;
    users.push({
      userId: i + 1,
      username,
      password,
      address: rawWallet.address,
    });

    const signer = new ethers.Wallet(rawWallet.privateKey);
    const date = new Date().getTime();
    const message = `${date}.${rawWallet.address}.${username}`;
    const signature = await signer.signMessage(message);
    payloads.push({ message, signature });
  }

  const userDataString = `export const userData = ${JSON.stringify(
    users,
    null,
    2,
  )};`;

  fs.writeFile(
    'scripts/payloads.json',
    JSON.stringify(payloads, null, 2),
    (err) => {
      if (err) throw err;
      console.log('payloads.json file has been saved!');
    },
  );

  fs.writeFile('src/users/users.ts', userDataString, (err) => {
    if (err) throw err;
    console.log('users.ts has been saved!');
  });
})();
