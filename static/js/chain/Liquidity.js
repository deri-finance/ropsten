
$(function () {
    const contract = new Contract();
    var maxremobeLiquidity;
    contract._initConfig().then((res)=>{
        connectwallet();
    })
    $('#connect-wallet').on('click',connectwallet);
    $('#Unlock').on('click',authorization)
    $("#addLiquidityButton").off('click').on('click', addLiquidity);
    $("#removeLiquidityButton").off('click').on('click', removeLiquidity);
     function connectwallet(){
         contract.connectWallet().then(res=>{
            console.log(res);
            if(res){
                let account = res[0];
                $('#connect-wallet').hide();
                $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
                isUnlock();
                getWalletBalance();
                getsymbol();
                getLiquidity();
                getNetLiquidity();
                getmragin();
                perLiquidityShare();
                poolSymbol();
            }else{
             alert('connection fail')
            }
        }).catch(err=>{
            console.log(err)
             alert('connection fail')
         })
        
    }
    function perLiquidityShare(){
        contract.perLiquidityShare().then(res=>{
            console.log(res)
            $('.value').eq(2).text(res)
        })
    }
    function poolSymbol(){
        contract.poolSymbol().then(res=>{
            $('.basetoken').text(res)
        })
    }
    function authorization(){
        let button = $('#Unlock');
        disableButton(button);
        contract.approveMax().then(res=>{
            enableButton(button);
            isUnlock();
        }).catch(err=>{
            console.log(err)
        })
    }
    function isUnlock(){
        contract.getAllowance().then(res=>{
            if(res.allowance!=='0'){
                $('#addLiquidityButton').show()
                $('#Unlock').hide()
            }else{
                $('#addLiquidityButton').hide()
                $('#Unlock').show()
            }
        }).catch(err=>{
            
        })
    }
    function getLiquidity(){
        contract.getLiquidity().then(res=>{
            let liquidity = +res;
            maxremobeLiquidity=liquidity;
            console.log('maxremobeLiquidity',maxremobeLiquidity)
            $('.my-liquidity').text(liquidity.toFixed(2))
        }).catch(err=>{
            console.log(err)
        })
    }
    function getWalletBalance(){
        contract.getWalletBalanceOf().then(res=>{
            let balance = +res.balance;
            $('#my-balance').text(balance.toFixed(2))
        }).catch(err=>{
            console.log(err)
        })
    }
    function getsymbol(){
        contract.getSymbol().then(res=>{
            console.log(res)
            $('.symbol').text(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    function getNetLiquidity(){
        contract.getNetLiquidity().then(res=>{
            console.log(res)
            let NetLiquidity = +res;
            $('#total-liquidity').text(NetLiquidity.toFixed(2))
        }).catch(err=>{
            console.log(err)
        })
    }
    function addLiquidity(){
        let minAddLiquidity = contract.getMinAddLiquidity();
        let button = $('#addLiquidityButton');
        let marginInput = $('#liquidity-margin').val();
        console.log(marginInput,minAddLiquidity);
        let isWalletConnected = contract.isWalletConnected()
        if(!isWalletConnected){
            alert('Please Connect MetaMask wallet first!');
            return;
        }
        if(+marginInput < +minAddLiquidity){
            alert(`The input liquidity shall not be less than ${minAddLiquidity}`)
            return;
        }
        if (+marginInput <= 0 || isNaN(marginInput)) {
            alert('Invalid Liquidity!');
            return;
        }
        disableButton(button);
        contract.addLiquidity(marginInput).then(res=>{
            console.log(res)
            enableButton(button)
            reset();
       })
    }
    function removeLiquidity(){
        let button = $('#removeLiquidityButton');
        let marginInput = $('#liquidity-volume').val();
        contract._getMaxRemoveLiquidity().then(res=>{
            console.log(res);
            let maxRemoveLiquidity = +res.maxRemoveLiquidity;
            
            let isWalletConnected = contract.isWalletConnected()
            if(!isWalletConnected){
                alert('Please Connect MetaMask wallet first!');
                return;
            }
            if(+marginInput > maxRemoveLiquidity){
                alert(`The input liquidity cannot exceed  ${maxRemoveLiquidity}`)
                return;
            }
            if (+marginInput <= 0 || isNaN(marginInput)) {
                alert('Invalid Liquidity!');
                return;
            }
            disableButton(button);
            contract.removeLiquidity(marginInput).then(res=>{
                console.log(res)
                enableButton(button)
                reset();
        })
        })
        console.log(marginInput,maxremobeLiquidity);
        
    }
    function reset(){
        getWalletBalance();
        getsymbol();
        getLiquidity();
        getNetLiquidity();
        getmragin();
        $('#liquidity-margin').val('');
        $('#liquidity-volume').val('')
    }
    function getmragin(){
        contract.exists().then(res=>{
            console.log(res)
            if(res){
                contract.getPositionInfo().then(res=>{
                    console.log(res)
                    let allMargin = +res.allMargin
                    console.log(allMargin)
                    $('.marginNum').text(allMargin.toFixed(2))
                }).catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
})