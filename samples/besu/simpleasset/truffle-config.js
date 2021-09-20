module.exports = {
  networks: {
    development: {
	host: "localhost",
	port: 9544, // 7545 - default for Ganache
	network_id: "1338", // 4447 - default for Ganache
      //type: "fabric-evm",
      	from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
      	gasPrice: 0,
      	gas: "0x1ffffffffffffe"
    }
  }
}
