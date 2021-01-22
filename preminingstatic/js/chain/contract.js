class Contract {
    constructor() {
        /*address*/
        this._pool_address = null;
        this._btoken_address = null;
        this._positiontoken_address = null;
        this._liquidityToken_address = null;
        /*abi*/
        this._pool_abi = null;
        this._btoken_abi = null;
        this._positiontoken_abi = null;
        this._liquidityToken_abi = null;
        /*contracts*/
        this.poolContract = null;
        this.btokenContract = null;
        this.positionTokenContract = null;
        this.liquidityTokenContract = null;
        /* UNIT */
        this._ONE = 10 ** 18;
        this._BONE = null;

        this._addresses = {};

        this._wallet = new Wallet();
        this._web3 = null;

        this.account = null;

        this._initConfig();
        this.event_list = [];
        this.liquidate_event_list = [];
    }

    connectWallet() {
        return this._wallet.connectWallet().then((ret) => {
            this.account = ret[0];
            this._web3 = this._wallet.getWeb3();
            this.poolContract = this._getContract(this._pool_address, this._pool_abi);
            this.btokenContract = this._getContract(this._btoken_address, this._btoken_abi);
            this.positionTokenContract = this._getContract(this._positiontoken_address, this._positiontoken_abi);
            this.liquidityTokenContract = this._getContract(this._liquidityToken_address, this._liquidityToken_abi);
            this._wallet.bindEvent();
            return Promise.all([
                this.account,
                this.poolContract,
                this.btokenContract,
                this.positionTokenContract,
                this.liquidityTokenContract,
                this._getParameters(),
                this._getBTokenUNIT()
            ])
        })
    };

    isWalletConnected() {
        if (!this.account || !this._web3 || !this.poolContract) {
            return false;
        } else {
            return true;
        }
    };

    _getContract(address, abi) {
        return new this._web3.eth.Contract(abi, address);
    };

    _initConfig() {
        return Promise.all([this.readConfig("address.json"),
        this.readConfig("pool.abi"),
        this.readConfig("btoken.abi"),
        this.readConfig("positiontoken.abi"),
        this.readConfig("liquidityToken.abi"),
        ]).then((ret) => {

            let address = ret[0];
            this._pool_address = address["pool_address"];
            this._btoken_address = address["btoken_address"];
            this._positiontoken_address = address["positiontoken_address"];
            this._liquidityToken_address = address["liquidityToken_address"];
            this._pool_abi = $.parseJSON(ret[1]);
            this._btoken_abi = $.parseJSON(ret[2]);
            this._positiontoken_abi = $.parseJSON(ret[3]);
            this._liquidityToken_abi = $.parseJSON(ret[4]);
        })
    };

    readConfig(fileName) {
        return $.ajax({
            url: "preminingstatic/js/chain/config/" + fileName,
            async: false,
            success: function (ret) {
                return ret;
            },
            error: function (err) {
                console.log(err)
                return err;
            }
        })
    };

    /*将链上拿到的数据转换为常用的单位类型*/
    dividedByUNIT(value) {
        return new BigNumber(value).dividedBy(this._ONE);
    }

    /*进行单位转换*/
    dividedByBONE(value) {
        return new BigNumber(value).dividedBy(this._BONE);
    }

    /*BigNumber类型转换*/
    format(bigNumber) {
        return bigNumber.toFormat().replaceAll(",", "").toString();
    }

    /*调用链上方法*/
    call(contract, func, params) {
        if (params) {
            return contract.methods[func](...params).call().then((ret) => {
                return ret;
            }).catch((err) => {
                console.log(err)
            });
        } else {
            return contract.methods[func]().call().then((ret) => {
                return ret;
            }).catch((err) => {
                console.log(err)
            });
        }
    };

    transact(contract, func, value) {
        // return contract.methods[func](...value).estimateGas({'from': this.account})
        //     .then((ret) => {
        //         console.log(...value);
        return contract.methods[func](...value).send({ 'from': this.account, 'gas': 2000000 });
        // }).catch((err) => {
        //     console.log(err);
        // })
    };

    // btokenContract
    /*获取钱包余额*///已测
    _getWalletBalanceOf() {
        return this.call(this.btokenContract, "balanceOf", [this.account]).then((ret) => {
            return ret
        }).catch((err) => {
            console.log(err);
        })
    };

    /*获取钱包余额（币的余额），网页端显示*///已测
    getWalletBalanceOf() {
        return this._getWalletBalanceOf().then((ret) => {
            return { "balance": this.format(this.dividedByBONE(new BigNumber(ret))) };
        }).catch((err) => {

        })
    };

    /**///已测
    mint(account, amount) {
        amount = this.format(new BigNumber(amount).multipliedBy(this._BONE));
        return this.transact(this.btokenContract, "mint", [account, amount]).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    }

    /*获取symbol*///已测
    getSymbol() {
        return this.call(this.btokenContract, "symbol").then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };

    /*授权给pool能使用的额度，或者说是unlock*/
    approveMax(spender) {
        if (spender == undefined) spender = this.poolContract._address;
        return this.transact(this.btokenContract, "approve",
            [spender, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff']).then((ret) => {
                return ret;
            }).catch((err) => {
                console.log(err);
            })
    };

    /*获取approve的余额*///已测
    _getAllowance(spender) {
        if (spender == undefined) spender = this.poolContract._address;
        return this.call(this.btokenContract, "allowance", [this.account, spender]).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };

    /*获取approve的余额，网页端展示*///已测
    getAllowance(spender) {
        return this._getAllowance(spender).then((ret) => {
            return { "allowance": this.format(this.dividedByBONE(new BigNumber(ret))) };
        }).catch((err) => {
            console.log("获取allowance 失败");
        })

    };

    /**///已测
    _getBTokenUNIT() {
        //获取币的decimals
        return this.call(this.btokenContract, "decimals").then((ret) => {
            this._BONE = 10 ** ret;
            return ret;
        }).catch((err) => {
        })
    };

    //poolContract
    /**///已测
    _getParameters() {
        return this.call(this.poolContract, "getParameters").then((ret) => {
            //(multiplier, feeRatio, minPoolMarginRatio, minInitialMarginRatio, minMaintenanceMarginRatio, minAddLiquidity,
            // fundingRateCoefficient, minLiquidationReward, maxLiquidationReward, liquidationCutRatio, priceDelayAllowance)
            this.multiplier = this.dividedByUNIT(ret.multiplier);
            this.feeRatio = this.dividedByUNIT(ret.feeRatio);
            this.minPoolMarginRatio = this.dividedByUNIT(ret.minPoolMarginRatio);
            this.minInitialMarginRatio = this.dividedByUNIT(ret.minInitialMarginRatio);
            this.minMaintenanceMarginRatio = this.dividedByUNIT(ret.minMaintenanceMarginRatio);
            this.minAddLiquidity = this.dividedByUNIT(ret.minAddLiquidity);
            this.fundingRateCoefficient = this.dividedByUNIT(ret.fundingRateCoefficient);
            this.minLiquidationReward = this.dividedByUNIT(ret.minLiquidationReward);
            this.maxLiquidationReward = this.dividedByUNIT(ret.maxLiquidationReward);
            this.liquidationCutRatio = this.dividedByUNIT(ret.liquidationCutRatio);
            this.priceDelayAllowance = ret.priceDelayAllowance;
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    }

    /*获取交易的参数*///已测
    getPoolTradeParams() {
        return {
            "multiplier": this.format(this.multiplier),
            "feeRatio": this.format(this.feeRatio),
            "minPoolMarginRatio": this.format(this.minPoolMarginRatio),
            "minInitialMarginRatio": this.format(this.minInitialMarginRatio),
            "minMaintenanceMarginRatio": this.format(this.minMaintenanceMarginRatio),
            "minAddLiquidity": this.format(this.minAddLiquidity),
            "fundingRateCoefficient": this.format(this.fundingRateCoefficient),
            "minLiquidationReward": this.format(this.minLiquidationReward),
            "maxLiquidationReward": this.format(this.maxLiquidationReward),
            "liquidationCutRatio": this.format(this.liquidationCutRatio),
            "priceDelayAllowance": this.priceDelayAllowance
        };
    };

    /*获取最小添加流动性值，网页显示*/
    getMinAddLiquidity() {
        return this.format(this.minAddLiquidity);
    }
    checkPoolLiquidity(tradeVolume) {
        tradeVolume = new BigNumber(tradeVolume);
        return Promise.all([
            this._getStateValues(),
            this._getPositionArgs()
        ]).then(ret => {

            let zero = new BigNumber(0);
            let price = this.dividedByUNIT(new BigNumber(ret[0]["price"]));
            let stateValues = ret[1];
            let args = ret[2];
            let cumuFundingRate = this.dividedByUNIT(new BigNumber(stateValues["cumuFundingRate"]));

            // let funding = volume * (cumuFundingRate - lastCumuFundingRate) * 2;
            let curCost = tradeVolume.multipliedBy(price).multipliedBy(this.multiplier);//this.dividedByUNIT(positionInfo[2]);
            let volume = args[0];
            let cost = args[1];
            let lastCumuFundingRate = args[2];
            let funding = volume.multipliedBy(cumuFundingRate.minus(lastCumuFundingRate)).multipliedBy(new BigNumber(2));

            let fee = curCost.abs().multipliedBy(this.feeRatio);

            let realizedCost = new BigNumber(0);
            if ((volume.gte(zero) && tradeVolume.gte(zero)) || (volume.lte(zero) && tradeVolume.lte(zero))) {
            } else if (volume.abs().lte(tradeVolume.abs())) {
                realizedCost = curCost.multipliedBy(volume.abs()).dividedBy(tradeVolume.abs()).plus(cost);
            } else {
                realizedCost = cost.multipliedBy(tradeVolume.abs()).dividedBy(volume.abs()).plus(curCost);//cost * abs(tradeVolume) / abs(volume) + curCost
            }
            let tradersNetVolume = this.dividedByUNIT(new BigNumber(stateValues["tradersNetVolume"]));
            let tradersNetCost = this.dividedByUNIT(new BigNumber(stateValues["tradersNetCost"]));
            let liquidity = this.dividedByUNIT(new BigNumber(stateValues["liquidity"]));
            tradersNetVolume = tradersNetVolume.plus(tradeVolume);//tradersNetVolume += tradeVolume
            tradersNetCost = tradersNetCost.plus(curCost).minus(realizedCost);//tradersNetCost += curCost - realizedCost
            //liquidity += funding + fee + realizedCost
            liquidity = liquidity.plus(funding).plus(fee).plus(realizedCost);//liquidity += funding + fee + realizedCost
            let value = tradersNetVolume.multipliedBy(new BigNumber(-1)).multipliedBy(price).multipliedBy(this.multiplier);//-tradersNetVolume * price * multiplier
            // value = -tradersNetVolume * price * multiplier
            // ratio = (liquidity + value + tradersNetCost) / abs(value)
            // ratio >= minPoolMarginRatio
            let ratio = (liquidity.plus(value).plus(tradersNetCost)).dividedBy(value.abs());
            if (ratio.lte(this.minPoolMarginRatio)) return false;
            return true
        }).catch(err => {
            console.log(err);
            return false;
        })
    };
    /*添加流动性*/
    _addLiquidity(margin) {
        let funcName = "addLiquidity(uint256)";
        margin = this.format(new BigNumber(margin).multipliedBy(this._ONE));
        let params = [
            margin
        ]
        return this.transact(this.poolContract, funcName, params).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };

    /*添加流动性*///已测
    addLiquidity(margin) {
        //获取钱包余额,以及allowance
        return Promise.all([this._getWalletBalanceOf(), this._getAllowance()]).then((ret) => {
            let balance = new BigNumber(ret[0]);
            let allowance = new BigNumber(ret[1]);
            let _margin = new BigNumber(margin);
            
            if (balance.gte(_margin)) {
                if (allowance.lte(_margin)) {
                    //授权
                    return this.approveMax().then((ret) => {
                        return this._addLiquidity(margin);
                    })
                } else {
                    // 添加流动性
                    return this._addLiquidity(margin);
                }
            } else {
                console.log("钱包余额不足 ");
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    _getTotalSupply() {
        return this.call(this.liquidityTokenContract, "totalSupply").then(ret => {
            return ret;
        }).catch(err => {

        })
    }

    _getMaxRemoveLiquidity(amount) {
        return Promise.all([this._getLiquidity()]).then(ret => {
            return {
                "maxRemoveLiquidity": this.format(this.dividedByUNIT(new BigNumber(ret[0])))
            }
        }).catch(err => {
            return false;
        })
    };
    /*移除流动性*/
    _removeLiquidity(volume) {
        let funcName = "removeLiquidity(uint256)";
        volume = this.format(new BigNumber(volume).multipliedBy(this._ONE));
            let params = [
                volume
            ]
            return this.transact(this.poolContract, funcName, params).then(ret => {
                return true;
            }).catch(err => {
                return false;
            })
    };

    /*获取当前trader的流动性*/
    _getLiquidity() {
        return this.call(this.liquidityTokenContract, "balanceOf", [this.account]).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };
    _getPoolWithdrawLiquidity() {
        return Promise.all([this._getStateValues(), this._getTotalSupply()]).then(ret => {
            let liquidity = this.dividedByUNIT( ret[0]);
            let totalSupply = this.dividedByUNIT(ret[1]);
            let poolDynamicEquity = liquidity;
           
            let amount = liquidity.multipliedBy(totalSupply.dividedBy(poolDynamicEquity));

            return amount;
        }).catch(err => {
            console.log(err);
        })
    }
    /*获取流动性，主要用于网页展示*/
    getLiquidity() {
        return this._getLiquidity().then((ret) => {
            return this.format(this.dividedByUNIT(ret))
        }).catch((err) => {
        })
    };
    /*移除流动性*///已测
    removeLiquidity(volume) {
        let result = { "status": false, "message": "" }
        return Promise.all([this._getLiquidity(), this._getPoolWithdrawLiquidity()]).then(ret => {
            let liquidity = new BigNumber(ret[0]);
            let poolWithdrawLiquidity = new BigNumber(ret[1]);
            let amount = liquidity.lte(poolWithdrawLiquidity) ? liquidity : poolWithdrawLiquidity;
            volume = new BigNumber(volume);
            if (volume.lte(amount)) {
                return this._removeLiquidity(volume).then((ret) => {
                    result["status"] = true;
                    return true;
                }).catch((err) => {
                    console.log("移除流动性失败", err);
                    return false;
                })
            } else {
                console.log("沒有足够的流动性移除");
                return false;
            }
        }).catch(err => {
            console.log(err);
            return false;
        })

    };
    _getStateValues() {
        return this.call(this.poolContract, "getStateValues").then((ret) => {
            return ret;
        }).catch((err) => {

        })
    };
    /*获取总流动性*///已测
    getNetLiquidity() {
        return this._getStateValues().then((ret) => {
            return this.format(this.dividedByUNIT(ret));
        }).catch((err) => {
        })
    };
    /*获取价格*///已测
    _getPrice() {
        return $.ajax({
            url: "https://oracle.deri.finance/price/",
            async: true,
            type: 'get',
            success: function (ret) {
                return ret;
            },
            error: function (err) {
                console.log(err);
            }
        }
        );
    }

    /*网页展示的价格*///已测
    getPrice() {
        return Promise.all([this._getPrice()]).then((ret) => {
            return { "price": this.format(this.dividedByUNIT(new BigNumber(ret[0].price))) };
        }).catch((err) => {
            console.log(err);
        })
    }

    calMargin(volume, leverage = 1) {
        return Promise.all([this._getPrice()]).then(ret => {
            let price = this.dividedByUNIT(new BigNumber(ret[0]["price"]));
            leverage = new BigNumber(leverage);
            volume = new BigNumber(volume).abs();
            let fee = volume.multipliedBy(price).multipliedBy(this.multiplier).multipliedBy(this.feeRatio);
            return {
                "margin": this.format(volume.multipliedBy(price).multipliedBy(this.multiplier).dividedBy(leverage)),
                "fee": this.format(fee)
            }
        }).catch(err => {

        })
    }

    calFee(volume) {
        return Promise.all([this._getPrice()]).then(ret => {
            let price = this.dividedByUNIT(new BigNumber(ret[0]["price"]));
            volume = new BigNumber(volume).abs();
            let fee = volume.multipliedBy(price).multipliedBy(this.multiplier).multipliedBy(this.feeRatio);
            return {
                "fee": this.format(fee)
            }
        }).catch(err => {

        })
    }

    perLiquidityShare() {
        return Promise.all([this._getStateValues(),  this._getTotalSupply()]).then(ret => {
            // let price = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
            let liquidity = this.dividedByUNIT(ret[0]);
            // let tradersNetCost = this.dividedByUNIT(args["tradersNetCost"]);
            // let tradersNetVolume = this.dividedByUNIT(args["tradersNetVolume"]);
            let totalSupply = this.dividedByUNIT(ret[1]);
            // let poolDynamicEquity = liquidity.plus(tradersNetCost).minus(tradersNetVolume.multipliedBy(price).multipliedBy(this.multiplier));
            let poolDynamicEquity = liquidity;
            let per_liquidity_share = poolDynamicEquity.dividedBy(totalSupply);
            
            return this.format(per_liquidity_share);
        }).catch(err => {
            console.log(err);
        })
    }

    poolSymbol() {
        return this.call(this.poolContract, "symbol").then(ret => {
            return ret;
        }).catch(err => {

        })
    }



    _getPastEvent(contract, eventName) {
        //AllEvents
        return contract.getPastEvents(
            eventName,
            {
                fromBlock: 0,
                toBlock: 'latest'
            },
        ).then(function (events) {
            return events;
        }).catch(err => {
            return [];
        });
    }

    _getEvent(contract, eventName, filter = {}) {
        //AllEvents
        return Promise.all([event(eventName)]).then(ret => {
            return ret;
        }).catch(err => {
            console.log(err);
        })

        function event(eventName) {
            return contract.events[eventName]({
                filter: filter, // Using an array means OR: e.g. 20 or 23
                fromBlock: 0
            }).on('data', function (event) {
                return event;
            }).on('changed', function (event) {
                // remove event from local database
                return event;
            }).on('error', console.error);
        }
    }

}

let c = new Contract();
c.connectWallet()