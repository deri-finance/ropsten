webpackJsonp([2],{"/n6Q":function(t,e,i){i("zQR9"),i("+tPU"),t.exports=i("Kh4W").f("iterator")},"06OY":function(t,e,i){var n=i("3Eo+")("meta"),a=i("EqjI"),r=i("D2L2"),s=i("evD5").f,o=0,u=Object.isExtensible||function(){return!0},c=!i("S82l")(function(){return u(Object.preventExtensions({}))}),l=function(t){s(t,n,{value:{i:"O"+ ++o,w:{}}})},h=t.exports={KEY:n,NEED:!1,fastKey:function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!r(t,n)){if(!u(t))return"F";if(!e)return"E";l(t)}return t[n].i},getWeak:function(t,e){if(!r(t,n)){if(!u(t))return!0;if(!e)return!1;l(t)}return t[n].w},onFreeze:function(t){return c&&h.NEED&&u(t)&&!r(t,n)&&l(t),t}}},"1kS7":function(t,e){e.f=Object.getOwnPropertySymbols},"5QVw":function(t,e,i){t.exports={default:i("BwfY"),__esModule:!0}},"7UMu":function(t,e,i){var n=i("R9M2");t.exports=Array.isArray||function(t){return"Array"==n(t)}},"9mnt":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7t+N"),a=i.n(n),r=i("Xgv0"),s=i("zf2T"),o=new r.a,u={name:"liquidity",data:function(){return{minAddLiquidity:"",margin:"--",address:"",basesymbol:"--",balance:"--",symbol:"--",unlock:!1,my_liquidity:"--",liquidity_margin:"",liquidity_volume:"",total_liquidity:"--",PerLiquidityShare:"--",connectbtn:!0,maxRemovableShares:"",id:0,removeallt:!1,wrong:""}},watch:{margin:{handler:function(t,e){}}},mounted:function(){this.id=this.$route.params.id,this.connectwallet()},methods:{reset:function(){this.getWalletBalance(),this.getSpecification(),this.getLiquidityInfo(),this.getLiquidityInfo(),this.liquidity_margin="",this.liquidity_volume=""},getSpecification:function(){var t=this;o.getSpecification().then(function(e){t.symbol=e.bSymbol})},getLiquidityInfo:function(){var t=this;o.getLiquidityInfo().then(function(e){var i=+e.poolLiquidity,n=+e.shares;t.PerLiquidityShare=e.shareValue,t.my_liquidity=n.toFixed(2),t.total_liquidity=i.toFixed(2),t.maxRemovableShares=e.maxRemovableShares})},connectwallet:function(){var t=this,e=+this.id;o.connectWallet().then(function(i){i.success?o.initialize(e).then(function(){t.connectbtn=!1;var e=o.account;e=e.slice(0,6)+"***"+e.slice(e.length-4,e.length),t.address=e,"42"!=ethereum.networkVersion&&(t.wrong="(Wrong Network!)"),t.isUnlock(),t.getWalletBalance(),t.getSpecification(),t.getLiquidityInfo(),t.getLiquidityInfo()}):alert(i.error)}).catch(function(t){alert("Cannot connect wallet")})},getWalletBalance:function(){var t=this;o.getWalletBalance().then(function(e){var i=+e;t.balance=i.toFixed(2)}).catch(function(t){})},removeall:function(){var t=this,e=a()("#removeLiquidityButton"),i=+this.maxRemovableShares;this.disableButton(e),o.removeLiquidity(i).then(function(i){t.enableButton(e),t.reset()}),a()("#confrim").modal("hide")},removeLiquidity:function(){var t=this,e=a()("#removeLiquidityButton"),i=this.liquidity_volume,n=+this.maxRemovableShares;if(this.address)if(+i>n)alert("The input liquidity cannot exceed  "+n);else if(+i<=0||isNaN(i))alert("Invalid Liquidity!");else{if(new s.a(n).minus(new s.a(i)).abs().lte(new s.a(100))){if(a()("#confrim").modal("show"),a()(".all").text("Want to remove all ("+n+" shares)?"),!this.removeallt)return;i=n}this.disableButton(e),o.removeLiquidity(i).then(function(i){t.enableButton(e),t.reset()})}else alert("Please Connect MetaMask wallet first!")},addLiquidity:function(){var t=this,e=a()("#addLiquidityButton");this.address?o.getSpecification().then(function(i){t.minAddLiquidity=i.minAddLiquidity;var n=t.liquidity_margin;+n<+t.minAddLiquidity?alert("The input liquidity shall not be less than "+t.minAddLiquidity):+n<=0||isNaN(n)?alert("Please enter the correct format!"):(t.disableButton(e),o.addLiquidity(n).then(function(i){t.enableButton(e),t.reset()}))}):alert("Please Connect MetaMask wallet first!")},disableButton:function(t){t.find("span.spinner").show(),t.attr("disabled",!0)},enableButton:function(t){t.find("span.spinner").hide(),t.attr("disabled",!1)},authorization:function(){var t=this,e=a()("#Unlock");this.disableButton(e),o.unlock().then(function(i){t.enableButton(e),t.isUnlock()}).catch(function(t){})},isUnlock:function(){var t=this;o.isUnlocked().then(function(e){t.unlock=!!e}).catch(function(t){})}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"liquidity"}},[i("div",{staticClass:"modal fade",attrs:{tabindex:"-1",role:"dialog",id:"confrim"}},[i("div",{staticClass:"modal-dialog"},[i("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),i("div",{staticClass:"modal-footer"},[i("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Cancel")]),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button",id:"removeall"},on:{click:t.removeall}},[t._v("OK")])])])])]),t._v(" "),i("nav",{staticClass:"navbar sticky-top navbar-expand-md navbar-dark sidebar-bg bb1 navbar-offcanvas",staticStyle:{height:"80px"}},[i("div",{staticClass:"container-fluid"},[t._m(1),t._v(" "),i("div",[t.connectbtn?i("button",{staticClass:"connect br10-rem",attrs:{type:"button",id:"connect-wallet"},on:{click:t.connectwallet}},[t._v("\n          Connect wallet\n        ")]):t._e(),t._v(" "),i("span",{staticStyle:{color:"red"}},[t._v(t._s(t.wrong))]),t._v(" "),i("span",{staticClass:"id"},[t._v(" "+t._s(t.address))])])])]),t._v(" "),i("div",{staticClass:"container-fluid",staticStyle:{width:"95.8% !important"}},[i("div",{staticClass:"row justify-content-center",staticStyle:{background:"#19202b","margin-top":"29px","margin-left":"0","margin-right":"0",height:"840px"}},[i("div",{staticClass:"mt-2 fcw",attrs:{role:"tabpanel",id:"liquidity"}},[i("div",{staticClass:"left"},[i("div",{staticClass:"text-mute"},[t._v("\n            Wallet Balance:\n            "),i("span",{staticClass:"text-mute",attrs:{id:"my-balance"}},[t._v(t._s(t.balance))]),t._v(" "),i("span",{staticClass:"text-mute symbol"},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticClass:"input-group mb-3 mt-4"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.liquidity_margin,expression:"liquidity_margin"}],staticClass:"form-control",staticStyle:{color:"black"},attrs:{type:"text",placeholder:"liquidity margin","aria-label":"liquidity-margin","aria-describedby":"liquidity-margin",id:"liquidity-margin"},domProps:{value:t.liquidity_margin},on:{input:function(e){e.target.composing||(t.liquidity_margin=e.target.value)}}}),t._v(" "),i("div",{staticClass:"input-group-append"},[i("span",{staticClass:"input-group-text symbol"},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticClass:"w-100  mt-4 mb-2"},[[t.unlock?i("button",{staticClass:"add",attrs:{type:"button",id:"addLiquidityButton"},on:{click:t.addLiquidity}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                  ADD LIQUIDITY\n                ")]):i("button",{staticClass:"add",attrs:{type:"button",id:"Unlock"},on:{click:t.authorization}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                  UNlOCK\n                ")])]],2)]),t._v(" "),i("div",{staticClass:"text-mute",staticStyle:{"margin-top":"68px"}},[t._v("\n            My Liquidity Shares in Pool:\n            "),i("span",{staticClass:"text-mute my-liquidity"},[t._v(t._s(t.my_liquidity))])]),t._v(" "),i("div",{staticClass:"input-group mb-4 mt-4"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.liquidity_volume,expression:"liquidity_volume"}],staticClass:"form-control",staticStyle:{color:"black"},attrs:{type:"text",placeholder:"liquidity volume","aria-label":"liquidity-volume","aria-describedby":"liquidity-volume",id:"liquidity-volume"},domProps:{value:t.liquidity_volume},on:{input:function(e){e.target.composing||(t.liquidity_volume=e.target.value)}}}),t._v(" "),t._m(2),t._v(" "),i("div",{staticClass:"w-100  mt-4 mb-2"},[i("button",{staticClass:"remove",attrs:{type:"button",id:"removeLiquidityButton"},on:{click:t.removeLiquidity}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                REMOVE LIQUIDITY\n              ")])])])]),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"car"},[i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Pool Total Liquidity")]),t._v(" "),i("span",{staticClass:"text-mute float-right symbol",staticStyle:{"margin-left":"5px"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"value float-right text-mute",attrs:{id:"total-liquidity"}},[t._v(t._s(t.total_liquidity))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("My Liquidity Shares")]),t._v(" "),i("span",{staticClass:"value float-right text-mute my-liquidity"},[t._v(t._s(t.my_liquidity))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v(" Liquidity Share Value")]),t._v(" "),i("span",{staticClass:"text-mute float-right symbol",staticStyle:{"margin-left":"5px"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.PerLiquidityShare))])])])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-body"},[e("p",{staticClass:"all",staticStyle:{color:"black"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("a",{attrs:{href:"https://deri.finance/"}},[e("img",{staticStyle:{width:"6.9rem",height:"2rem"},attrs:{src:i("xAza")}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text",attrs:{id:""}},[this._v("LiquidityShares")])])}]};var l=i("VU/8")(u,c,!1,function(t){i("poBh"),i("oxd5")},"data-v-1106bac7",null);e.default=l.exports},BwfY:function(t,e,i){i("fWfb"),i("M6a0"),i("OYls"),i("QWe/"),t.exports=i("FeBl").Symbol},Kh4W:function(t,e,i){e.f=i("dSzd")},LKZe:function(t,e,i){var n=i("NpIQ"),a=i("X8DO"),r=i("TcQ7"),s=i("MmMw"),o=i("D2L2"),u=i("SfB7"),c=Object.getOwnPropertyDescriptor;e.f=i("+E39")?c:function(t,e){if(t=r(t),e=s(e,!0),u)try{return c(t,e)}catch(t){}if(o(t,e))return a(!n.f.call(t,e),t[e])}},NpIQ:function(t,e){e.f={}.propertyIsEnumerable},OYls:function(t,e,i){i("crlp")("asyncIterator")},"QWe/":function(t,e,i){i("crlp")("observable")},Rrel:function(t,e,i){var n=i("TcQ7"),a=i("n0T6").f,r={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return s&&"[object Window]"==r.call(t)?function(t){try{return a(t)}catch(t){return s.slice()}}(t):a(n(t))}},Xc4G:function(t,e,i){var n=i("lktj"),a=i("1kS7"),r=i("NpIQ");t.exports=function(t){var e=n(t),i=a.f;if(i)for(var s,o=i(t),u=r.f,c=0;o.length>c;)u.call(t,s=o[c++])&&e.push(s);return e}},Xgv0:function(t,e,i){"use strict";var n=i("d7EF"),a=i.n(n),r=i("Gu7T"),s=i.n(r),o=i("//Fk"),u=i.n(o),c=i("Xxa5"),l=i.n(c),h=i("pFYg"),d=i.n(h),f=i("exGp"),p=i.n(f),m=i("Zrlr"),v=i.n(m),y=i("wxAW"),b=i.n(y),g=i("5IcD"),_=i.n(g),x=i("zf2T");function k(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return 0==e?Object(x.a)(t):e>0?Object(x.a)(t).times(Object(x.a)("1"+"0".repeat(e))):Object(x.a)(t).div(Object(x.a)("1"+"0".repeat(-e)))}function w(t){return k(t,-18)}function S(t){return k(t,18).toFixed(0).toString()}function q(t,e){return t.gte(e)?t:e}x.a.config({DECIMAL_PLACES:18,ROUNDING_MODE:x.a.ROUND_DOWN,EXPONENTIAL_AT:256});var C=function(){function t(){v()(this,t),this.web3=null,this.ethereum=null,this.account=null,this.oracleUrl=null,this.addresses=null,this.abifiles=null,this.methods=null,this.pool=null,this.bToken=null,this.pToken=null,this.lToken=null,this.symbol=null,this.bSymbol=null,this.bDecimals=null,this.multiplier=null,this.feeRatio=null,this.minPoolMarginRatio=null,this.minInitialMarginRatio=null,this.minMaintenanceMarginRatio=null,this.minAddLiquidity=null,this.redemptionFeeRatio=null,this.fundingRateCoefficient=null,this.minLiquidationReward=null,this.maxLiquidationReward=null,this.liquidationCutRatio=null,this.priceDelayAllowance=null,this.oracle={},this.balance={},this.position={volume:k(0),cost:k(0),lastCumuFundingRate:k(0),margin:k(0),lastUpdateTimestamp:k(0)},this.states={}}return b()(t,[{key:"connectWallet",value:function(){var t=p()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0==d()(window.ethereum)){t.next=9;break}return this.web3=new _.a(ethereum),this.ethereum=window.ethereum,t.next=5,ethereum.request({method:"eth_requestAccounts"});case 5:return this.account=t.sent[0],t.abrupt("return",{success:!0,account:this.account});case 9:return t.abrupt("return",{success:!1,error:"Cannot connect wallet"});case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"initialize",value:function(){var t=p()(l.a.mark(function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._initializeContracts(e);case 2:return t.next=4,this._initializeParameters();case 4:return t.next=6,u.a.all([this._updateBalance(),this._updatePosition(),this._updateStates(),this._updateOracle(),this._bindEvent()]);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getSpecification",value:function(){var t=p()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",{addresses:this.addresses,symbol:this.symbol,bSymbol:this.bSymbol,multiplier:this.multiplier.toString(),feeRatio:this.feeRatio.toString(),minPoolMarginRatio:this.minPoolMarginRatio.toString(),minInitialMarginRatio:this.minInitialMarginRatio.toString(),minMaintenanceMarginRatio:this.minMaintenanceMarginRatio.toString(),minAddLiquidity:this.minAddLiquidity.toString(),redemptionFeeRatio:this.redemptionFeeRatio.toString(),fundingRateCoefficient:this.fundingRateCoefficient.toString(),minLiquidationReward:this.minLiquidationReward.toString(),maxLiquidationReward:this.maxLiquidationReward.toString(),liquidationCutRatio:this.liquidationCutRatio.toString(),priceDelayAllowance:this.priceDelayAllowance.toString()});case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getPositionInfo",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:return e=w(this.oracle.price),t.abrupt("return",{volume:this.position.volume.toString(),averageEntryPrice:this._calculateEntryPrice(e).toString(),margin:this.position.margin.toString(),marginHeld:this._calculateMarginHeld(e).toString(),pnl:this._calculatePnl(e).toString(),liquidationPrice:this._calculateLiquidationPrice(e).toString()});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getLiquidityInfo",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:return e=w(this.oracle.price),t.abrupt("return",{poolLiquidity:this.states.liquidity.toString(),shares:this.balance.ltoken.toString(),shareValue:this._calculateShareValue(e).toString(),maxRemovableShares:this._calculateMaxRemovableShares(e).toString()});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getWalletBalance",value:function(){var t=p()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.balance.btoken.toString());case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"isUnlocked",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._call(this.bToken,"allowance",[this.account,this.addresses.pool]);case 2:return e=w(e=t.sent),t.abrupt("return",e.gt(0));case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"getEstimatedMargin",value:function(){var t=p()(l.a.mark(function t(e,i){var n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=w(this.oracle.price),t.abrupt("return",k(e).abs().times(n).times(this.multiplier).div(k(i)).toString());case 2:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}()},{key:"getEstimatedFee",value:function(){var t=p()(l.a.mark(function t(e){var i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=w(this.oracle.price),t.abrupt("return",k(e).abs().times(i).times(this.multiplier).times(this.feeRatio).toString());case 2:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"unlock",value:function(){var t=p()(l.a.mark(function t(){var e,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=void 0,t.prev=1,t.next=4,this._transact(this.bToken,"approve",[this.addresses.pool,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"]);case 4:i=t.sent,e={success:!0,transaction:i},t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),e={success:!1,error:t.t0};case 11:return t.abrupt("return",e);case 12:case"end":return t.stop()}},t,this,[[1,8]])}));return function(){return t.apply(this,arguments)}}()},{key:"depositMargin",value:function(){var t=p()(l.a.mark(function t(e){var i,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:return i=void 0,t.prev=3,t.next=6,this._transactPool(this.pool,"depositMargin",[S(e)]);case 6:n=t.sent,i={success:!0,transaction:n},t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),i={success:!1,error:t.t0};case 13:if(!i.success){t.next=16;break}return t.next=16,u.a.all([this._updateBalance(),this._updatePosition(),this._updateStates()]);case 16:return t.abrupt("return",i);case 17:case"end":return t.stop()}},t,this,[[3,10]])}));return function(e){return t.apply(this,arguments)}}()},{key:"withdrawMargin",value:function(){var t=p()(l.a.mark(function t(e){var i,n,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:if(i=w(this.oracle.price),n=void 0,!k(e).lte(this._calculateMaxWithdrawMargin(i))){t.next=17;break}return t.prev=5,t.next=8,this._transactPool(this.pool,"withdrawMargin",[S(e)]);case 8:a=t.sent,n={success:!0,transaction:a},t.next=15;break;case 12:t.prev=12,t.t0=t.catch(5),n={success:!1,error:t.t0};case 15:t.next=18;break;case 17:n={success:!1,error:"amount exceeds allowed"};case 18:if(!n.success){t.next=21;break}return t.next=21,u.a.all([this._updateBalance(),this._updatePosition(),this._updateStates()]);case 21:return t.abrupt("return",n);case 22:case"end":return t.stop()}},t,this,[[5,12]])}));return function(e){return t.apply(this,arguments)}}()},{key:"addLiquidity",value:function(){var t=p()(l.a.mark(function t(e){var i,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:return i=void 0,t.prev=3,t.next=6,this._transactPool(this.pool,"addLiquidity",[S(e)]);case 6:n=t.sent,i={success:!0,transaction:n},t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),i={success:!1,error:t.t0};case 13:if(!i.success){t.next=16;break}return t.next=16,u.a.all([this._updateBalance(),this._updateStates()]);case 16:return t.abrupt("return",i);case 17:case"end":return t.stop()}},t,this,[[3,10]])}));return function(e){return t.apply(this,arguments)}}()},{key:"removeLiquidity",value:function(){var t=p()(l.a.mark(function t(e){var i,n,a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:if(i=w(this.oracle.price),n=void 0,!k(e).lte(this._calculateMaxRemovableShares(i))){t.next=17;break}return t.prev=5,t.next=8,this._transactPool(this.pool,"removeLiquidity",[S(e)]);case 8:a=t.sent,n={success:!0,transaction:a},t.next=15;break;case 12:t.prev=12,t.t0=t.catch(5),n={success:!1,error:t.t0};case 15:t.next=18;break;case 17:n={success:!1,error:"shares exceeds allowed"};case 18:if(!n.success){t.next=21;break}return t.next=21,u.a.all([this._updateBalance(),this._updateStates()]);case 21:return t.abrupt("return",n);case 22:case"end":return t.stop()}},t,this,[[5,12]])}));return function(e){return t.apply(this,arguments)}}()},{key:"tradeWithMargin",value:function(){var t=p()(l.a.mark(function t(e,i){var n,a,r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._updateOracle();case 2:if(n=w(this.oracle.price),a=void 0,!this._isOrderValid(n,k(e),k(i))){t.next=17;break}return t.prev=5,t.next=8,this._transactPool(this.pool,"tradeWithMargin",[S(e),S(i)]);case 8:r=t.sent,a={success:!0,transaction:r},t.next=15;break;case 12:t.prev=12,t.t0=t.catch(5),a={success:!1,error:t.t0};case 15:t.next=18;break;case 17:a={success:!1,error:"volume and amount not valid"};case 18:if(!a.success){t.next=21;break}return t.next=21,u.a.all([this._updateBalance(),this._updatePosition(),this._updateStates()]);case 21:return t.abrupt("return",a);case 22:case"end":return t.stop()}},t,this,[[5,12]])}));return function(e,i){return t.apply(this,arguments)}}()},{key:"closePosition",value:function(){var t=p()(l.a.mark(function t(){var e,i,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.position.volume.negated(),i=void 0,e.eq(0)){t.next=15;break}return t.prev=3,t.next=6,this._transactPool(this.pool,"tradeWithMargin",[S(e),"0"]);case 6:n=t.sent,i={success:!0,transaction:n},t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),i={success:!1,error:t.t0};case 13:t.next=16;break;case 15:i={success:!1,error:"no position to close"};case 16:if(!i.success){t.next=19;break}return t.next=19,u.a.all([this._updateBalance(),this._updatePosition(),this._updateStates()]);case 19:return t.abrupt("return",i);case 20:case"end":return t.stop()}},t,this,[[3,10]])}));return function(){return t.apply(this,arguments)}}()},{key:"_bindEvent",value:function(){var t=p()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.ethereum.on("accountsChanged",function(t){window.location.reload()}),this.ethereum.on("chainChanged",function(t){window.location.reload()});case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"_call",value:function(){var t=p()(l.a.mark(function t(e,i){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(n=e.methods)[this.methods[i]].apply(n,s()(a)).call();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return function(e,i){return t.apply(this,arguments)}}()},{key:"_transact",value:function(){var t=p()(l.a.mark(function t(e,i){var n,a,r,o,u,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=0,r=0;case 2:if(!(r<20)){t.next=16;break}return t.prev=3,t.next=6,(o=e.methods)[this.methods[i]].apply(o,s()(c)).estimateGas({from:this.account});case 6:return a=t.sent,a=parseInt(1.25*a),t.abrupt("break",16);case 11:t.prev=11,t.t0=t.catch(3);case 13:r++,t.next=2;break;case 16:return 0==a&&(a=532731),t.next=19,(n=e.methods)[this.methods[i]].apply(n,s()(c)).send({from:this.account,gas:a});case 19:return u=t.sent,t.abrupt("return",u);case 21:case"end":return t.stop()}},t,this,[[3,11]])}));return function(e,i){return t.apply(this,arguments)}}()},{key:"_transactPool",value:function(){var t=p()(l.a.mark(function t(e,i){var n,a,r,o,u,c,h=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=[this.oracle.timestamp,this.oracle.price,this.oracle.v,this.oracle.r,this.oracle.s],r=0,o=0;case 3:if(!(o<20)){t.next=17;break}return t.prev=4,t.next=7,(u=e.methods)[this.methods[i]].apply(u,s()(h).concat(a)).estimateGas({from:this.account});case 7:return r=t.sent,r=parseInt(1.25*r),t.abrupt("break",17);case 12:t.prev=12,t.t0=t.catch(4);case 14:o++,t.next=3;break;case 17:return 0==r&&(r=532731),t.next=20,(n=e.methods)[this.methods[i]].apply(n,s()(h).concat(a)).send({from:this.account,gas:r});case 20:return c=t.sent,t.abrupt("return",c);case 22:case"end":return t.stop()}},t,this,[[4,12]])}));return function(e,i){return t.apply(this,arguments)}}()},{key:"_readjson",value:function(){var t=p()(l.a.mark(function t(e){var i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("static/config/"+e);case 2:return i=t.sent,t.next=5,i.json();case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"_initializeContracts",value:function(){var t=p()(l.a.mark(function t(e){var i,n,r,s,o,c,h;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._readjson("config.json");case 3:return i=t.sent,this.oracleUrl=i.oracleUrl,this.addresses=i.addresses[e],this.abifiles=i.abifiles,this.methods=i.methods,t.next=10,u.a.all([this._readjson(this.abifiles.pool),this._readjson(this.abifiles.bToken),this._readjson(this.abifiles.pToken),this._readjson(this.abifiles.lToken)]);case 10:n=t.sent,r=a()(n,4),s=r[0],o=r[1],c=r[2],h=r[3],this.pool=new this.web3.eth.Contract(s,this.addresses.pool),this.bToken=new this.web3.eth.Contract(o,this.addresses.bToken),this.pToken=new this.web3.eth.Contract(c,this.addresses.pToken),this.lToken=new this.web3.eth.Contract(h,this.addresses.lToken),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(0),console.log("Chain: _initializeContracts() error: "+t.t0);case 25:case"end":return t.stop()}},t,this,[[0,22]])}));return function(e){return t.apply(this,arguments)}}()},{key:"_initializeParameters",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._call(this.pool,"symbol");case 3:return this.symbol=t.sent,t.next=6,this._call(this.bToken,"symbol");case 6:return this.bSymbol=t.sent,t.next=9,this._call(this.bToken,"decimals");case 9:return this.bDecimals=t.sent,t.next=12,this._call(this.pool,"getParameters");case 12:e=t.sent,this.multiplier=w(e.multiplier),this.feeRatio=w(e.feeRatio),this.minPoolMarginRatio=w(e.minPoolMarginRatio),this.minInitialMarginRatio=w(e.minInitialMarginRatio),this.minMaintenanceMarginRatio=w(e.minMaintenanceMarginRatio),this.minAddLiquidity=w(e.minAddLiquidity),this.redemptionFeeRatio=w(e.redemptionFeeRatio),this.fundingRateCoefficient=w(e.fundingRateCoefficient),this.minLiquidationReward=w(e.minLiquidationReward),this.maxLiquidationReward=w(e.maxLiquidationReward),this.liquidationCutRatio=w(e.liquidationCutRatio),this.priceDelayAllowance=k(e.priceDelayAllowance),t.next=30;break;case 27:t.prev=27,t.t0=t.catch(0),console.log("Chain: _initializeParameters() error: "+t.t0);case 30:case"end":return t.stop()}},t,this,[[0,27]])}));return function(){return t.apply(this,arguments)}}()},{key:"_updateBalance",value:function(){var t=p()(l.a.mark(function t(){var e,i,n,r,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u.a.all([this._call(this.bToken,"balanceOf",[this.account]),this._call(this.lToken,"balanceOf",[this.account]),this._call(this.lToken,"totalSupply")]);case 3:e=t.sent,i=a()(e,3),n=i[0],r=i[1],s=i[2],this.balance.btoken=k(n,-this.bDecimals),this.balance.ltoken=w(r),this.balance.ltotal=w(s),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.log(t.t0);case 16:case"end":return t.stop()}},t,this,[[0,13]])}));return function(){return t.apply(this,arguments)}}()},{key:"_updatePosition",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._call(this.pToken,"getPosition",[this.account]);case 3:e=t.sent,this.position.volume=w(e[0]),this.position.cost=w(e[1]),this.position.lastCumuFundingRate=w(e[2]),this.position.margin=w(e[3]),this.position.lastUpdateTimestamp=k(e[4]),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log("Chain update position error, using default");case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(){return t.apply(this,arguments)}}()},{key:"_updateStates",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._call(this.pool,"getStateValues");case 3:e=t.sent,this.states.cumuFundingRate=w(e.cumuFundingRate),this.states.cumuFundingRateBlock=k(e.cumuFundingRateBlock),this.states.liquidity=w(e.liquidity),this.states.tradersNetVolume=w(e.tradersNetVolume),this.states.tradersNetCost=w(e.tradersNetCost),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(){return t.apply(this,arguments)}}()},{key:"_updateOracle",value:function(){var t=p()(l.a.mark(function t(){var e;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(this.oracleUrl);case 3:return e=t.sent,t.next=6,e.json();case 6:this.oracle=t.sent,t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}},t,this,[[0,9]])}));return function(){return t.apply(this,arguments)}}()},{key:"_calculateShareValue",value:function(t){return this.balance.ltotal.eq(0)?k(0):this.states.liquidity.div(this.balance.ltotal)}},{key:"_calculateMaxRemovableShares",value:function(t){var e,i,n=this._calculateShareValue(),a=this.states.tradersNetVolume.times(t).times(this.multiplier),r=this.states.liquidity.plus(this.states.tradersNetCost).minus(a).minus(a.abs().times(this.minPoolMarginRatio));return q((e=this.balance.ltoken,i=r.div(n),e.lte(i)?e:i),k(0))}},{key:"_calculateEntryPrice",value:function(t){return this.position.volume.eq(0)?k(0):this.position.cost.div(this.position.volume).div(this.multiplier)}},{key:"_calculateMarginHeld",value:function(t){return this.position.volume.abs().times(t).times(this.multiplier).times(this.minInitialMarginRatio)}},{key:"_calculatePnl",value:function(t){return this.position.volume.times(t).times(this.multiplier).minus(this.position.cost)}},{key:"_calculateMaxWithdrawMargin",value:function(t){if(this.position.volume.eq(0))return this.position.margin;var e=this._calculateMarginHeld(t),i=this._calculatePnl(t);return q(this.position.margin.plus(i).minus(e.times(1.02)),k(0))}},{key:"_calculateLiquidationPrice",value:function(t){var e=this.position.cost.minus(this.position.margin).div(this.position.volume).div(this.multiplier),i=this.position.volume.gt(0)?e.div(k(1).minus(this.minMaintenanceMarginRatio)):e.div(k(1).plus(this.minMaintenanceMarginRatio));return i=q(i,k(0))}},{key:"_isOrderValid",value:function(t,e,i){var n=this.position.volume.plus(e).abs().times(t).times(this.multiplier).times(this.minInitialMarginRatio),a=this.states.liquidity.div(this.minPoolMarginRatio).div(t).div(this.multiplier);return this.position.margin.plus(i).gte(n)&&e.lte(a.minus(this.states.tradersNetVolume))&&e.gte(a.negated().minus(this.states.tradersNetVolume))}}]),t}();e.a=C},Zzip:function(t,e,i){t.exports={default:i("/n6Q"),__esModule:!0}},crlp:function(t,e,i){var n=i("7KvD"),a=i("FeBl"),r=i("O4g8"),s=i("Kh4W"),o=i("evD5").f;t.exports=function(t){var e=a.Symbol||(a.Symbol=r?{}:n.Symbol||{});"_"==t.charAt(0)||t in e||o(e,t,{value:s.f(t)})}},fWfb:function(t,e,i){"use strict";var n=i("7KvD"),a=i("D2L2"),r=i("+E39"),s=i("kM2E"),o=i("880/"),u=i("06OY").KEY,c=i("S82l"),l=i("e8AB"),h=i("e6n0"),d=i("3Eo+"),f=i("dSzd"),p=i("Kh4W"),m=i("crlp"),v=i("Xc4G"),y=i("7UMu"),b=i("77Pl"),g=i("EqjI"),_=i("sB3e"),x=i("TcQ7"),k=i("MmMw"),w=i("X8DO"),S=i("Yobk"),q=i("Rrel"),C=i("LKZe"),R=i("1kS7"),M=i("evD5"),L=i("lktj"),P=C.f,O=M.f,T=q.f,B=n.Symbol,E=n.JSON,I=E&&E.stringify,N=f("_hidden"),j=f("toPrimitive"),D={}.propertyIsEnumerable,F=l("symbol-registry"),A=l("symbols"),W=l("op-symbols"),U=Object.prototype,z="function"==typeof B&&!!R.f,V=n.QObject,Q=!V||!V.prototype||!V.prototype.findChild,K=r&&c(function(){return 7!=S(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(t,e,i){var n=P(U,e);n&&delete U[e],O(t,e,i),n&&t!==U&&O(U,e,n)}:O,Y=function(t){var e=A[t]=S(B.prototype);return e._k=t,e},G=z&&"symbol"==typeof B.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof B},X=function(t,e,i){return t===U&&X(W,e,i),b(t),e=k(e,!0),b(i),a(A,e)?(i.enumerable?(a(t,N)&&t[N][e]&&(t[N][e]=!1),i=S(i,{enumerable:w(0,!1)})):(a(t,N)||O(t,N,w(1,{})),t[N][e]=!0),K(t,e,i)):O(t,e,i)},J=function(t,e){b(t);for(var i,n=v(e=x(e)),a=0,r=n.length;r>a;)X(t,i=n[a++],e[i]);return t},Z=function(t){var e=D.call(this,t=k(t,!0));return!(this===U&&a(A,t)&&!a(W,t))&&(!(e||!a(this,t)||!a(A,t)||a(this,N)&&this[N][t])||e)},$=function(t,e){if(t=x(t),e=k(e,!0),t!==U||!a(A,e)||a(W,e)){var i=P(t,e);return!i||!a(A,e)||a(t,N)&&t[N][e]||(i.enumerable=!0),i}},H=function(t){for(var e,i=T(x(t)),n=[],r=0;i.length>r;)a(A,e=i[r++])||e==N||e==u||n.push(e);return n},tt=function(t){for(var e,i=t===U,n=T(i?W:x(t)),r=[],s=0;n.length>s;)!a(A,e=n[s++])||i&&!a(U,e)||r.push(A[e]);return r};z||(o((B=function(){if(this instanceof B)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(i){this===U&&e.call(W,i),a(this,N)&&a(this[N],t)&&(this[N][t]=!1),K(this,t,w(1,i))};return r&&Q&&K(U,t,{configurable:!0,set:e}),Y(t)}).prototype,"toString",function(){return this._k}),C.f=$,M.f=X,i("n0T6").f=q.f=H,i("NpIQ").f=Z,R.f=tt,r&&!i("O4g8")&&o(U,"propertyIsEnumerable",Z,!0),p.f=function(t){return Y(f(t))}),s(s.G+s.W+s.F*!z,{Symbol:B});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),it=0;et.length>it;)f(et[it++]);for(var nt=L(f.store),at=0;nt.length>at;)m(nt[at++]);s(s.S+s.F*!z,"Symbol",{for:function(t){return a(F,t+="")?F[t]:F[t]=B(t)},keyFor:function(t){if(!G(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){Q=!0},useSimple:function(){Q=!1}}),s(s.S+s.F*!z,"Object",{create:function(t,e){return void 0===e?S(t):J(S(t),e)},defineProperty:X,defineProperties:J,getOwnPropertyDescriptor:$,getOwnPropertyNames:H,getOwnPropertySymbols:tt});var rt=c(function(){R.f(1)});s(s.S+s.F*rt,"Object",{getOwnPropertySymbols:function(t){return R.f(_(t))}}),E&&s(s.S+s.F*(!z||c(function(){var t=B();return"[null]"!=I([t])||"{}"!=I({a:t})||"{}"!=I(Object(t))})),"JSON",{stringify:function(t){for(var e,i,n=[t],a=1;arguments.length>a;)n.push(arguments[a++]);if(i=e=n[1],(g(e)||void 0!==t)&&!G(t))return y(e)||(e=function(t,e){if("function"==typeof i&&(e=i.call(this,t,e)),!G(e))return e}),n[1]=e,I.apply(E,n)}}),B.prototype[j]||i("hJx8")(B.prototype,j,B.prototype.valueOf),h(B,"Symbol"),h(Math,"Math",!0),h(n.JSON,"JSON",!0)},n0T6:function(t,e,i){var n=i("Ibhu"),a=i("xnc9").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,a)}},oxd5:function(t,e){},pFYg:function(t,e,i){"use strict";e.__esModule=!0;var n=s(i("Zzip")),a=s(i("5QVw")),r="function"==typeof a.default&&"symbol"==typeof n.default?function(t){return typeof t}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":typeof t};function s(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof a.default&&"symbol"===r(n.default)?function(t){return void 0===t?"undefined":r(t)}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":void 0===t?"undefined":r(t)}},poBh:function(t,e){}});