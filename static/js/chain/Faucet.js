$(function () {
    const contracts = new Contracts();
    let MAX_TEST_COIN_NUM = 10 ** 8;
    let SINGLE_COIN_NUM = 10 ** 5;
    initialize();

    function initialize() {
        contracts.init()
            .then((ret) => {
            })
            .catch((err) => {
                console.log(err);
            })
    }

    $("#getTestCoin").off('click').on('click', getTestCoin);

    function getTestCoin() {
        if (!contracts.isWalletConnected()) {
            alert('Please Connect MetaMask wallet first!');
            return;
        }
        let button = $("#getTestCoin");
        disableButton(button);
        let params = {
            from: contracts.account,
            value: 0,
        }
        contracts.getBalanceOf(contracts.btokenContract, contracts.account).then((ret) => {
            let balance = new BigNumber(ret / BONE);
            let amount = new BigNumber(SINGLE_COIN_NUM * BONE);
            let account = contracts.account;
            amount = amount.toFormat().replaceAll(",", "")
            if (balance.lt(new BigNumber(MAX_TEST_COIN_NUM))) {
                return contracts.mint(account, amount, params).then((ret) => {
                    console.log("ret");
                    showBalanceOf();
                    enableButton(button);
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                enableButton(button);
                alert("超出最大数量");
            }
        }).catch((err) => {
            enableButton(button);
        })
    }

    // 显示信息
    function showBalanceOf() {
        contracts.getBalanceOf(contracts.btokenContract, contracts.account).then((ret) => {
            console.log("设置余额显示");
            let balance = ret.dividedBy(BONE);
            $("#balance").text(balance.toFixed(2));
            $("#my-balance").text(balance.toFixed(2));
            $("#all-balance").text(balance.toFixed(2));
        }).catch((err) => {
            $("#all-balance").text("----");
        })
    }
})