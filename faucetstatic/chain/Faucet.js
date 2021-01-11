$(function () {
    const contract = new Chain();
    var address;
    connectwallet();
    function connectwallet() {
        contract.connectWallet().then(res => {
            console.log(res);
            if(res.success){
                    load()
                    address = contract.account
                    let account = contract.account;
                    account =
                    account.slice(0, 6) +
                    "***" +
                    account.slice(account.length - 4, account.length);
                    $('#connect-wallet').hide();
                    if(ethereum.networkVersion!='3'){
                        $('#wrong').text('(Wrong Network!)')
                    }
                    $(".id").text(account);
                    $("#address").text(address)
            }else{
                alert(res.error)
            }
        }).catch(err => {
            console.log(err)
        })

    }
    async function load(){
        await contract._bindEvent()
    }
    $('#obtainU').on('click',addU);
    $('#obtainD').on('click',addD);
    function addU(){
        let btn = $('#obtainU')
        disableButton(btn)
        let id = 0;
        if(address){
            contract.connectWallet().then(res=>{
                if(res.success){
                    contract.initialize(id).then(() => {
                        contract.mint(address,10000).then(res=>{
                            console.log(res)
                            if(!res.success){
                                enableButton(btn)
                                return;
                            }
                            enableButton(btn)
                            alert('You  get 10000 USDT')
                        }).catch(err=>{
                            enableButton(btn)
                            console.log(err)
                        })
                    });
                }
            })
            
        }
        
        
    }
    function addD(){
        let btn = $('#obtainD')
        disableButton(btn)
        let id = 1;
        if(address){
            contract.connectWallet().then(res=>{
                if(res.success){
                    contract.initialize(id).then(() => {
                        contract.mint(address,10000).then(res=>{
                            console.log(res)
                            if(!res.success){
                                enableButton(btn)
                                return;
                            }
                            enableButton(btn)
                            alert('You  get 10000 DAI')
                        }).catch(err=>{
                            enableButton(btn)
                            console.log(err)
                        })
                    });
                }
            })
        }
        
    }
})