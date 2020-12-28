$(function () {
    const contract = new Contract();
    contract._initConfig().then((res) => {
        connectwallet();
    });
    function connectwallet() {
        contract.connectWallet().then(res => {
            console.log(res);
            if (res) {
                let account = res[0];
                $('#connect-wallet').hide();
                $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
            } else {
                alert('connection fail')
            }
        }).catch(err => {
            console.log(err)
        })

    }
    $('#obtain').on('click',add);
    function add(){
        let address = $('.form-control').val()
        if(address){
            try {
                let res = contract.mint(address,10000)
                alert('You get 10,000 USDT')
                $('.form-control').val('')
            } catch (error) {
                console.log(error)
            }
        }
        
    }
})