webpackJsonp([3],{"4YfN":function(t,e,o){"use strict";e.__esModule=!0;var n,i=o("aA9S"),s=(n=i)&&n.__esModule?n:{default:n};e.default=s.default||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}},G7dL:function(t,e,o){o("UFnr"),t.exports=o("DH3n").Object.assign},OnAv:function(t,e,o){"use strict";var n=o("5cPm"),i=o("Lzmh"),s=o("j4Mf"),r=o("QUP2"),a=o("PGvq"),c=o("W0Hg"),l=Object.assign;t.exports=!l||o("cqFu")(function(){var t={},e={},o=Symbol(),n="abcdefghijklmnopqrst";return t[o]=7,n.split("").forEach(function(t){e[t]=t}),7!=l({},t)[o]||Object.keys(l({},e)).join("")!=n})?function(t,e){for(var o=a(t),l=arguments.length,d=1,_=s.f,h=r.f;l>d;)for(var u,p=c(arguments[d++]),f=_?i(p).concat(_(p)):i(p),m=f.length,g=0;m>g;)u=f[g++],n&&!h.call(p,u)||(o[u]=p[u]);return o}:l},UFnr:function(t,e,o){var n=o("uSC2");n(n.S+n.F,"Object",{assign:o("OnAv")})},aA9S:function(t,e,o){t.exports={default:o("G7dL"),__esModule:!0}},ra72:function(t,e,o){(function(t){"use strict";function e(t,o){var i=n({},t);for(var s in o)"object"!=typeof t[s]||null===t[s]||Array.isArray(t[s])?void 0!==o[s]&&(i[s]=o[s]):i[s]=e(t[s],o[s]);return i}function o(){return"1.13 (internal id b235e44c @ 2019-03-20 03:56:17.207031)"}var n=Object.assign||function(t){for(var e,o=arguments,n=1,i=arguments.length;n<i;n++)for(var s in e=o[n])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},i={mobile:{disabled_features:["left_toolbar","header_widget","timeframes_toolbar","edit_buttons_in_legend","context_menus","control_bar","border_around_the_chart"],enabled_features:[]}},s={width:800,height:500,symbol:"AA",interval:"D",timezone:"Etc/UTC",container_id:"",library_path:"",locale:"en",widgetbar:{details:!1,watchlist:!1,watchlist_settings:{default_symbols:[]}},overrides:{"mainSeriesProperties.showCountdown":!1},studies_overrides:{},brokerConfig:{configFlags:{}},fullscreen:!1,autosize:!1,disabled_features:[],enabled_features:[],debug:!1,logo:{},time_frames:[{text:"5y",resolution:"W"},{text:"1y",resolution:"W"},{text:"6m",resolution:"120"},{text:"3m",resolution:"60"},{text:"1m",resolution:"30"},{text:"5d",resolution:"5"},{text:"1d",resolution:"1"}],client_id:"0",user_id:"0",charts_storage_api_version:"1.0",favorites:{intervals:[],chartTypes:[]}},r=function(){function t(t){if(this._id="tradingview_"+(1048576*(1+Math.random())|0).toString(16).substring(1),this._ready=!1,this._readyHandlers=[],this._onWindowResize=this._autoResizeChart.bind(this),!t.datafeed)throw new Error("Datafeed is not defined");if(this._options=e(s,t),t.preset){var o=i[t.preset];o?(void 0!==this._options.disabled_features?this._options.disabled_features=this._options.disabled_features.concat(o.disabled_features):this._options.disabled_features=o.disabled_features,void 0!==this._options.enabled_features?this._options.enabled_features=this._options.enabled_features.concat(o.enabled_features):this._options.enabled_features=o.enabled_features):console.warn("Unknown preset: `"+t.preset+"`")}"Dark"===this._options.theme&&void 0===this._options.loading_screen&&(this._options.loading_screen={backgroundColor:"#131722"}),this._create()}return t.prototype.onChartReady=function(t){this._ready?t.call(this):this._readyHandlers.push(t)},t.prototype.onGrayedObjectClicked=function(t){this._innerAPI().onGrayedObjectClicked(t)},t.prototype.onShortcut=function(t,e){this._innerWindow().createShortcutAction(t,e)},t.prototype.subscribe=function(t,e){this._innerAPI().subscribe(t,e)},t.prototype.unsubscribe=function(t,e){this._innerAPI().unsubscribe(t,e)},t.prototype.chart=function(t){return this._innerAPI().chart(t)},t.prototype.setLanguage=function(t){this.remove(),this._options.locale=t,this._create()},t.prototype.setSymbol=function(t,e,o){this._innerAPI().changeSymbol(t,e+"",o)},t.prototype.remove=function(){window.removeEventListener("resize",this._onWindowResize),this._readyHandlers.splice(0,this._readyHandlers.length),delete window[this._id];var t=this._getIFrameElement();t.contentWindow.destroyChart(),t.parentNode&&t.parentNode.removeChild(t)},t.prototype.closePopupsAndDialogs=function(){this._innerAPI().closePopupsAndDialogs()},t.prototype.selectLineTool=function(t){this._innerAPI().selectLineTool(t)},t.prototype.selectedLineTool=function(){return this._innerAPI().selectedLineTool()},t.prototype.save=function(t){this._innerAPI().saveChart(t)},t.prototype.load=function(t,e){this._innerAPI().loadChart({json:t,extendedData:e})},t.prototype.getSavedCharts=function(t){this._innerAPI().getSavedCharts(t)},t.prototype.loadChartFromServer=function(t){this._innerAPI().loadChartFromServer(t)},t.prototype.saveChartToServer=function(t,e,o,n){this._innerAPI().saveChartToServer(t,e,o,n)},t.prototype.removeChartFromServer=function(t,e){this._innerAPI().removeChartFromServer(t,e)},t.prototype.onContextMenu=function(t){this._innerAPI().onContextMenu(t)},t.prototype.createButton=function(t){return this._innerWindow().createButton(t)},t.prototype.showNoticeDialog=function(t){this._innerAPI().showNoticeDialog(t)},t.prototype.showConfirmDialog=function(t){this._innerAPI().showConfirmDialog(t)},t.prototype.showLoadChartDialog=function(){this._innerAPI().showLoadChartDialog()},t.prototype.showSaveAsChartDialog=function(){this._innerAPI().showSaveAsChartDialog()},t.prototype.symbolInterval=function(){return this._innerAPI().getSymbolInterval()},t.prototype.mainSeriesPriceFormatter=function(){return this._innerAPI().mainSeriesPriceFormatter()},t.prototype.getIntervals=function(){return this._innerAPI().getIntervals()},t.prototype.getStudiesList=function(){return this._innerAPI().getStudiesList()},t.prototype.addCustomCSSFile=function(t){this._innerWindow().addCustomCSSFile(t)},t.prototype.applyOverrides=function(t){this._options=e(this._options,{overrides:t}),this._innerWindow().applyOverrides(t)},t.prototype.applyStudiesOverrides=function(t){this._innerWindow().applyStudiesOverrides(t)},t.prototype.watchList=function(){return this._innerAPI().watchlist()},t.prototype.activeChart=function(){return this._innerAPI().activeChart()},t.prototype.chartsCount=function(){return this._innerAPI().chartsCount()},t.prototype.layout=function(){return this._innerAPI().layout()},t.prototype.setLayout=function(t){this._innerAPI().setLayout(t)},t.prototype.changeTheme=function(t){this._innerWindow().changeTheme(t)},t.prototype.takeScreenshot=function(){this._innerAPI().takeScreenshot()},t.prototype.lockAllDrawingTools=function(){return this._innerAPI().lockAllDrawingTools()},t.prototype._getIFrameElement=function(){var t=document.getElementById(this._id);if(null===t)throw new Error("There is no such iframe");return t},t.prototype._innerAPI=function(){return this._getIFrameElement().contentWindow.tradingViewApi},t.prototype._innerWindow=function(){return this._getIFrameElement().contentWindow},t.prototype._autoResizeChart=function(){this._options.fullscreen&&(this._getIFrameElement().style.height=window.innerHeight+"px")},t.prototype._create=function(){var t=this,e=this._render(),o=document.getElementById(this._options.container_id);if(null===o)throw new Error("There is no such element - #"+this._options.container_id);o.innerHTML=e;var n=this._getIFrameElement();(this._options.autosize||this._options.fullscreen)&&(n.style.width="100%",this._options.fullscreen||(n.style.height="100%")),window.addEventListener("resize",this._onWindowResize),this._onWindowResize();var i=function(){n.removeEventListener("load",i,!1),n.contentWindow.widgetReady(function(){t._ready=!0;for(var e=0,o=t._readyHandlers;e<o.length;e++){var i=o[e];try{i.call(t)}catch(t){console.error(t)}}n.contentWindow.initializationFinished()})};n.addEventListener("load",i,!1)},t.prototype._render=function(){var t=window;t[this._id]={datafeed:this._options.datafeed,customFormatters:this._options.customFormatters,brokerFactory:this._options.brokerFactory,overrides:this._options.overrides,studiesOverrides:this._options.studies_overrides,disabledFeatures:this._options.disabled_features,enabledFeatures:this._options.enabled_features,brokerConfig:this._options.brokerConfig,restConfig:this._options.restConfig,favorites:this._options.favorites,logo:this._options.logo,numeric_formatting:this._options.numeric_formatting,rss_news_feed:this._options.rss_news_feed,newsProvider:this._options.news_provider,loadLastChart:this._options.load_last_chart,saveLoadAdapter:this._options.save_load_adapter,loading_screen:this._options.loading_screen,settingsAdapter:this._options.settings_adapter,customIndicatorsUrl:this._options.indicators_file_name},this._options.saved_data&&(t[this._id].chartContent={json:this._options.saved_data});var e=(this._options.library_path||"")+"static/"+this._options.locale+"-tv-chart.b235e44cb167872e5a6e.html#symbol="+encodeURIComponent(this._options.symbol)+"&interval="+encodeURIComponent(this._options.interval)+(this._options.timeframe?"&timeframe="+encodeURIComponent(this._options.timeframe):"")+(this._options.toolbar_bg?"&toolbarbg="+this._options.toolbar_bg.replace("#",""):"")+(this._options.studies_access?"&studiesAccess="+encodeURIComponent(JSON.stringify(this._options.studies_access)):"")+"&widgetbar="+encodeURIComponent(JSON.stringify(this._options.widgetbar))+(this._options.drawings_access?"&drawingsAccess="+encodeURIComponent(JSON.stringify(this._options.drawings_access)):"")+"&timeFrames="+encodeURIComponent(JSON.stringify(this._options.time_frames))+"&locale="+encodeURIComponent(this._options.locale)+"&uid="+encodeURIComponent(this._id)+"&clientId="+encodeURIComponent(String(this._options.client_id))+"&userId="+encodeURIComponent(String(this._options.user_id))+(this._options.charts_storage_url?"&chartsStorageUrl="+encodeURIComponent(this._options.charts_storage_url):"")+(this._options.charts_storage_api_version?"&chartsStorageVer="+encodeURIComponent(this._options.charts_storage_api_version):"")+(this._options.custom_css_url?"&customCSS="+encodeURIComponent(this._options.custom_css_url):"")+(this._options.auto_save_delay?"&autoSaveDelay="+encodeURIComponent(String(this._options.auto_save_delay)):"")+"&debug="+this._options.debug+(this._options.snapshot_url?"&snapshotUrl="+encodeURIComponent(this._options.snapshot_url):"")+(this._options.timezone?"&timezone="+encodeURIComponent(this._options.timezone):"")+(this._options.study_count_limit?"&studyCountLimit="+encodeURIComponent(String(this._options.study_count_limit)):"")+(this._options.symbol_search_request_delay?"&ssreqdelay="+encodeURIComponent(String(this._options.symbol_search_request_delay)):"")+(this._options.theme?"&theme="+encodeURIComponent(String(this._options.theme)):"");return'<iframe id="'+this._id+'" name="'+this._id+'"  src="'+e+'"'+(this._options.autosize||this._options.fullscreen?"":' width="'+this._options.width+'" height="'+this._options.height+'"')+' frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="display:block;"></iframe>'},t}();window.TradingView=window.TradingView||{},window.TradingView.version=o,t.version=o,t.onready=function(t){window.addEventListener("DOMContentLoaded",t,!1)},t.widget=r,Object.defineProperty(t,"__esModule",{value:!0})})(e)},whCg:function(t,e){},zMny:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("4YfN"),i=o.n(n),s={},r=new(o("+RKF").a),a={history:s,getBars:function(t,e,o,n,a,c){console.log("resolution: ",e);var l={symbol:"BTCUSD",bars:200};switch(!0){case e.indexOf("D")>0:var d=e.substr(0,1);l.period=24*d*60*60;break;case e.indexOf("W")>0:var _=e.substr(0,1);l.period=24*_*60*60*7;break;case e.indexOf("M")>0:var h=e.substr(0,1);l.period=24*h*60*60*30;break;default:l.period=60*e}return console.log(l),r.$axios.get("https://oracle.deri.finance/pricekline/",{params:i()({},l)}).then(function(e){if(e.data.data.length){var o=e.data.data.map(function(t){return{time:String(t.ts).length<13?1e3*t.ts:t.ts,low:Number(t.l),high:Number(t.h),open:Number(t.o),close:Number(t.c),volume:Number(t.v)}});if(a){var n=o[o.length-1];s[t.name]={lastBar:n}}return o}return[]})}},c={supported_resolutions:["1","5","15","30","60","240","1D","5D","1W","1M"]},l={onReady:function(t){setTimeout(function(){return t(c)},0)},bars:{},searchSymbols:function(t,e,o,n){},resolveSymbol:function(t,e,o){var n={name:t,timezone:"Asia/Hong_Kong",pricescale:100,ticker:t,description:"",minmov:1,type:"crypto",has_intraday:!0,intraday_multipliers:["1","2","5","15","30","60","240","1D","7D","1W","1M"],has_weekly_and_monthly:!0,data_status:"streaming",has_no_volume:!0,pro_name:t,has_daily:!0,regular_session:"24x7"};setTimeout(function(){e(n)},0)},getBars:function(t,e,o,n,i,s,r){if(console.log(t,e,o),o>0&&n>0){var c=localStorage.getItem("localResolutions")||e;a.getBars(t,c,o,n,r).then(function(t){var e=t.length;console.log(t),e?1e3*n>t[e-1].time?(i(t,{noData:!1}),onResetCacheNeededCallback()):(i([],{noData:!0}),onResetCacheNeededCallback()):(i(t,{noData:!0}),onResetCacheNeededCallback())}).catch(function(t){s(t)})}},subscribeBars:function(t,e,o,n,i){console.log("=====subscribeBars runnning")},unsubscribeBars:function(t){},calculateHistoryDepth:function(t,e,o){},getMarks:function(t,e,o,n,i){},getTimeScaleMarks:function(t,e,o,n,i){},getServerTime:function(t){}},d=(o("3cXf"),new WebSocket("wss://xtsocket.xt.pub/websocket")),_=[];d.onopen=function(t){},d.onmessage=function(t){var e=JSON.parse(t.data);if(e.hasOwnProperty("data")&&e.data.hasOwnProperty("records")&&e.data.records.length){var o={};o.time=1e3*e.data.records[0][0],o.low=e.data.records[0][3],o.high=e.data.records[0][2],o.open=e.data.records[0][1],o.close=e.data.records[0][4],o.volume=e.data.records[0][5],console.log(o);var n=_[_.length-1];n.listener(o),n.lastBar=o}};var h=o("ra72"),u=localStorage.getItem("symbol")||"USDT";localStorage.getItem("localResolutions");var p={name:"coming",data:function(){return{tvWidget:null,websock:null,loading:!0,type:localStorage.getItem("localResolutions")||"1D",widgetOptions:{symbol:String("BTCUSD").replace(u,"").toUpperCase()+"/"+String(u).toUpperCase(),datafeed:l,interval:localStorage.getItem("localResolutions")||"1D",container_id:"tv_chart_container",library_path:"/static/charting_library/",locale:"en",disabled_features:["header_widget","display_market_status","timeframes_toolbar","left_toolbar","legend_context_menu","adptive_logo","use_localstorage_for_settings","edit_buttons_in_legend","control_bar","move_logo_to_main_pane"],enabled_features:["show_logo_on_all_charts"],charts_storage_url:"https://saveload.tradingview.com",charts_storage_api_version:"1.14",client_id:"tradingview.com",user_id:"public_user_id",fullscreen:!1,autosize:!0,overrides:{"paneProperties.background":"#19202b","paneProperties.vertGridProperties.color":"#19202B","paneProperties.horzGridProperties.color":"#19202B","symbolWatermarkProperties.transparency":90,"scalesProperties.textColor":"#AAA","mainSeriesProperties.candleStyle.wickUpColor":"#76af8e","mainSeriesProperties.candleStyle.wickDownColor":"#ee5766"},timezone:"Asia/Chongqing"}}},mounted:function(){var t=this,e=new h.widget(this.widgetOptions);this.tvWidget=e,e.onChartReady(function(){t.loading=!1})},methods:{changeTime:function(t){this.tvWidget.chart().refreshMarks(),localStorage.setItem("localResolutions",t),this.tvWidget.chart().setResolution(t),this.type=t}}},f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"tradingview"}},[o("div",{staticClass:"btn"},[o("span",{staticClass:"tab-btn",class:"1"==t.type?"active":"",on:{click:function(e){return t.changeTime("1")}}},[t._v("1min")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"5"==t.type?"active":"",on:{click:function(e){return t.changeTime("5")}}},[t._v("5min")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"15"==t.type?"active":"",on:{click:function(e){return t.changeTime("15")}}},[t._v("15min")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"30"==t.type?"active":"",on:{click:function(e){return t.changeTime("30")}}},[t._v("30min")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"60"==t.type?"active":"",on:{click:function(e){return t.changeTime("60")}}},[t._v("1hour")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"1D"==t.type?"active":"",on:{click:function(e){return t.changeTime("1D")}}},[t._v("1day")]),t._v(" "),o("span",{staticClass:"tab-btn",class:"1W"==t.type?"active":"",on:{click:function(e){return t.changeTime("1W")}}},[t._v("1week")])]),t._v(" "),t.loading?o("div",{staticClass:"loading"},[t._m(0)]):t._e(),t._v(" "),o("div",{attrs:{id:"tv_chart_container"}})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-border",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])}]};var m=o("C7Lr")(p,f,!1,function(t){o("whCg")},"data-v-e2c3360a",null);e.default=m.exports}});