
$(function () {
    const contract = new Contract();
    var maxremobeLiquidity;
    var removeall = false;
    contract._initConfig().then((res)=>{
        connectwallet();
    })
    function  current(account,pooladdress){
        let dtime = new Date();
        let rday = dtime.getUTCDate();
        let week = dtime.getUTCDay();
        week = 7 - week;
        let gday = rday + week;
        let dday = dtime.setUTCDate(gday);
        let dhour = dtime.setUTCHours(23);
        let dmin = dtime.setUTCMinutes(59);
        let dsecond = dtime.setUTCSeconds(59);
        let sday = dtime.getUTCDate();
        let shour = dtime.getUTCHours();
        let smin = dtime.getUTCMinutes();
        let ssecond = dtime.getUTCSeconds();
        setInterval(function () {
            let time = new Date();
            let day = time.getUTCDate();
            let hour = time.getUTCHours();
            let min = time.getUTCMinutes();
            let second = time.getUTCSeconds();
            let cday = sday - day;
            let chour = shour - hour;
            let cmin = smin - min;
            let csecond = ssecond - second;
            let timehtml = `${cday} d ${chour} h ${cmin} m ${csecond} s`;
            $('.time').text(timehtml);
            $.ajax({
                url:'http://3.112.196.38:8000/block',
                type:"GET",
                data:{
                    pooladdress:pooladdress,
                },
                success:(res)=>{
                    var sblock = res.startBlock;
                    $.ajax({
                        // url:'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber',//正式
                        url:'https://api-ropsten.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken',//ropsten
                        type:'GET',
                        success:(res)=>{
                            if(res.jsonrpc){
                                let mblock = +res.result;
                                let block = mblock-sblock;
                                $('.block').text(block)
                            }
                        }
                    })
                }
            })
            $.ajax({
                url:'http://3.112.196.38:8000/mintamount',
                type:"GET",
                data:{
                    pooladdress:pooladdress,
                    account:account
                },
                success:(res)=>{
                    $('.deri').text(res.mintAmount)
                }
            })
            
        }, 1000)
    }
    $('#connect-wallet').on('click',connectwallet);
    $('#Unlock').on('click',authorization)
    $("#addLiquidityButton").off('click').on('click', addLiquidity);
    $("#removeLiquidityButton").off('click').on('click', removeLiquidity);
     function connectwallet(){
         contract.connectWallet().then(res=>{
            if(res){
                let account = res[0];
                $('#connect-wallet').hide();
                $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
                isUnlock();
                getWalletBalance();
                getsymbol();
                getLiquidity();
                getNetLiquidity();
                perLiquidityShare();
                current(res[0],contract._pool_address)
                // poolSymbol();
            }else{
             alert('connection fail')
            }
        }).catch(err=>{
         })
        
    }
    function perLiquidityShare(){
        contract.perLiquidityShare().then(res=>{
            if(res=='NaN'){
                $('.value').eq(2).text('---')
            }else{
                let share = +res
                $('.value').eq(2).text(share.toFixed(6))
            }
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
            $('.my-liquidity').text(liquidity.toFixed(2))
        }).catch(err=>{
        })
    }
    function getWalletBalance(){
        contract.getWalletBalanceOf().then(res=>{
            let balance = +res.balance;
            $('#my-balance').text(balance.toFixed(2))
        }).catch(err=>{
        })
    }
    function getsymbol(){
        contract.getSymbol().then(res=>{
            $('.symbol').text(res)
        }).catch(err=>{
        })
    }
    function getNetLiquidity(){
        contract.getNetLiquidity().then(res=>{
            let NetLiquidity = +res;
            $('#total-liquidity').text(NetLiquidity.toFixed(2))
        }).catch(err=>{
        })
    }
    function addLiquidity(){
        let minAddLiquidity = contract.getMinAddLiquidity();
        let button = $('#addLiquidityButton');
        let marginInput = $('#liquidity-margin').val();
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
            enableButton(button)
            reset();
       }).catch(err=>{
       })
    }
    $('#removeall').on('click',function(){
        let button = $('#removeLiquidityButton');
        contract._getMaxRemoveLiquidity().then(res=>{
            let maxRemoveLiquidity = res.maxRemoveLiquidity;
            contract.removeLiquidity(maxRemoveLiquidity).then(res=>{
                enableButton(button)
                reset();
        })
        })
        $('#confrim').modal('hide');
    })
    function removeLiquidity(){
        let button = $('#removeLiquidityButton');
        let marginInput = $('#liquidity-volume').val();
        contract._getMaxRemoveLiquidity().then(res=>{
            let maxRemoveLiquidity = res.maxRemoveLiquidity;
            let isWalletConnected = contract.isWalletConnected()
            if(!isWalletConnected){
                alert('Please Connect MetaMask wallet first!');
                return;
            }
            let diff = (new BigNumber(maxRemoveLiquidity)).minus(new BigNumber(marginInput)).abs()
            if(diff.lte(new BigNumber(100))){
                $('#confrim').modal('show');
                $('.all').text(`Want to remove all (${maxRemoveLiquidity} shares)?`)
                if(!removeall){
                    return; 
                }else{
                    marginInput=maxRemoveLiquidity
                }
            }
            if(+marginInput > +maxRemoveLiquidity){
                alert(`The input liquidity cannot exceed  ${maxRemoveLiquidity}`)
                return;
            }
            if (marginInput <= 0 || isNaN(marginInput)) {
                alert('Invalid Liquidity!');
                return;
            }
            disableButton(button);
            contract.removeLiquidity(marginInput).then(res=>{
                enableButton(button)
                reset();
        })
        })
    }
    function reset(){
        getWalletBalance();
        getsymbol();
        getLiquidity();
        getNetLiquidity();
        perLiquidityShare();
        $('#liquidity-margin').val('');
        $('#liquidity-volume').val('')
    }
   
})