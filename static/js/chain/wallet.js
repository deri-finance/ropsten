class Wallet {
    connectWallet() {
        if (typeof window.ethereum != 'undefined') {
            let promise = ethereum.request({
                method: 'eth_requestAccounts'
            });
            this.ethereum = window.ethereum;
            return promise;
        } else {
            console.log('Connect MetaMask wallet failed!');
        }
    };

    getWeb3() {
        return new Web3(ethereum);
    };

    bindEvent() {
        this.ethereum.on('accountsChanged', (accounts) => {
            window.location.reload();
        });

        this.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
    }
}