webpackJsonp([5],{"0dlO":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAABM0lEQVQ4Ec2Uu2oCURCGXU0n0cIiVQoxrI2VW/saNunyAHkAIaWIT+JD+BYSFJsQsFFYRBMv5ck3yxnFvbhH0njgY2bOzPw7Z2+Fwr0vTwY0xjxi+lCW+Mb1S33P87yD9KngM/4MRHANe8hbFQqqsIUmgquLBqbswA6m8HSRjAXkfVhACEEsfQ5J5opS04KlpXXuzvCuiZILQKaS6fwMieQ2xTrpJ/6DVGAbsIEvqCe7cnZoegdZ8sBE8DWKjGnbeGJjMROVi66uQczuYrGGP9YZYJvWn2vymqDWpFpek1Faopi26bInx7z1yHm693fk6DPVsf91ZJrl85Kfhzz50IqmHtnmkgaRN3vTP7BH+IboHUxWO+zQrIK4Zgw1h7bsEgS6osQaQim70jGDSBFeHMtPZX8y6QvLy5dPOwAAAABJRU5ErkJggg=="},"99O4":function(t,e,s){"use strict";var a=s("d7EF"),i=s.n(a),n=s("Gu7T"),r=s.n(n),l=s("Xxa5"),o=s.n(l),c=s("//Fk"),d=s.n(c),u=s("exGp"),h=s.n(u),v=s("Zrlr"),p=s.n(v),b=s("wxAW"),m=s.n(b),A=s("5IcD"),f=s.n(A),_=s("zf2T");function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return 0==e?Object(_.a)(t):e>0?Object(_.a)(t).times(Object(_.a)("1"+"0".repeat(e))):Object(_.a)(t).div(Object(_.a)("1"+"0".repeat(-e)))}function y(t){return g(t,-18)}_.a.config({DECIMAL_PLACES:18,ROUNDING_MODE:_.a.ROUND_DOWN,EXPONENTIAL_AT:256});var C=function(){function t(){p()(this,t),this.web3=null,this.ethereum=null,this.account=null,this.oracleUrl=null,this.addresses=null,this.abifiles=null,this.methods=null,this.pool=null,this.bToken=null,this.pToken=null,this.lToken=null,this.symbol=null,this.bSymbol=null,this.bDecimals=null,this.multiplier=null,this.feeRatio=null,this.minPoolMarginRatio=null,this.minInitialMarginRatio=null,this.minMaintenanceMarginRatio=null,this.minAddLiquidity=null,this.redemptionFeeRatio=null,this.fundingRateCoefficient=null,this.minLiquidationReward=null,this.maxLiquidationReward=null,this.liquidationCutRatio=null,this.priceDelayAllowance=null,this.oracle={},this.balance={},this.position={volume:g(0),cost:g(0),lastCumuFundingRate:g(0),margin:g(0),lastUpdateTimestamp:g(0)},this.states={}}return m()(t,[{key:"initialize",value:function(){var t=h()(o.a.mark(function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.web3=new f.a(new f.a.providers.HttpProvider("https://ropsten.infura.io/v3/194f1b2b258e45ad9e50d5e30f2ec8bb")),t.next=3,this._initializeContracts(e);case 3:return t.next=5,this._initializeParameters();case 5:return t.next=7,d.a.all([this._updateStates()]);case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"_call",value:function(){var t=h()(o.a.mark(function t(e,s){var a,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(a=e.methods)[this.methods[s]].apply(a,r()(i)).call();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return function(e,s){return t.apply(this,arguments)}}()},{key:"_readjson",value:function(){var t=h()(o.a.mark(function t(e){var s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("static/config/"+e);case 2:return s=t.sent,t.next=5,s.json();case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"_initializeContracts",value:function(){var t=h()(o.a.mark(function t(e){var s,a,n,r,l,c;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._readjson("config.json");case 3:return s=t.sent,this.addresses=s.addresses[e],this.abifiles=s.abifiles,this.methods=s.methods,t.next=9,d.a.all([this._readjson(this.abifiles.pool),this._readjson(this.abifiles.bToken),this._readjson(this.abifiles.lToken)]);case 9:a=t.sent,n=i()(a,3),r=n[0],l=n[1],c=n[2],this.pool=new this.web3.eth.Contract(r,this.addresses.pool),this.bToken=new this.web3.eth.Contract(l,this.addresses.bToken),this.lToken=new this.web3.eth.Contract(c,this.addresses.lToken),t.next=22;break;case 19:t.prev=19,t.t0=t.catch(0),console.log("Chain: _initializeContracts() error: "+t.t0);case 22:case"end":return t.stop()}},t,this,[[0,19]])}));return function(e){return t.apply(this,arguments)}}()},{key:"_initializeParameters",value:function(){var t=h()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._call(this.pool,"symbol");case 3:return this.symbol=t.sent,t.next=6,this._call(this.bToken,"symbol");case 6:this.bSymbol=t.sent,t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log("Chain: _initializeParameters() error: "+t.t0);case 12:case"end":return t.stop()}},t,this,[[0,9]])}));return function(){return t.apply(this,arguments)}}()},{key:"_updateStates",value:function(){var t=h()(o.a.mark(function t(){var e;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this._call(this.pool,"getStateValues");case 3:e=t.sent,this.states.cumuFundingRate=y(e.cumuFundingRate),this.states.cumuFundingRateBlock=g(e.cumuFundingRateBlock),this.states.liquidity=y(e.liquidity),this.states.tradersNetVolume=y(e.tradersNetVolume),this.states.tradersNetCost=y(e.tradersNetCost),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(){return t.apply(this,arguments)}}()}]),t}();e.a=C},BA7O:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("7t+N");var a=s("99O4"),i=(s("VI/i"),new a.a),n={name:"pools",data:function(){return{msg:"",lists:[],data:[]}},methods:{initialize:function(){var t=this;i._readjson("config.json").then(function(e){var s=e.addresses;t.lists=s,s.map(function(e,s){var i=new a.a;i.initialize(s).then(function(){var e={};e.underlyer=i.symbol,e.basetoken=i.bSymbol,e.pool=i.states.liquidity.toString(),e.pool=+e.pool,e.pool=e.pool.toFixed(0),e.addresses=i.addresses.pool,e.index=s,e.addresses=e.addresses.slice(0,6)+"..."+e.addresses.slice(e.addresses.length-4,e.addresses.length),t.data.push(e)})})})}},mounted:function(){this.initialize()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hello"},[t._m(0),t._v(" "),s("div",{staticClass:"container-fluid ml-0"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-12 ml-0 mt-5",staticStyle:{"overflow-y":"hidden"}},[s("div",{staticClass:"banner"},[s("div",{staticClass:"container-fluid"},[t._m(1),t._v(" "),s("div",{staticClass:"row mt-2"},[s("table",{staticClass:"table table-hover table-dark table-border sidebar-bg"},[t._m(2),t._v(" "),s("tbody",t._l(t.data,function(e){return s("tr",{key:e.index,staticStyle:{height:"4.4rem"}},[s("td",{},[t._v(t._s(e.addresses))]),t._v(" "),s("td",{},[t._v(t._s(e.underlyer))]),t._v(" "),s("td",{},[t._v(t._s(e.basetoken))]),t._v(" "),s("td",{},[t._v(t._s(e.pool))]),t._v(" "),s("td",{},[t._v("--")]),t._v(" "),s("td",{},[s("router-link",{attrs:{to:{name:"trade",params:{id:e.index}}}},[s("button",{staticClass:"trade"},[t._v("trade")])]),t._v(" "),s("router-link",{attrs:{to:{name:"liquidity",params:{id:e.index}}}},[s("button",{staticClass:"liquidity"},[t._v("add liquidity")])]),t._v(" "),s("router-link",{attrs:{to:"/oracle"}},[s("button",{staticClass:"oracle"},[t._v("oracle")])])],1)])}),0)])])])])])])]),t._v(" "),t._m(3)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("nav",{staticClass:"navbar sticky-top navbar-expand-md navbar-dark sidebar-bg  navbar-offcanvas",staticStyle:{height:"80px"}},[e("div",{staticClass:"container-fluid"},[e("div",[e("a",{attrs:{href:"https://deri.finance"}},[e("img",{staticStyle:{width:"6.9rem",height:"2rem"},attrs:{src:s("xAza")}})])]),this._v(" "),e("div"),this._v(" "),e("div",{staticClass:"navbar-collapse ml-auto collapse show",attrs:{id:"navbar-mobile"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row justify-content-between"},[e("div",{staticClass:"col-md-6 col-sm-12 mt-1 text-left"}),this._v(" "),e("div",{staticClass:"col-md-6 col-sm-6 mt-1 text-right filter align-items-center"},[e("p",{staticClass:"mt-1",staticStyle:{color:"#b0b1c1",display:"none"}},[this._v("\n                  Filter by asset    \n                  "),e("img",{staticStyle:{cursor:"pointer"},attrs:{src:s("0dlO"),alt:"","data-toggle":"modal","data-target":"#search"}})])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",{staticStyle:{"background-color":"#141924"}},[s("tr",{staticStyle:{height:"3.8rem"}},[s("th",{staticClass:"text-left",attrs:{scope:"col"}},[t._v("Pool address")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Underlyer")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Base token")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("Pool liquidity")]),t._v(" "),s("th",{attrs:{scope:"col"}},[t._v("My liquidity")]),t._v(" "),s("th",{attrs:{scope:"col"}})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal fade",attrs:{id:"search",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalCenterTitle","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[s("div",{staticClass:"modal-content sidebar-bg fcb b1"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"exampleModalCenterTitle"}},[t._v("\n            Select token\n          ")]),t._v(" "),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{staticStyle:{color:"white"},attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),s("div",{staticClass:"modal-body pl-0 pr-0 pb-0"},[s("div",{staticClass:"input-group mb-3 ml-3 mr-3",staticStyle:{width:"80%",margin:"2rem auto !important"}},[s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text",attrs:{id:"basic-addon1"}},[s("i",{staticClass:"fas fa-search ml-2 fcb"})])]),t._v(" "),s("input",{staticClass:"form-control name fcb",attrs:{type:"text","aria-label":"Username","aria-describedby":"basic-addon1",placeholder:"Search name, symbol or address",id:"name"}})]),t._v(" "),s("ul",{staticClass:"list-group sidebar-bg fcb"},[s("li",{staticClass:"list-group-item sidebar-bg btb"},[t._v("Cras justo odio")]),t._v(" "),s("li",{staticClass:"list-group-item sidebar-bg btb"},[t._v("\n              Dapibus ac facilisis in\n            ")]),t._v(" "),s("li",{staticClass:"list-group-item sidebar-bg btb"},[t._v("Morbi leo risus")])])])])])])}]};var l=s("VU/8")(n,r,!1,function(t){s("zr77"),s("t0ea")},"data-v-cb2dde2a",null);e.default=l.exports},t0ea:function(t,e){},zr77:function(t,e){}});