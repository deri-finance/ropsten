$(function () {
    localStorage.setItem('conun','');
    const contract = new Contract();
    var leverage,mfee;
    var tag = false,ox = 0,left = 0,bgleft = 0,l_left;
    $("#connect-wallet").on('click', connectwallet);
    $('#trade_close').on('click',close);
    $('.bi-chevron-down').on('click',marginshow);
    $('.bi-chevron-up').on('click',marginhide);
    $('#closeposition').on('click',closeposition);
    function closeposition(){
        let button = $('#closeposition');
        disableButton(button)
        contract.closePosition().then(res=>{
            if(res=='0'){
                alert('Not to take positions');
                reset();
                enableButton(button);
                return
            }else if(res=='1'){
                alert('Position 0 does not need to be closed');
                reset();
                enableButton(button);
                return
            }else{
                reset();
                enableButton(button);
                return
            }
        }).catch(err=>{
            alert('Unwind failure')
            reset();
            enableButton(button);
            return;
        });
    }
    function marginshow(){
        $('#optional').show();
        $('.bi-chevron-up').show();
        $('.bi-chevron-down').hide();
    }
    function marginhide(){
        $('#optional').hide();
        $('.bi-chevron-up').hide();
        $('.bi-chevron-down').show();
    }
    function close(){
        $('#trade').hide();
        localStorage.setItem('conun',1);
        localStorage.setItem('transactionHash',$('.transactionHash ').text());
    }
    var walletBalance,maxmargin;
    contract._initConfig().then((res) => {
        connectwallet();
    })
    $('#Unlock').on('click',authorization);
    function authorization(){
        let button = $('#Unlock');
        disableButton(button);
        button.attr('disabled')
        contract.approveMax().then(res=>{
            enableButton(button);
            isUnlock();
        }).catch(err=>{
            console.log(err)
        })
    }
    function tradeEvent(){
        let isClick = localStorage.getItem('conun');
       
        contract.tradeEvent().then(res=>{
            setTimeout(
                function(){
                    let list = contract.event_list;  
                    let lastIndex;
                    if(list.length){
                        if(localStorage.getItem('transactionHash')){
                            lastIndex= localStorage.getItem('transactionHash');
                        }else{
                            lastIndex = localStorage.setItem('transactionHash',list[list.length-1].transactionHash);
                        }
                        let cur_index = list[list.length-1].transactionHash;
                        console.log(cur_index,lastIndex,isClick)
                        console.log((cur_index!=lastIndex)||(cur_index==lastIndex&&!isClick))
                        console.log(Boolean(isClick) )
                        console.log(isClick);
                        console.log(cur_index==lastIndex)
                        if((cur_index!=lastIndex)){
                            $('#trade').show();
                        }else if(cur_index==lastIndex){
                            console.log("不显示")
                            $('#trade').hide();
                        }
                        $('.transactionHash').text(list[list.length-1].transactionHash);
                    }
                    contract.event_list=[];
                },1000);
        }).catch(err=>{
            console.log(err)
        });
        
        
        
    }
    // setTimeout(tradeEvent,1000)
    // setInterval(tradeEvent,5000)
    function isUnlock(){
        contract.getAllowance().then(res=>{
            console.log(res)
            // if(res){
            //     if($('#groups').hasClass('checkshort')){
            //         $('#affirm_short').show();
            //         $('#affirm_long').hide();
            //         $('#Unlock').hide()
            //     }else{
            //         $('#affirm_short').hide();
            //         $('#affirm_long').show();
            //         $('#Unlock').hide()
            //     }
            // }else{
            //     $('#affirm_short').hide();
            //     $('#affirm_long').hide();
            //     $('#Unlock').show()
            // }
            if(res.allowance!=='0'){
                if($('#groups').hasClass('checkshort')){
                    $('#affirm_short').show();
                    $('#affirm_long').hide();
                    $('#Unlock').hide()
                }else{
                    $('#affirm_short').hide();
                    $('#affirm_long').show();
                    $('#Unlock').hide()
                }
                
            }else{
                $('#affirm_short').hide();
                $('#affirm_long').hide();
                $('#Unlock').show()
            }
        }).catch(err=>{
            
        })
    }
    function connectwallet() {
        contract.connectWallet().then(res => {
            console.log(res);
            if (res) {
                let account = res[0];
                $('#connect-wallet').hide();
                $(".id").text(account.slice(0, 6) + '***' + account.slice(account.length - 4, account.length));
                isUnlock();
                getPositionInfo();
                getsymbol();
                getWalletBalance();
                getPoolTradeParams();
                poolSymbol();
                calLiquidationPrice();
                // calVolume();
            } else {
                alert('connection fail')
            }
        }).catch(err => {
            console.log(err)
        })

    }
    function getWalletBalance(){
        contract.getWalletBalanceOf().then(res=>{
            let balance = +res.balance;
            walletBalance= balance;
            $('#balance').text(balance.toFixed(2))
        }).catch(err=>{
            console.log(err)
        })
    }
    function getsymbol() {
        contract.getSymbol().then(res => {
            console.log(res)
            $('.symbol').text(res)
        }).catch(err => {
            console.log(err)
        })
    }
    
    function getPoolTradeParams(){
        let PoolTradeParams = contract.getPoolTradeParams()
        console.log(PoolTradeParams);
        let multiplier = PoolTradeParams.multiplier;
        let feeRatio = PoolTradeParams.feeRatio*100;
        console.log(multiplier)
        let fundingRateCoefficient = PoolTradeParams.fundingRateCoefficient;
        let minInitialMarginRatio = PoolTradeParams.minInitialMarginRatio*100;
        let minMaintenanceMarginRatio= PoolTradeParams.minMaintenanceMarginRatio*100;
        
        $('.value').eq(5).text(fundingRateCoefficient)
        $('.value').eq(4).text(multiplier)
        $('.value').eq(6).text(minInitialMarginRatio+'%');
        $('.value').eq(7).text(minMaintenanceMarginRatio+'%');
        $('.value').eq(8).text(feeRatio+'%')
    }
    function getPositionInfo() {
        contract.exists().then(res => {
            console.log(res)
            if (res) {
                contract.getPositionInfo().then(res => {
                    console.log(res)
                    let allMargin = +res.allMargin;
                    maxmargin=allMargin;
                    let position = res.position;
                    let averageEntryPrice = +res.averageEntryPrice;
                    let marginHeld = +res.marginHeld;
                    let lastCumuFundingRate = +res.lastCumuFundingRate;
                    $('.marginNum').text(allMargin.toFixed(2));
                    $('.value').eq(0).text(position);
                    if(isNaN(averageEntryPrice)){
                        $('.value').eq(1).text('---');
                    }else{
                        $('.value').eq(1).text(averageEntryPrice.toFixed(2));
                    }
                    $('.value').eq(2).text(marginHeld.toFixed(2));
                    $('.value').eq(3).text(lastCumuFundingRate.toFixed(8));
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    // 绑定事件
    $("#depositMarginButton").off("click").on("click", depositMargin);
    $("#withdrawMarginButton").off("click").on("click", withdrawMargin);
     $("#resultlong").off('click').on('click', place_order_buy);
    $("#resultshort").off('click').on('click', place_order_sell);
    function place_order_buy(){
        let button = $("#place-order-buy");
        $('#resultlong').hide();
        $('#long_close').hide();
        $('#pengding').show();
        let margin = $('.payment').eq(0).text();
        let volume =$('#place-order-volume').val();
        console.log(volume)
        console.log(isNaN(volume))
        if(margin<0){
            alert('volume has to be greater than zero')
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide');
            return;
        }
        if(isNaN(margin)){
            alert('Please enter the correct number');
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide');
            return;
        }
        if(isNaN(volume)){
            alert('Please enter a positive number')
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide');
            return;
        }
        if(volume<0){
            alert('volume has to be greater than zero')
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide')
            return;
        }
        if(+volume !== parseInt(volume)){
            $("#place-order-volume").val('');
            alert('volume  must be round');
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide')
            return;
        }
        contract.tradeWithMargin(margin,volume).then(res=>{
            console.log(res)
            if(!res.status){
                alert('Place  order failed')
            }
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#exampleModal').modal('hide')
            reset();
        }).catch(err=>{
            console.log(err)
        })
    }
    
    function calLiquidationPrice(){
        contract.calLiquidationPrice().then(res=>{
            console.log(res)
            if(!res.status){
                $('.Liquidationprice').text(res.LiquidationPrice);
            }else{
                if(res.LiquidationPrice=='--'){
                    $('.Liquidationprice').text(res.LiquidationPrice)
                }else{
                    let Liquidationprice  = +res.LiquidationPrice;
                    console.log(Liquidationprice)
                    
                    $('.Liquidationprice').text(Liquidationprice.toFixed(2));
                }
            }
        })
    }
    function place_order_sell(){
        $('#resultshort').hide();
        $('#short_close').hide();
        $('#short_pengding').show();
        let margin = $('.payment').eq(1).text();
        let volume =$('#place-order-volume').val();
        console.log(volume)
        if(margin<0){
            margin=0;
        }
        if(isNaN(volume)){
            alert('Please enter a positive number')
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#modalshort').modal('hide')
            return;
        }
        if(+volume !== parseInt(volume)){
            $("#place-order-volume").val('');
            alert('volume  must be round');
            $('#resultlong').show();
            $('#long_close').show();
            $('#pengding').hide();
            $('#modalshort').modal('hide')
            return;
        }
        volume = -1 * volume;
        console.log(volume,margin)
        contract.tradeWithMargin(margin,volume).then(res=>{
            console.log(res)
            if(!res.status){
                alert('Place  order failed')
            }
            $('#resultshort').show();
            $('#short_close').show();
            $('#short_pengding').hide();
            $('#modalshort').modal('hide')
            reset();
        }).catch(err=>{
            console.log(err)
        })
    }
    function poolSymbol(){
        contract.poolSymbol().then(res=>{
            console.log(res)
            $('.svalue').text(res)
        })
    }
    $('#checklongs').on('click',function(){
        $('#groups').removeClass('checkshort');
        $('#text-mute-short').hide();
        $('#text-mute-long').show();
        leverage=0;
        $('#affirm_short').hide();
        $('#affirm_long').show();
        $('#place-order-margin').val('');
        $('.rc-slider-handle').css('left','0%');
        $('.long').text('0');
        $('.short').text('0');
        $('.modal_leverage').text('--')
        $('#place-order-volume').val('');
        $('.payment').text('0');
        $('.modal_margin').text('0');
        isUnlock();
    })
    $('#checkshorts').on('click',function(){
        $('#groups').addClass('checkshort');
        $('#text-mute-short').show();
        leverage=0;
        $('#text-mute-long').hide();
        $('#affirm_short').show();
        $('#affirm_long').hide();
        $('#place-order-margin').val('');
        $('#place-order-volume').val('');
        $('.modal_leverage').text('--')
        $('.rc-slider-handle').css('left','0%');
        $('.long').text('0');
        $('.short').text('0');
        $('.payment').text('0');
        $('.modal_margin').text('0')
        isUnlock();
    })
    $('#showmargin').on('click',function(){
        $('#place_margin').show();
        $('#leverageWrapper').hide();
        $('.rc-slider-handle').css('left','0%');
        leverage=0;
        $('.long').text('0');
        $('.short').text('0');
        $('.payment').text('0');
        $('.modal_margin').text('0')
        $('.modal_leverage').text('--')

        
    })
    $('#closemargin').on('click',function(){
        $('#place_margin').hide();
        $('#leverageWrapper').show();
        leverage=0;
        $('#place-order-margin').val('');
        $('.modal_leverage').text('--')
        $('.long').text('0');
        $('.short').text('0');
        $('.payment').text('0');
        $('.modal_margin').text('0');
        
    })
    $("#place-order-margin").bind('input porpertychange', showMaxVolume);
    $("#place-order-volume").bind('input porpertychange', showContracts);
    function showMaxVolume(){
        let margin = + $("#place-order-margin").val();
        console.log(margin)
        
        $('.long').text(margin);
        $('.short').text(margin);
        $('.modal_margin').text(margin);
        console.log(margin,mfee)
        let fee = margin + mfee
        console.log(fee)
        $('.payment').text(fee.toFixed(2));
    }
    function showContracts(){
        let volume = +$("#place-order-volume").val();
        let position = $('.value').eq(0).text();
        let afterposition;
        if(position!='---'){
            position=+position
            if($('#groups').hasClass('checkshort')){
                
                afterposition = position - volume
            }else{
                afterposition = position + volume
            }
        }else{
            if($('#groups').hasClass('checkshort')){
                afterposition =  '-'+volume
            }else{
                afterposition =  volume
            }
        }
        
        
        $('.afterposition').text(afterposition)
        console.log(volume)
        
        $('.modal_contracts').text(volume);
        console.log(leverage)
        if(!leverage){
            calMargin(volume)
        }else{
            calMargin(volume,leverage)
        }
    }
    $('.rc-slider-dot').unbind('mouseup');
    $('.rc-slider-dot').on('click',function(){
        let index = $(this).index()
        let left = 12.5*index;
        let volume = $('#place-order-volume').val()
        $('.rc-slider-handle').css('left',`${left}%`);
        
        if($('.rc-slider-mark-text').eq(index).text()=='0 Margin'){
            leverage=0;
            $('.modal_leverage').text('--');
        }else{
            leverage=parseInt($('.rc-slider-mark-text').eq(index).text()) ;
            $('.modal_leverage').text(leverage+'x');
        }
        console.log(volume,leverage)
        if(volume&&leverage){
            console.log(leverage)
            calMargin(volume,leverage)
            
        }
        
       
        console.log($('.modal_leverage').text())
        if(leverage==0){
            $('.long').text(0);
            $('.short').text(0);
            $('.modal_margin').text('0');
            console.log($('.fee').text())
            $('.payment').text(mfee)
        }
    });
    $('.rc-slider-dot').mouseup(function(event){
        event.stopPropagation();
    })
    $('.rc-slider-handle').mousedown(function(e) {
        ox = e.pageX - left;
        tag = true;
    });
    $('.leverage').mouseup(function() {
        let volume = $('#place-order-volume').val();
        $('.modal_leverage').text(leverage+'x');
        console.log(leverage)
        if(volume&&leverage){
            calMargin(volume,leverage)
        }
        tag = false;
    });
    $('.leverage').mousemove(function(e) {//鼠标移动
        if (tag) {
            left = e.pageX - ox;
            if(left>0&&left<=50){
                l_left = 12.5;
                leverage=parseInt($('.rc-slider-mark-text').eq(1).text()) ;
            }else if(left>50&&left<=100){
                l_left = 25;
                leverage=parseInt($('.rc-slider-mark-text').eq(2).text()) ;
            }else if(left>100&&left<=150){
                l_left = 37.5;
                leverage=parseInt($('.rc-slider-mark-text').eq(3).text()) ;
            }else if(left>150&&left<=200){
                l_left = 50;
                leverage=parseInt($('.rc-slider-mark-text').eq(4).text()) ;
            }else if(left>200&&left<=250){
                l_left = 62.5;
                leverage=parseInt($('.rc-slider-mark-text').eq(5).text()) ;
            }else if(left>250&&left<=300){
                l_left = 75;
                leverage=parseInt($('.rc-slider-mark-text').eq(6).text()) ;
            }else if(left>300&&left<=350){
                l_left = 87.5;
                leverage=parseInt($('.rc-slider-mark-text').eq(7).text()) ;
            }else if(left>350&&left<=400){
                l_left = 100;
                leverage=parseInt($('.rc-slider-mark-text').eq(8).text()) ;
            }else  if(left=0){
                l_left=0;
                leverage=0;
            }
            $('.rc-slider-handle').css('left', `${l_left}%`);
        }
    });
    function upFixed (num, fix) {
        // num为原数字，fix是保留的小数位数
        let result = '0'
        if (Number(num) && fix > 0) { // 简单的做个判断
          fix = +fix || 2
          num = num + ''
          if (/e/.test(num)) { // 如果是包含e字符的数字直接返回
            result = num
          } else if (!/\./.test(num)) { // 如果没有小数点
            result = num + `.${Array(fix + 1).join('0')}`
          } else { // 如果有小数点
            num = num + `${Array(fix + 1).join('0')}`
            let reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`)
            let floorStr = reg.exec(num)[0]
            if (+floorStr >= +num) {
              result = floorStr
            } else {
              let floorNumber = +floorStr + +`0.${Array(fix).join('0')}1`
              let point = /\./.test(floorNumber + '') ? '' : '.'
              let floorStr2 = floorNumber + point + `${Array(fix + 1).join('0')}`
              result = reg.exec(floorStr2)[0]
            }
          }
        }
        return result
      }
    function calMargin(volume,leverage){
        console.log(volume,leverage)
        contract.calMargin(volume,leverage).then(res=>{
            console.log(res);
            let payment;
            let margin = +res.margin;
            margin = +upFixed(margin,2);
            console.log(margin)
            contract.calFee(volume).then(res=>{
                console.log(res.fee)
                let fee = +res.fee;
                fee = upFixed(fee,2);
                payment= +fee;
                mfee = +fee;
                $('.fee').text(fee);
                console.log()
                if($("#place_margin").css("display")=="none"){
                    if(leverage==undefined){
                        console.log(payment)
                        $('.long').text('0');
                        $('.short').text('0');
                        $('.modal_margin').text('0')
                        $('.payment').text(payment)
                    }else{
                        $('.long').text(margin);
                        $('.short').text(margin);
                        console.log(margin,payment)
                        payment= margin+payment;
                        payment = upFixed(payment,3)
                        $('.modal_margin').text(margin)
                        $('.payment').text(payment)
                    }
                }else{
                    margin = +$('#place-order-margin').val()
                    console.log(margin,payment)
                    payment= margin+payment;
                    payment = upFixed(payment,3)
                    $('.payment').text(payment)
                }
            })
        })
    }
    function depositMargin(){
        let depositMargininput = $('#depositMargin').val();
        let button = $("#depositMarginButton");
        let isWalletConnected = contract.isWalletConnected();
        if(!isWalletConnected){
            alert('Please Connect MetaMask wallet first!');
            return;
        }
        if(depositMargininput>walletBalance){
            alert('Insufficient balance in wallet');
            return
        }
        if(+depositMargininput<=0||isNaN(depositMargininput)){
            alert('It has to be greater than zero');
            return;
        }
        disableButton(button);
        contract.depositMargin(depositMargininput).then(res=>{
            console.log(res);
            enableButton(button);
            reset();
        })
    }

    function withdrawMargin(){
        let withdrawMarginput = $('#withdrawMargin').val();
        let button = $("#withdrawMarginButton");
        console.log(withdrawMarginput)
        let isWalletConnected = contract.isWalletConnected();
        if(!isWalletConnected){
            alert('Please Connect MetaMask wallet first!');
            return;
        }
        if(withdrawMarginput>maxmargin){
            alert('under margin');
            return;
        }
        if(+withdrawMarginput<=0||isNaN(withdrawMarginput)){
            alert('It has to be greater than zero');
            return;
        }
        disableButton(button);
        contract.withdrawMargin(withdrawMarginput).then(res=>{
            console.log(res);
            if(!res.status){
                alert('insufficient margin o withdrow');
            }
            enableButton(button);
            reset();
        })
    }

    function reset(){
        getPositionInfo();
        getsymbol();
        getWalletBalance();
        getPoolTradeParams();
        
        calLiquidationPrice();
        // calVolume();
        $('#depositMargin').val('');
        $('#withdrawMargin').val('');
        $('#place-order-volume').val('');
        $('#place-order-margin').val('');
        $('.modal_contracts').text('--');
        $('.afterposition').text('--');
        $('.fee').text('0');
        $('.long').text('0');
        $('.short').text('0');
        $('.payment').text('0');
        $('.modal_margin').text('0')
    }
})