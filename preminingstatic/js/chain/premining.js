
$(function () {
    const contract = new Chain();
    var maxremobeLiquidity;
    var removeall = false;
    var amount = 10000;
    var deadline = 1612411666;
   
    var minAddLiquidity,address,maxRemovableShares;
    connectwallet();
    $('#connect-wallet').on('click',connectwallet);
    $('#claimmyderi').on('click',mintDToken)
    $('#Unlock').on('click',authorization)
    $("#addLiquidityButton").off('click').on('click', addLiquidity);
    $("#removeLiquidityButton").off('click').on('click', removeLiquidity);
    $('.onedown').click(function(){
        $('.wp_context').eq(0).css({
            display:'block',
        })
        $('.img_down').eq(0).css({
            display:'none',
        })
        $('.img_up').eq(0).css({
            display:'block',
        })
    })
    $('.towdown').click(function(){
        $('.wp_context').eq(1).css({
            display:'block',
        })
        $('.img_down').eq(1).css({
            display:'none',
        })
        $('.img_up').eq(1).css({
            display:'block',
        })
    })
    $('.threedown').click(function(){
        $('.wp_context').eq(2).css({
            display:'block',
        })
        $('.img_down').eq(2).css({
            display:'none',
        })
        $('.img_up').eq(2).css({
            display:'block',
        })
    })
    $('.fourdown').click(function(){
        $('.wp_context').eq(3).css({
            display:'block',
        })
        $('.img_down').eq(3).css({
            display:'none',
        })
        $('.img_up').eq(3).css({
            display:'block',
        })
    })
    $('.fivedown').click(function(){
        $('.wp_context').eq(4).css({
            display:'block',
        })
        $('.img_down').eq(4).css({
            display:'none',
        })
        $('.img_up').eq(4).css({
            display:'block',
        })
    })
    $('.oneup').click(function(){
        $('.wp_context').eq(0).css({
            display:'none',
        })
        $('.img_down').eq(0).css({
            display:'block',
        })
        $('.img_up').eq(0).css({
            display:'none',
        })
    })
    $('.towup').click(function(){
        $('.wp_context').eq(1).css({
            display:'none',
        })
        $('.img_down').eq(1).css({
            display:'block',
        })
        $('.img_up').eq(1).css({
            display:'none',
        })
    })
    $('.threeup').click(function(){
        $('.wp_context').eq(2).css({
            display:'none',
        })
        $('.img_down').eq(2).css({
            display:'block',
        })
        $('.img_up').eq(2).css({
            display:'none',
        })
    })
    $('.fourup').click(function(){
        $('.wp_context').eq(3).css({
            display:'none',
        })
        $('.img_down').eq(3).css({
            display:'block',
        })
        $('.img_up').eq(3).css({
            display:'none',
        })
    })
    $('.fiveup').click(function(){
        $('.wp_context').eq(4).css({
            display:'none',
        })
        $('.img_down').eq(4).css({
            display:'block',
        })
        $('.img_up').eq(4).css({
            display:'none',
        })
    })
    function connectwallet(){
         contract.connectWallet().then(res=>{
            if (res.success) {
                contract.initialize(0).then(res=>{
                    let account = contract.account;
                    address=account;
                    $('#connect-wallet').hide();
                    if(ethereum.networkVersion!='3'){
                        $('#wrong').text('(Wrong Network!)')
                    }
                    $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
                    
                    isUnlock();
                    getWalletBalance();
                    getSpecification();
                    
                    getunclaimed()
                    getclainmed()
                    current();
                    deri(account,contract.addresses.pool)
                    getblock(contract.addresses.pool)
                    setInterval(function(){
                        getblock(contract.addresses.pool)
                    },60000)
                    setInterval(function () {
                        deri(account,contract.addresses.pool)
                    },60000)
                    getLiquidityInfo();
                })
            }
        }).catch(err=>{
            console.log(err)
         })
        
    }
    function getclainmed(){
        contract.getClainmed().then(res=>{
            console.log(res.amount)
            console.log(res.amount == undefined)
            console.log(!(res.amount== undefined))
            if(!(res.amount==undefined)){
                $('.claimderi').text((+res.amount).toFixed(2))
            }else{
                $('.claimderi').text('0')
            }
            
        });
    }
    function getunclaimed(){
        contract.getunClaimed().then(res=>{
            console.log(res)
            if(res==0){
                $('.unclaimed').text(res)
            }else{
                $('.unclaimed').text((+res).toFixed(2))
            }
            
        })
    }
    function  mintDToken() {
        let button = $('#claimmyderi');
        disableButton(button);
        contract.mintDToken().then(res=>{
            console.log(res)
            if(!res.success){
                alert('Claim fail')
            }
            enableButton(button)
            reset();
        })
    }
    function  deri(account,pooladdress) {
        $.ajax({
            url:'https://mining.deri.finance/mintamount',
            type:"GET",
            data:{
                pooladdress:pooladdress,
                account:account
            },
            success:(res)=>{
                // console.log(res)
                $('.deri').text(parseInt(res.mintAmount) )
            }
        })
    }
    function getblock(pooladdress){
        $.ajax({
            url:'https://mining.deri.finance/block',
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
        
    }
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
            
            
        }, 1000)
    }
    function authorization(){
        let button = $('#Unlock');
        disableButton(button);
        contract.unlock().then(res=>{
            enableButton(button);
            isUnlock();
        }).catch(err=>{
            console.log(err)
        })
    }
    function isUnlock(){
        contract.isUnlocked().then(res=>{
            if(res){
                $('#addLiquidityButton').show()
                $('#Unlock').hide()
            }else{
                $('#addLiquidityButton').hide()
                $('#Unlock').show()
            }
        }).catch(err=>{
            
        })
    }
    function getLiquidityInfo(){
        contract.getLiquidityInfo().then(res=>{
            maxRemovableShares=res.shares;
            let liquidity = +res.shares;
            let NetLiquidity = +res.poolLiquidity;
            $('#total-liquidity').text(NetLiquidity.toFixed(2))
            $('.my-liquidity').text(liquidity.toFixed(2))
            if(res.shareValue=='NaN'){
                $('.liquiditysharevalue').text('---')
            }else{
                let share = +res.shareValue
                $('.liquiditysharevalue').text(share.toFixed(6))
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function getWalletBalance(){
        contract.getWalletBalance().then(res=>{
            let balance = +res;
            $('#my-balance').text(balance.toFixed(2))
        }).catch(err=>{
            console.log(err)
        })
    }
    function getSpecification(){
        contract.getSpecification().then(res=>{
            minAddLiquidity = res.minAddLiquidity;
            $('.symbol').text(res.bSymbol)
        }).catch(err=>{
            console.log(err)
        })
    }
    function addLiquidity(){
        let button = $('#addLiquidityButton');
        let marginInput = $('#liquidity-margin').val();
        console.log(marginInput,minAddLiquidity);
        let isWalletConnected = address;
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
            if(!res.success){
                alert('failure of transaction');
            }
            enableButton(button)
            reset();
       })
    }
    $('#removeall').on('click',function(){
        let button = $('#removeLiquidityButton');
            disableButton(button);
            console.log(maxRemovableShares)
            contract.removeLiquidity(maxRemovableShares).then(res=>{
                if(!res.success){
                    alert('failure of transaction');
                }
                enableButton(button)
                reset();
        })
        $('#confrim').modal('hide');
    })
    function removeLiquidity(){
        let button = $('#removeLiquidityButton');
        let marginInput = $('#liquidity-volume').val();
            let maxRemoveLiquidity = maxRemovableShares;
            let isWalletConnected = address;
            if(!isWalletConnected){
                alert('Please Connect MetaMask wallet first!');
                return;
            }
            console.log(maxRemoveLiquidity)
            let diff = (new BigNumber(maxRemoveLiquidity)).minus(new BigNumber(marginInput)).abs()
            console.log(diff.lte(new BigNumber(100)))
            if(diff.lte(new BigNumber(100))){
                $('#confrim').modal('show');
                $('.all').text(`Want to remove all (${maxRemoveLiquidity} shares)?`)
                if(!removeall){
                    return; 
                }else{
                    marginInput=maxRemoveLiquidity
                }
            }
            console.log(+marginInput > +maxRemoveLiquidity)
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
                if(!res.success){
                    alert('failure of transaction');
                }
                enableButton(button)
                reset();
        })
        console.log(marginInput,maxremobeLiquidity);
        
    }
    function reset(){
        getWalletBalance();
        getSpecification();
        getLiquidityInfo();
        getclainmed();
        getunclaimed();
        $('#liquidity-margin').val('');
        $('#liquidity-volume').val('')
    }
   
})