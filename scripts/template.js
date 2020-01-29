const runScript = require('../src/runScript');

runScript(async (token, ownerAddress, web3) => {
<<<<<<< HEAD
	web3.eth.sendTransaction({from:ownerAddress, to: ownerAddress, value: 0, gasLimit:21000, gasPrice:120000000000, nonce:34},function(e,t){
if(e){
console.log(e);
} if(!e){
console.log(t);
}

});
=======
  // Script here
>>>>>>> parent of c83aa24... PROD
})
  .then(() => console.log('done'))
  .catch(err => console.error(err));
