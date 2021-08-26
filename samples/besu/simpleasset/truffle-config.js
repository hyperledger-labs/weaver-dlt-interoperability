module.exports = {
  networks: {
    development: {
	 host: "localhost",
	 port: 9544, // 7545 - default for Ganache
	 network_id: "1338", // 4447 - default for Ganache
      //type: "fabric-evm",
      //from: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
	 from: "0x273CA8D6d755bE65EEE93b8a1b257030501d8A63",
      gasPrice: 0,
      gas: "0x1ffffffffffffe"
    }
  }
}






