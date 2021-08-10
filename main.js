const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/881c459e3979425f864eb6ddde678e4a"))
const { addressFrom, privateKey, addressTo, etherToSend, gas } = require('./config.json')
const TIME = 15000 // 15 seconds


const deploy = async () => {
   console.log(`Attempting to make transaction from ${address} to ${addressTo}`)

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: web3.utils.toWei(etherToSend, 'ether'),
         gas: gas,
      },
      privateKey
   );

   // Deploy transaction
   const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction)

   console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`)
};


setInterval(async () => {
	try {
		await web3.eth.getBalance(addressFrom, function(err, result) {

			const etherResult = web3.utils.fromWei(result, 'ether')

	  		if (err) console.log(err)
	  		else { 

	  			console.log(etherResult + " ETH") 
	  		}

	  		if(etherResult > 0.001) {
	  			try {
	  				deploy()
	  			}
	  			catch(err) {
	  				console.log(err)
	  			}
	  		} else {
	  			console.log('test')
	  		}


	  			
		})
	}

	catch(err) {
		console.log(err)
	}
}, TIME)
