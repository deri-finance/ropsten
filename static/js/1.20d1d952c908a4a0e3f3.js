webpackJsonp([1],{"W/QM":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAABGUlEQVQ4EbWUMU7EMBBF4wAdB6CnhH57bsHVqFZC7C32GjRUZEHQoSC2AuF9P7ZDEizbZJeRvsbjmXmxbMdV9R9mrV2jnLUULIbfJz5CN+gBnSp37Auu8N/oxcdDZ3zQ4rchIRjjW3SNGvSFnJGUPYc456nVyu7UhG3Q+ainmy4EUpuGiVwKLIKVAothJcA/wXJAD1vhZb8PwG3ZJbmfK9WVRg6FeR1AEuYXdE+drpWzGHACa4jHVyM048k9idFPKcBG95B42c1am4QJQl0aSMEJ+kBZ2BQYfr1+tRoYYz6BXTB8Y/w+SmaCKFA9gB4zvdF0HZ3dY/LgwO5pYr905Hq+Xmcu7oy+mm1yTx28kgdW303ZeuZi0m07lme0PK7Fp6cAAAAASUVORK5CYII="},e7BM:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s("7t+N"),e=s.n(i),n=new(s("Xgv0").a),l={name:"trade",data:function(){return{id:0,address:"",announcement:!1,reslutlong:!0,resultshort:!0,walletBalance:"",TotalPayment:"--",ofContracts:"--",Positionafterexcution:"--",xleverage:"--",TransactionFee:"---",MinMaintenanceMarginRatio:"---",MinInitialMarginRatio:"---",FundingRateCoefficient:"---",Multiplier:"---",BaseToken:"---",Timestamp:"",ByLiquidator:"",LiquidationPrice:"---",UnrealizedPnL:"---",MarginHeld:"---",margin:"---",AverageEntryPrice:"---",position:"---",depositMargin:"",withdrawMargin:"",addmargin:0,MenualMargin:"",ContractVolume:"",unlock:!1,checkbuy:!0,leverage:0,hidemargin:!0,showmargin:!1,optional:!1,symbol:"---",balance:"--",maxmargin:"",mfee:"",connectbtn:!0}},watch:{ContractVolume:{handler:function(t,a){var s=this.position,i=+t;this.ofContracts=i,"---"!=s?(s=+s,e()("#groups").hasClass("checkshort")?this.Positionafterexcution=s-i:this.Positionafterexcution=s+i):e()("#groups").hasClass("checkshort")?this.Positionafterexcution="-"+i:this.Positionafterexcution=i,this.showmargin?this.calMargin(i):this.calMargin(i,this.leverage)}},MenualMargin:{handler:function(t,a){this.addmargin=+t;var s=this.mfee+this.addmargin;this.TotalPayment=s}}},mounted:function(){this.dit(),this.id=this.$route.params.id,console.log(this.id),this.connectwallet()},methods:{closeannouncement:function(){this.announcement=!1},tradeEvent:function(){},place_order_sell:function(){var t=this;this.resultshort=!1;var a=this.TotalPayment,s=this.ContractVolume;return a<0&&(a=0),isNaN(s)?(alert("Please enter a positive number"),this.resultshort=!0,void e()("#modalshort").modal("hide")):+s!==parseInt(s)?(this.ContractVolume="",this.resultshort=!0,alert("volume  must be round"),void e()("#modalshort").modal("hide")):(s*=-1,void n.tradeWithMargin(s,a).then(function(a){a.success||alert("Place  order failed"),t.resultshort=!0,e()("#modalshort").modal("hide"),t.reset()}).catch(function(t){}))},place_order_buy:function(){var t=this;this.reslutlong=!1;var a=this.TotalPayment,s=this.ContractVolume;return a<0?(alert("volume has to be greater than zero"),this.reslutlong=!0,void e()("#exampleModal").modal("hide")):isNaN(a)?(alert("Please enter the correct number"),this.reslutlong=!0,void e()("#exampleModal").modal("hide")):isNaN(s)?(alert("Please enter a positive number"),this.reslutlong=!0,void e()("#exampleModal").modal("hide")):s<0?(alert("volume has to be greater than zero"),this.reslutlong=!0,void e()("#exampleModal").modal("hide")):+s!==parseInt(s)?(this.ContractVolume="",alert("volume  must be round"),this.reslutlong=!0,void e()("#exampleModal").modal("hide")):void n.tradeWithMargin(s,a).then(function(a){a.success||alert("Place  order failed"),t.reslutlong=!0,e()("#exampleModal").modal("hide"),t.reset()}).catch(function(t){})},dit:function(){var t=this;e()(".rc-slider-dot").on("click",function(){var a=e()(this).index(),s=12.5*a,i=t.ContractVolume;e()(".rc-slider-handle").css("left",s+"%"),"0"==a?(t.leverage=0,t.xleverage="--",t.TotalPayment=t.mfee):(t.leverage=parseInt(e()(".rc-slider-mark-text").eq(a).text()),t.xleverage=t.leverage+"x",console.log(t.leverage)),i&&t.leverage&&t.calMargin(i,t.leverage),0==t.leverage&&(t.addmargin=0)})},calMargin:function(t,a){var s=this;if(this.showmargin){var i=void 0,e=this.MenualMargin;n.getEstimatedFee(t).then(function(t){var a=+t;a=s.upFixed(a,2),i=+a,s.mfee=+a,e=+s.MenualMargin,i=e+i,i=i=+s.upFixed(i,3),s.TotalPayment=i})}else if("0"==a){var l=void 0,r=0;n.getEstimatedFee(t).then(function(t){var a=+t;a=s.upFixed(a,2),l=+a,s.mfee=+a,r=+s.MenualMargin,l=r+l,l=l=+s.upFixed(l,3),s.TotalPayment=l})}else n.getEstimatedMargin(t,a).then(function(i){var e=void 0,l=+i;l=+s.upFixed(l,2),n.getEstimatedFee(t).then(function(t){var i=+t;i=s.upFixed(i,2),e=+i,s.mfee=+i,s.showmargin?(l=+s.MenualMargin,e=l+e,e=e=+s.upFixed(e,3),s.TotalPayment=e):void 0==a?(s.addmargin=0,s.TotalPayment=e):(s.addmargin=0,e=l+e,e=s.upFixed(e,3),s.addmargin=l,s.TotalPayment=e)})})},closeposition:function(){var t=this,a=e()("#closeposition");this.disableButton(a),n.closePosition().then(function(s){t.reset(),t.enableButton(a)}).catch(function(s){alert("Unwind failure"),t.reset(),t.enableButton(a)})},upFixed:function(t,a){var s="0";if(Number(t)&&a>0)if(a=+a||2,/e/.test(t+=""))s=t;else if(/\./.test(t)){t=t+""+Array(a+1).join("0");var i=new RegExp("-?\\d*\\.\\d{0,"+a+"}"),e=i.exec(t)[0];if(+e>=+t)s=e;else{var n=+e+ +("0."+Array(a).join("0")+"1"),l=n+(/\./.test(n+"")?"":".")+""+Array(a+1).join("0");s=i.exec(l)[0]}}else s=t+"."+Array(a+1).join("0");return s},onwithdrawMargin:function(){var t=this,a=this.withdrawMargin,s=e()("#withdrawMarginButton");this.address?a>this.maxmargin?alert("under margin"):+a<=0||isNaN(a)?alert("It has to be greater than zero"):(this.disableButton(s),n.withdrawMargin(a).then(function(a){a.success||alert("insufficient margin o withdrow"),t.enableButton(s),t.reset()})):alert("Please Connect MetaMask wallet first!")},ondepositMargin:function(){var t=this,a=+this.depositMargin,s=e()("#depositMarginButton");this.address?a>this.walletBalance?alert("Insufficient balance in wallet"):+a<=0||isNaN(a)?alert("It has to be greater than zero"):(this.disableButton(s),n.depositMargin(a).then(function(a){t.enableButton(s),t.reset()})):alert("Please Connect MetaMask wallet first!")},hideoptional:function(){this.optional=!0},showoptional:function(){this.optional=!1},reset:function(){this.getPositionInfo(),this.getSpecification(),this.getWalletBalance(),this.depositMargin="",this.withdrawMargin="",this.ContractVolume="",this.MenualMargin="",this.ofContracts="--",this.Positionafterexcution="",this.TransactionFee=0,this.addmargin=0,this.TotalPayment=0},getSpecification:function(){var t=this;n.getSpecification().then(function(a){console.log(a);var s=100*a.minInitialMarginRatio,i=100*a.minMaintenanceMarginRatio,e=100*a.feeRatio;t.symbol=a.bSymbol,t.BaseToken=a.symbol,t.FundingRateCoefficient=a.fundingRateCoefficient,t.Multiplier=a.multiplier,t.MinInitialMarginRatio=s+"%",t.MinMaintenanceMarginRatio=i+"%",t.TransactionFee=e+"%"})},connectwallet:function(){var t=this,a=+this.id;n.connectWallet().then(function(s){s.success?n.initialize(a).then(function(){t.connectbtn=!1;var a=n.account;a=a.slice(0,6)+"***"+a.slice(a.length-4,a.length),t.address=a,t.isUnlock(),t.getPositionInfo(),t.getSpecification(),t.getWalletBalance()}):alert(s.error)}).catch(function(t){alert("Cannot connect wallet")})},getWalletBalance:function(){var t=this;n.getWalletBalance().then(function(a){console.log(a);var s=+a;t.walletBalance=s,t.balance=s.toFixed(2)}).catch(function(t){})},getPositionInfo:function(){var t=this;n.getPositionInfo().then(function(a){console.log(a);var s=+a.margin;t.maxmargin=s;var i=a.volume,e=+a.averageEntryPrice,n=+a.marginHeld,l=+a.pnl;if(t.margin=s.toFixed(2),t.position=i,isNaN(e)?t.AverageEntryPrice="---":t.AverageEntryPrice=e.toFixed(2),"0"==a.liquidationPrice)t.LiquidationPrice="---";else{var r=+a.liquidationPrice;t.LiquidationPrice=r.toFixed(2)}t.MarginHeld=n.toFixed(2),t.UnrealizedPnL=l.toFixed(8)}).catch(function(t){})},authorization:function(){var t=this,a=e()("#Unlock");this.disableButton(a),a.attr("disabled"),n.unlock().then(function(s){t.enableButton(a),t.isUnlock()}).catch(function(t){})},hideslid:function(){this.hidemargin=!0,this.showmargin=!1,this.leverage=0,this.MenualMargin="",this.addmargin=0,this.xleverage="--",this.TotalPayment=0},showsile:function(){e()(".rc-slider-handle").css("left","0%"),this.hidemargin=!1,this.showmargin=!0,this.leverage=0,this.leverage=0,this.addmargin=0,this.xleverage="--",this.TotalPayment=this.mfee},checkedlong:function(){e()("#groups").removeClass("checkshort"),this.leverage=0,this.checkbuy=!0,this.MenualMargin="",e()(".rc-slider-handle").css("left","0%"),this.addmargin=0,this.xleverage="--",this.ContractVolume="",this.TotalPayment=this.mfee,this.isUnlock()},checkshort:function(){e()("#groups").addClass("checkshort"),this.leverage=0,this.checkbuy=!1,this.MenualMargin="",e()(".rc-slider-handle").css("left","0%"),this.addmargin=0,this.xleverage="--",this.ContractVolume="",this.TotalPayment=0,this.isUnlock()},disableButton:function(t){t.find("span.spinner").show(),t.attr("disabled",!0)},enableButton:function(t){t.find("span.spinner").hide(),t.attr("disabled",!1)},isUnlock:function(){var t=this;n.isUnlocked().then(function(a){t.unlock=!!a}).catch(function(t){})}}},r={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{attrs:{id:"trade"}},[i("div",{staticClass:"modal fade",staticStyle:{top:"50%",left:"50%",color:"black",transform:"translate(-50%, -25%)"},attrs:{id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog"},[i("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),i("div",{staticClass:"modal-body",staticStyle:{color:"black"}},[i("div",[i("label",{staticStyle:{color:"black"}},[t._v("# of Contracts")]),t._v(" "),i("span",{staticClass:"modal_contracts",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.ofContracts))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Position after execution")]),t._v(" "),i("span",{staticClass:"afterposition",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.Positionafterexcution))])]),t._v(" "),t._m(1),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Leverage")]),t._v(" "),i("span",{staticClass:"modal_leverage",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.xleverage))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Margin")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"modal_margin",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.addmargin))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Transaction Fee")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"fee",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.mfee))])]),t._v(" "),i("br"),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Total Payment")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"payment",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.TotalPayment))])])]),t._v(" "),i("div",{staticClass:"modal-footer",staticStyle:{"justify-content":"center"}},[t.reslutlong?[i("button",{staticClass:"btn btn-secondary",staticStyle:{padding:"6px 20px 6px 20px"},attrs:{type:"button",id:"long_close","data-dismiss":"modal"}},[t._v("\n              Cancel\n            ")]),t._v(" "),i("button",{staticClass:"btn btn-primary",staticStyle:{padding:"6px 29px 6px 29px"},attrs:{type:"button",id:"resultlong"},on:{click:t.place_order_buy}},[t._v("\n              OK\n            ")])]:[t._m(2)]],2)])])]),t._v(" "),i("div",{staticClass:"modal fade",staticStyle:{top:"50%",left:"50%",color:"black",transform:"translate(-50%, -25%)"},attrs:{id:"modalshort",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog"},[i("div",{staticClass:"modal-content"},[t._m(3),t._v(" "),i("div",{staticClass:"modal-body",staticStyle:{color:"black"}},[i("div",[i("label",{staticStyle:{color:"black"}},[t._v("# of Contracts")]),t._v(" "),i("span",{staticClass:"modal_contracts",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.ofContracts))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Position after execution")]),t._v(" "),i("span",{staticClass:"afterposition",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.Positionafterexcution))])]),t._v(" "),t._m(4),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Leverage")]),t._v(" "),i("span",{staticClass:"modal_leverage",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.xleverage))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Margin")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"modal_margin",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.addmargin))])]),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Transaction Fee")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"fee",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.mfee))])]),t._v(" "),i("br"),t._v(" "),i("div",[i("label",{staticStyle:{color:"black"}},[t._v("Total Payment")]),t._v(" "),i("span",{staticClass:"symbol",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.symbol))]),t._v(" "),i("span",{staticClass:"payment",staticStyle:{color:"black",float:"right"}},[t._v(t._s(t.TotalPayment))])])]),t._v(" "),i("div",{staticClass:"modal-footer",staticStyle:{"justify-content":"center"}},[t.resultshort?[i("button",{staticClass:"btn btn-secondary",staticStyle:{padding:"6px 20px 6px 20px"},attrs:{type:"button","data-dismiss":"modal",id:"short_close"}},[t._v("\n              Cancel\n            ")]),t._v(" "),i("button",{staticClass:"btn btn-primary",staticStyle:{padding:"6px 29px 6px 29px"},attrs:{type:"button",id:"resultshort"},on:{click:t.place_order_sell}},[t._v("\n              OK\n            ")])]:[t._m(5)]],2)])])]),t._v(" "),i("nav",{staticClass:"navbar sticky-top navbar-expand-md navbar-dark sidebar-bg bb1 navbar-offcanvas",staticStyle:{height:"80px"}},[i("div",{staticClass:"container-fluid"},[t._m(6),t._v(" "),i("div",[t.connectbtn?i("button",{staticClass:"connect br10-rem",attrs:{type:"button",id:"connect-wallet"},on:{click:t.connectwallet}},[t._v("\n          Connect wallet\n        ")]):t._e(),t._v(" "),i("span",{staticClass:"id"},[t._v(" "+t._s(t.address))])]),t._v(" "),i("div",{staticClass:"navbar-collapse ml-auto collapse show",attrs:{id:"navbar-mobile"}})])]),t._v(" "),i("div",{staticClass:"container-fluid",staticStyle:{width:"95.8% !important"}},[i("div",{staticClass:"row justify-content-center",staticStyle:{background:"#19202b","margin-top":"29px","margin-left":"0","margin-right":"0"}},[i("div",{staticClass:"tab-content",staticStyle:{"margin-top":"5px"}},[i("div",{staticClass:"tab-pane fade in active fcw show",attrs:{role:"tabpanel",id:"home"}},[i("div",{staticClass:"left"},[i("div",{staticClass:"text-mute"},[t._v("\n              Wallet Balance:\n              "),i("span",{staticClass:"text-mute",attrs:{id:"balance"}},[t._v(t._s(t.balance))]),t._v(" "),i("span",{staticClass:"text-mute symbol"},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticClass:"mb-3 mt-4 gruops checklong",attrs:{id:"groups"}},[i("div",{staticClass:"longs",attrs:{id:"checklongs"},on:{click:t.checkedlong}},[t._v("\n                LONG\n              ")]),t._v(" "),i("div",{staticClass:"shorts",attrs:{id:"checkshorts"},on:{click:t.checkshort}},[t._v("\n                SHORT\n              ")])]),t._v(" "),i("div",{staticClass:"input-group mb-3 mt-4"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.ContractVolume,expression:"ContractVolume"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Contract Volume","aria-label":"Contract-Volume","aria-describedby":"Contract-Volume",id:"place-order-volume"},domProps:{value:t.ContractVolume},on:{input:function(a){a.target.composing||(t.ContractVolume=a.target.value)}}}),t._v(" "),t._m(7)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.hidemargin,expression:"hidemargin"}],staticClass:"leverageWrapper mt-4",staticStyle:{width:"360px",height:"58px","margin-left":"7px"},attrs:{id:"leverageWrapper"}},[i("div",{staticClass:"leverage"},[i("div",{staticClass:"orderControlsInput slider"},[i("div",{staticClass:"rc-slider rc-slider-with-marks"},[i("div",{staticClass:"rc-slider-rail"}),t._v(" "),t._m(8),t._v(" "),i("div",{staticClass:"rc-slider-handle",staticStyle:{left:"0%",right:"auto",transform:"translateX(-50%)"},attrs:{tabindex:"0",role:"slider","aria-valuemin":"0","aria-valuemax":"8","aria-valuenow":"0","aria-disabled":"false"}}),t._v(" "),i("div",{staticClass:"rc-slider-mark"},[i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"3%"},attrs:{title:"Trade with NO additional margin if position with surplus margin"}},[t._v("zero\n                        "),i("svg",{staticClass:"bi bi-exclamation-circle",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",fill:"currentColor",viewBox:"0 0 16 16"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}}),t._v(" "),i("path",{attrs:{d:"M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"}})])]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"12.5%"}},[t._v("1x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"25%"}},[t._v("2x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"37.5%"}},[t._v("3x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"50%"}},[t._v("5x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"62.5%"}},[t._v("7x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"75%"}},[t._v("8x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"87.5%"}},[t._v("9x")]),i("span",{staticClass:"rc-slider-mark-text",staticStyle:{transform:"translateX(-50%)",left:"100%"}},[t._v("10x")])])])])]),t._v(" "),i("img",{staticClass:"editLeverage",staticStyle:{position:"relative",top:"-14px",left:"104%",width:"1.125rem",height:"1.125rem",cursor:"pointer"},attrs:{src:s("W/QM"),id:"showmargin",alt:""},on:{click:t.showsile}})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showmargin,expression:"showmargin"}],staticClass:"input-group mb-3 mt-1",staticStyle:{width:"100%"},attrs:{id:"place_margin"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.MenualMargin,expression:"MenualMargin"}],staticClass:"form-control number-only",attrs:{type:"text",placeholder:"Manual Margin","aria-label":"Margin","aria-describedby":"Margin",id:"place-order-margin"},domProps:{value:t.MenualMargin},on:{input:function(a){a.target.composing||(t.MenualMargin=a.target.value)}}}),t._v(" "),i("div",{staticClass:"input-group-append",staticStyle:{width:"65px"}},[i("span",{staticClass:"input-group-text symbol",attrs:{id:"Margin"}},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticStyle:{display:"inline-block"}},[i("button",{staticClass:"close",attrs:{type:"button","aria-label":"关闭"}},[i("span",{staticStyle:{position:"relative",top:"10px",left:"5px"},attrs:{id:"closemargin","aria-hidden":"true"},on:{click:function(a){return a.preventDefault(),t.hideslid(a)}}},[t._v("×")])])])]),t._v(" "),i("div",{staticClass:"text-mute"},[i("div",{attrs:{id:"text-mute-long"}},[t._v("\n                Margin : "),i("span",{staticClass:"text-mute"},[t._v(t._s(t.addmargin))])])]),t._v(" "),i("div",{staticClass:"container w-100 mt-4"},[i("div",{staticClass:"row justify-content-between"},[t.unlock?[t.checkbuy?i("div",{staticClass:"col-12 ml-0 pl-0",attrs:{id:"affirm_long"}},[t._m(9)]):i("div",{staticClass:"col-12 ml-0 pl-0",attrs:{id:"affirm_short"}},[t._m(10)])]:[i("div",{staticClass:"col-12 ml-0 pl-0",staticStyle:{display:"block"}},[i("button",{attrs:{id:"Unlock"},on:{click:t.authorization}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"}}),t._v("\n                      UNLOCK\n                    ")])])]],2)]),t._v(" "),i("div",{staticClass:"hr"}),t._v(" "),i("div",{staticStyle:{height:"2rem","margin-top":"8.7%"}},[t._v("\n              Optional\n              "),t.optional?i("svg",{staticClass:"bi bi-chevron-down",staticStyle:{cursor:"pointer"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16"},on:{click:t.showoptional}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"}})]):i("svg",{staticClass:"bi bi-chevron-up",staticStyle:{cursor:"pointer"},attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16"},on:{click:t.hideoptional}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"}})])]),t._v(" "),t.optional?i("div",{staticStyle:{"margin-bottom":"30px"},attrs:{id:"optional"}},[i("div",{staticClass:"mt-2",staticStyle:{"margin-bottom":"20px"}},[i("div",{staticClass:"text-mute"},[t._v("\n                  Position:\n                  "),i("span",{staticClass:"text-mute",attrs:{id:"balance"}},[t._v(t._s(t.position))]),t._v(" "),i("span",{staticClass:"text-mute symbol"},[t._v("Contracts ")])]),t._v(" "),i("button",{staticClass:"btn btn-danger mt-4",attrs:{type:"button",id:"closeposition"},on:{click:t.closeposition}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                  CLOSE POSITION\n                ")])]),t._v(" "),i("div",{staticStyle:{"margin-top":"1.9rem"}},[i("div",{staticClass:"text-mute"},[t._v("deposit Margin")]),t._v(" "),i("div",{staticClass:"input-group mb-3 mt-4"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.depositMargin,expression:"depositMargin"}],staticClass:"form-control number-only",attrs:{type:"text",placeholder:"depositMargin","aria-label":"depositMargin","aria-describedby":"depositMargin",id:"depositMargin"},domProps:{value:t.depositMargin},on:{input:function(a){a.target.composing||(t.depositMargin=a.target.value)}}}),t._v(" "),i("div",{staticClass:"input-group-append"},[i("span",{staticClass:"input-group-text symbol"},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticClass:"w-100 mt-4 mb-2"},[i("button",{attrs:{type:"button",id:"depositMarginButton"},on:{click:t.ondepositMargin}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                      DEPOSIT MARGIN\n                    ")])])])]),t._v(" "),i("div",{staticClass:"mt-4"},[i("div",{staticClass:"text-mute"},[t._v("withdraw Margin")]),t._v(" "),i("div",{staticClass:"input-group mb-3 mt-4"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.withdrawMargin,expression:"withdrawMargin"}],staticClass:"form-control number-only",attrs:{type:"text",placeholder:"withdrawMargin","aria-label":"withdrawMargin","aria-describedby":"withdrawMargin",id:"withdrawMargin"},domProps:{value:t.withdrawMargin},on:{input:function(a){a.target.composing||(t.withdrawMargin=a.target.value)}}}),t._v(" "),i("div",{staticClass:"input-group-append"},[i("span",{staticClass:"input-group-text symbol"},[t._v(t._s(t.symbol))])]),t._v(" "),i("div",{staticClass:"w-100 mt-4"},[i("button",{attrs:{type:"button",id:"withdrawMarginButton"},on:{click:t.onwithdrawMargin}},[i("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),t._v("\n                      WITHDRAW MARGIN\n                    ")])])])])]):t._e()]),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticStyle:{background:"#141924","border-radius":"40px 0 40px 0",width:"28.8rem"}},[i("div",{staticClass:"card-body position"},[i("p",[t._v("Position Info")]),t._v(" "),i("hr",{staticStyle:{"border-top":"1px solid #253246"}}),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Position")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.position))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Average Entry Price")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.AverageEntryPrice))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Margin")]),t._v(" "),i("span",{staticClass:"marginNum float-right text-mute"},[t._v(t._s(t.margin))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Margin Held")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.MarginHeld))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Unrealized PnL")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.UnrealizedPnL))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Liquidation Price")]),t._v(" "),i("span",{staticClass:"Liquidationprice float-right text-mute"},[t._v(t._s(t.LiquidationPrice))])])])]),t._v(" "),t.announcement?i("div",{staticClass:"card card-bg mt-2",staticStyle:{background:"#141924","border-radius":"40px 0 40px 0",width:"28.8rem","margin-top":"13.4% !important"}},[i("div",{staticClass:"card-body position"},[i("button",{staticClass:"close",staticStyle:{padding:"0",margin:"0"},attrs:{type:"button",id:"trade_close"},on:{click:t.closeannouncement}},[i("span",{staticStyle:{color:"gray"},attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),t._m(11),t._v(" "),i("br"),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Liquidating Price ")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.LiquidationPrice))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Timestamp")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.Timestamp))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("By Liquidator")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.ByLiquidator))])])])]):t._e(),t._v(" "),i("div",{staticClass:"card card-bg pool-params mt-2",staticStyle:{background:"#141924","border-radius":"40px 0 40px 0",width:"28.8rem","margin-top":"13.4% !important","margin-bottom":"30px"}},[i("div",{staticClass:"card-body"},[i("p",[t._v("Contract Spec")]),t._v(" "),i("hr",{staticStyle:{"border-top":"1px solid #253246"}}),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Base Token")]),t._v(" "),i("span",{staticClass:"symbol float-right text-mute"},[t._v(t._s(t.symbol))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Symbol")]),t._v(" "),i("span",{staticClass:"svalue float-right text-mute"},[t._v(t._s(t.BaseToken))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Multiplier")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.Multiplier))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Funding Rate Coefficient")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.FundingRateCoefficient))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Min Initial Margin Ratio")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.MinInitialMarginRatio))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Min Maintenance Margin Ratio")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.MinMaintenanceMarginRatio))])]),t._v(" "),i("p",{staticClass:"card-text"},[i("span",{staticClass:"key text-muted"},[t._v("Transaction Fee ")]),t._v(" "),i("span",{staticClass:"value float-right text-mute"},[t._v(t._s(t.TransactionFee))])])])]),t._v(" "),t._m(12)])])])])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("span",{staticClass:"modal-title",staticStyle:{color:"black",margin:"0 auto"},attrs:{id:"exampleModalLabel"}},[this._v("CONFIRM")]),this._v(" "),a("button",{staticClass:"close",staticStyle:{padding:"0",margin:"0"},attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticStyle:{color:"gray"},attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("label",{staticStyle:{color:"black"}},[this._v("Direction")]),this._v(" "),a("span",{staticStyle:{color:"black",float:"right"}},[this._v("LONG")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"btn btn-warning",attrs:{type:"button",id:"pengding",disabled:""}},[a("span",{staticClass:"spinner spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}),this._v("\n              Pending\n            ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"modal-header"},[a("span",{staticClass:"modal-title",staticStyle:{color:"black",margin:"0 auto"},attrs:{id:"exampleModalLabel"}},[this._v("CONFIRM")]),this._v(" "),a("button",{staticClass:"close",staticStyle:{padding:"0",margin:"0"},attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticStyle:{color:"gray"},attrs:{"aria-hidden":"true"}},[this._v("×")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("label",{staticStyle:{color:"black"}},[this._v("Direction")]),this._v(" "),a("span",{staticStyle:{color:"black",float:"right"}},[this._v("SHORT")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"btn btn-warning",attrs:{type:"button",disabled:"",id:"short_pengding"}},[a("span",{staticClass:"spinner spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}),this._v("\n              Pending\n            ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("a",{attrs:{href:"https://deri.finance"}},[a("img",{staticStyle:{width:"6.9rem",height:"2rem"},attrs:{src:s("xAza")}})])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"input-group-append"},[a("span",{staticClass:"input-group-text",attrs:{id:"Contract-Volume"}},[this._v("Contracts")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"rc-slider-step"},[a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"0%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"12.5%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"25%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"37.5%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"50%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"62.5%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"75%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"87.5%"}}),a("span",{staticClass:"rc-slider-dot",staticStyle:{left:"100%"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{attrs:{"data-toggle":"modal","data-target":"#exampleModal",id:"place-order-buy"}},[a("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),this._v("\n                      PLACE ORDER\n                    ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("button",{attrs:{"data-toggle":"modal","data-target":"#modalshort",id:"place-order-sell"}},[a("span",{staticClass:"spinner spinner-border spinner-border-sm",staticStyle:{display:"none"},attrs:{role:"status","aria-hidden":"true"}}),this._v("\n                      PLACE ORDER\n                    ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"card-text"},[a("span",{staticClass:"key text-muted"},[this._v("Position liquidated at")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"card card-bg mt-2",staticStyle:{"background-color":"rgba(0, 0, 0, 0.4)","border-radius":"30px 0 30px 0",width:"325px",display:"none","margin-top":"30px !important"},attrs:{id:"trade"}},[s("div",{staticClass:"card-body position"},[s("button",{staticClass:"close",staticStyle:{padding:"0",margin:"0"},attrs:{type:"button",id:"trade_close"}},[s("span",{staticStyle:{color:"gray"},attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),s("p",{staticClass:"card-text"},[s("span",{staticClass:"key text-muted"},[t._v("trade")])]),t._v(" "),s("br"),t._v(" "),s("p",{staticClass:"card-text"},[s("span",{staticClass:"key text-muted"},[t._v("transactionHash ")]),t._v(" "),s("span",{staticClass:"transactionHash float-right text-mute",staticStyle:{display:"inline-block",width:"50px",overflow:"hidden",height:"20px"}},[t._v("---")])])])])}]};var o=s("VU/8")(l,r,!1,function(t){s("egYb"),s("nU+L"),s("iNQ1"),s("lQoL")},"data-v-5f3325f9",null);a.default=o.exports},egYb:function(t,a){},iNQ1:function(t,a){},lQoL:function(t,a){},"nU+L":function(t,a){}});