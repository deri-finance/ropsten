$(function () {
    const contract = new Chain();
    connectwallet();
    function connectwallet() {
        contract.connectWallet().then(res => {
            console.log(res);
            if(res.success){
                    let account = contract.account;
                    $('#connect-wallet').hide();
                    $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
            }else{
                alert(res.error)
            }
        }).catch(err => {
            console.log(err)
        })

    }
    $('#obtainU').on('click',addU);
    $('#obtainD').on('click',addD);
    function addU(){
        let btn = $('#obtainU')
        disableButton(btn)
        let id = 0;
        let address = $('.form-control').val()
        if(address){
            contract.initialize(id).then(() => {
                console.log('aa')
                contract.mint(address,10000).then(res=>{
                    console.log(res)
                    enableButton(btn)
                    alert('You  get 10000 USDT')
                }).catch(err=>{
                    enableButton(btn)
                    console.log(err)
                })
                    // alert('You get 10,000 USDT')
                    // $('.form-control').val('')
            });
        }
        
        
    }
    function addD(){
        let btn = $('#obtainD')
        disableButton(btn)
        let id = 1;
        let address = $('.form-control').val()
        if(address){
            contract.initialize(id).then(() => {
                console.log('aa')
                contract.mint(address,10000).then(res=>{
                    enableButton(btn)
                    $('.form-control').val('')
                    alert('You  get 10000 DAI')
                }).catch(err=>{
                    enableButton(btn)
                    $('.form-control').val('')
                    console.log(err)
                })
                    // alert('You get 10,000 USDT')
                    // $('.form-control').val('')
            });
        }
        
    }
})