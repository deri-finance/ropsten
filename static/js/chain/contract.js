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
            console.log(ret);
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
        console.log(this.poolContract);
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
            url: "static/js/chain/config/" + fileName,
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
        console.log(contract, func, params);
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
        console.log("contract, func, value", contract, func, value)
        // return contract.methods[func](...value).estimateGas({'from': this.account})
        //     .then((ret) => {
        //         console.log(...value);
        return contract.methods[func](...value).send({'from': this.account, 'gas': 2000000});
        // }).catch((err) => {
        //     console.log(err);
        // })
    };

    // btokenContract
    /*获取钱包余额*///已测
    _getWalletBalanceOf() {
        return this.call(this.btokenContract, "balanceOf", [this.account]).then((ret) => {
            console.log(ret);
            return ret
        }).catch((err) => {
            console.log(err);
        })
    };

    /*获取钱包余额（币的余额），网页端显示*///已测
    getWalletBalanceOf() {
        return this._getWalletBalanceOf().then((ret) => {
            console.log({"balance": this.format(this.dividedByBONE(new BigNumber(ret)))});
            return {"balance": this.format(this.dividedByBONE(new BigNumber(ret)))};
        }).catch((err) => {

        })
    };

    /**///已测
    mint(account, amount) {
        amount = this.format(new BigNumber(amount).multipliedBy(this._BONE));
        console.log("amount", amount);
        return this.transact(this.btokenContract, "mint", [account, amount]).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    }

    /*获取symbol*///已测
    getSymbol() {
        return this.call(this.btokenContract, "symbol").then((ret) => {
            console.log(ret);
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };

    /*授权给pool能使用的额度，或者说是unlock*/
    approveMax(spender) {
        console.log(spender);
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
            return {"allowance": this.format(this.dividedByBONE(new BigNumber(ret)))};
        }).catch((err) => {
            console.log("获取allowance 失败");
        })

    };

    /**///已测
    _getBTokenUNIT() {
        //获取币的decimals
        return this.call(this.btokenContract, "decimals").then((ret) => {
            console.log(ret);
            this._BONE = 10 ** ret;
            return ret;
        }).catch((err) => {
            console.log(err);
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
            console.log("_getParameters")
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

    /*交易*/

    tradeWithMargin(amount = 0, volume) {

        let funcName = "tradeWithMargin(int256,uint256,uint256,uint256,uint8,bytes32,bytes32)"
        let that = this;
        let result = {"status": false, "message": ""}
        if (volume == 0) {
            result["message"] = "volume不能为0";
            return result;
        }

        return Promise.all([this.checkPoolLiquidity(volume)]).then(ret => {
            console.log(ret);
            if (!ret[0]) {
                console.log("流动性不足");
                result["message"] = "流动性不足";
                return result;
            }
            return Promise.all([that.calMinAmount(volume, amount)]).then(ret => {
                if (ret[0] === true) {
                    return Promise.all([this.exists()]).then(ret => {
                        volume = new BigNumber(volume);
                        amount = new BigNumber(amount);
                        console.log(ret);
                        if (!ret[0]) {
                            return Promise.all([this._getWalletBalanceOf(), this._getPrice(), this._getAllowance()]).then(ret => {
                                console.log(ret)
                                let walletBalance = this.dividedByBONE(ret[0]);
                                let allowance = this.dividedByBONE(ret[2]);
                                let curPrice = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
                                console.log("curPrice", curPrice);
                                let _params = ret[1];
                                let params = [
                                    this.format(volume.multipliedBy(this._ONE)), this.format(amount.multipliedBy(this._ONE)), _params["timestamp"], _params["price"], _params["v"], _params["r"], _params["s"]
                                ]
                                //    检查钱包余额是否足够
                                if (walletBalance.gte(amount)) {
                                    //检查是否已经approve
                                    if (allowance.gte(amount)) {
                                        return this.transact(this.poolContract, funcName, params).then((ret) => {
                                            console.log("交易成功", ret);
                                            result["message"] = "交易成功";
                                            result["status"] = true;
                                            return result;
                                        }).catch((err) => {
                                            console.log("交易失败", err);
                                            result["message"] = "交易失败";
                                            result["status"] = false;
                                            return result;

                                        })
                                    } else {
                                        // 授权
                                        return this.approveMax().then(ret => {
                                            return this.transact(this.poolContract, funcName, params).then((ret) => {
                                                console.log("交易成功", ret);
                                                result["status"] = true;
                                                result["message"] = "交易成功";
                                                result["status"] = false;
                                                return result;
                                            }).catch((err) => {
                                                console.log("交易失败", err);
                                                result["message"] = "交易失败";
                                                result["status"] = false;
                                                return result;
                                            })
                                        }).catch(err => {
                                            console.log("approve 失败");
                                            result["message"] = "approve 失败";
                                            result["status"] = false;
                                            return result;
                                        })
                                    }
                                } else {
                                    console.log("钱包余额不足");

                                    result["message"] = "钱包余额不足";
                                    return result;
                                }
                            }).catch(err => {
                                console.log(err);
                                result["message"] = "获取信息失败";
                                return result;
                            })
                        } else {
                            return Promise.all([this._getWalletBalanceOf(), this._getPosition(), this._getPrice(), this._getAllowance()]).then(ret => {
                                console.log(ret)
                                let walletBalance = this.dividedByBONE(ret[0]);
                                let allowance = this.dividedByBONE(ret[3]);
                                let positionInfo = ret[1];
                                let currentVolume = this.dividedByUNIT(positionInfo[1]);
                                console.log("currentVolume", currentVolume);
                                let cost = this.dividedByUNIT(positionInfo[2]);
                                console.log("cost", cost);
                                let existsMargin = this.dividedByUNIT(positionInfo[4]);
                                console.log("existsMargin", existsMargin);
                                let curPrice = this.dividedByUNIT(new BigNumber(ret[2]["price"]));
                                console.log("curPrice", curPrice);
                                let _params = ret[2];
                                let finalVolume = currentVolume.plus(volume).abs();
                                console.log("finalVolume", finalVolume);
                                let notionalValue = finalVolume.multipliedBy(curPrice).multipliedBy(this.multiplier);
                                console.log(this.format(cost), this.format(notionalValue), this.format(finalVolume))
                                let allMargin = existsMargin.plus(amount);
                                let pnl = currentVolume.multipliedBy(curPrice).multipliedBy(this.multiplier).minus(cost);
                                let DE = allMargin.plus(pnl);
                                console.log(DE, this.format(DE), this.format(curPrice));
                                let marginRatio = DE.dividedBy(notionalValue);

                                console.log(marginRatio, this.format(marginRatio));

                                let params = [
                                    this.format(volume.multipliedBy(this._ONE)), this.format(amount.multipliedBy(this._ONE)), _params["timestamp"], _params["price"], _params["v"], _params["r"], _params["s"]
                                ]
                                // if (marginRatio.gte(this.minInitialMarginRatio)) {
                                //     console.log("可以开仓");

                                //    检查钱包余额是否足够
                                if (walletBalance.gte(amount)) {
                                    //检查是否已经approve
                                    if (allowance.gte(amount)) {
                                        return this.transact(this.poolContract, funcName, params).then((ret) => {
                                            console.log("交易成功", ret);
                                            result["status"] = true;
                                            result["message"] = "交易成功";
                                            return result;
                                        }).catch((err) => {
                                            console.log("交易失败", err);
                                            result["message"] = "交易失败";
                                            return result;
                                        })
                                    } else {
                                        // 授权
                                        return this.approveMax().then(ret => {
                                            return this.transact(this.poolContract, funcName, params).then((ret) => {
                                                console.log("交易成功", ret);
                                                result["status"] = true;
                                                result["message"] = "交易成功";
                                                return result;
                                            }).catch((err) => {
                                                console.log("交易失败", err);
                                                result["message"] = "交易失败";
                                                return result;
                                            })
                                        }).catch(err => {
                                            console.log("approve 失败");
                                            result["message"] = "approve 失败";
                                            return result;
                                        })
                                    }
                                } else {
                                    console.log("钱包余额不足");
                                    result["message"] = "钱包余额不足";
                                    return result;
                                }
                            }).catch(err => {
                                console.log(err);
                                result["message"] = "获取信息失败";
                                return result;
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                        return result;
                    })
                } else {
                    console.log(ret);
                    if (!ret[0]) {
                        result["message"] = "计算最小amount失败";
                        return result;
                    }
                    result["message"] = "最小amount：" + ret[0]["minAmount"];
                    return result;
                }
            }).catch(err => {
                console.log(err);
                result["message"] = "计算最小amount失败";
                return result;
            })
        }).catch(err => {
            console.log(err);
            result["message"] = "检查流动性失败";
            return result;
        })
    };

    calMinAmount(tradeVolume, amount) {
        // price
        // volume, cost, lastCumuFundingRate, margin
        // liquidity, tradersNetVolume, tradersNetCost
        //
        // funding = volume * (cumuFundingRate - lastCumuFundingRate) * 2
        // curCost = tradeVolume * price * multiplier
        // fee = abs(curCost) * feeRatio
        //
        // if (volume >= 0 and tradeVolume >= 0) or (volume <= 0 and tradeVolume <= 0):
        //     realizedCost = 0
        // elif abs(volume) <= abs(tradeVolume):
        //     realizedCost = curCost * abs(volume) / abs(tradeVolume) + cost
        // else:
        //     realizedCost = cost * abs(tradeVolume) / abs(volume) + curCost
        //
        // volume += tradeVolume
        // cost = cost + curCost - realizedCost
        // tradersNetVolume += tradeVolume
        // tradersNetCost += curCost - realizedCost
        // liquidity += funding + fee + realizedCost
        //
        // value = volume * price * multiplier
        //
        // 1. ((margin + amount - (funding + fee) - realizedCost) + value - cost) / abs(value) >= minInitialMarginRatio => amount >= AAA
        // 2. >= => amount >= BBB
        //
        // amount >= max(AAA, BBB)
        tradeVolume = new BigNumber(tradeVolume);
        return Promise.all([
            this._getPrice(),
            this._getStateValues(),
            this._getPositionArgs()
        ]).then(ret => {
            let zero = new BigNumber(0);
            let price = this.dividedByUNIT(new BigNumber(ret[0]["price"]));
            let args = ret[2];
            amount = new BigNumber(amount);

            let curCost = tradeVolume.multipliedBy(price).multipliedBy(this.multiplier);//this.dividedByUNIT(positionInfo[2]);
            let volume = args[0];
            let cost = args[1];
            let lastCumuFundingRate = args[2];
            let funding = args[3];
            let margin = args[4];
            console.log("volume,cost,lastCumuFundingRate,funding,curCost，margin",
                this.format(volume),
                this.format(cost),
                this.format(lastCumuFundingRate),
                this.format(funding),
                this.format(curCost),
                this.format(margin)
            )
            let fee = curCost.abs().multipliedBy(this.feeRatio);
            let existMargin = margin;
            let realizedCost = new BigNumber(0);
            margin = margin.minus(funding).minus(fee); //margin -= funding + fee
            if ((volume.gte(zero) && tradeVolume.gte(zero)) || (volume.lte(zero) && tradeVolume.lte(zero))) {

            } else if (volume.abs().lte(tradeVolume.abs())) {
                realizedCost = curCost.multipliedBy(volume.abs()).dividedBy(tradeVolume.abs()).plus(cost);
            } else {
                realizedCost = cost.multipliedBy(tradeVolume.abs()).dividedBy(volume.abs()).plus(curCost);//cost * abs(tradeVolume) / abs(volume) + curCost
            }
            // volume += tradeVolume
            // cost = cost + curCost - realizedCost
            // tradersNetVolume += tradeVolume
            // tradersNetCost += curCost - realizedCost
            // liquidity += funding + fee + realizedCost
            volume = volume.plus(tradeVolume);//volume += tradeVolume
            cost = cost.plus(curCost).minus(realizedCost);//cost = cost + curCost - realizedCost
            console.log("实现之后需要的cost,交易需要的curCost,实现需要的Cost", this.format(cost), this.format(curCost), this.format(realizedCost));
            margin = margin.minus(realizedCost);//margin -= realizedCost
            console.log("最终的仓位", this.format(volume));
            let value = volume.multipliedBy(price).multipliedBy(this.multiplier);//volume * price * multiplier
            // 1. ((margin + amount - (funding + fee) - realizedCost) + value - cost) / abs(value) >= minInitialMarginRatio => amount >= AAA
            let requirementAllMargin = volume.abs().multipliedBy(price).multipliedBy(this.minInitialMarginRatio).multipliedBy(this.multiplier).plus(fee);
            console.log("实现之后需要的requirementAllMargin", this.format(requirementAllMargin));
            console.log("输入的amount", this.format(amount));

            //(margin + value - cost) / abs(value)>=minMaintenanceMarginRatio ====> margin>= (abs(volume)*minMaintenanceMarginRatio-volume)*price*multiplier + cost
            let finalMargin = value.abs().multipliedBy(this.minInitialMarginRatio).minus(value).plus(cost);
            console.log("finalMargin, value, cost", this.format(finalMargin), this.format(value), this.format(cost));

            let requirementMinAmount = finalMargin.plus(realizedCost).plus(funding).plus(fee);
            let minAmount = value.abs().multipliedBy(this.minInitialMarginRatio).minus(margin).plus(funding).plus(fee).plus(realizedCost).minus(value).plus(cost);
            console.log("还需要最小的保证金", this.format(existMargin.minus(requirementAllMargin).lte(new BigNumber(0)) ? existMargin.minus(requirementAllMargin).abs() : new BigNumber("0")));
            console.log("还需要最小的保证金requirementMinAmount", this.format(requirementMinAmount));
            console.log("还需要最小的保证金minAmount", this.format(minAmount.abs()));
            // console.log("还需要冲入的保证金", this.format(requirementMinAmount.minus(existMargin)));
            // 当前保证金+当前输入的保证金-最终需要的保证金>0即可
            console.log({"minAmount": this.format(existMargin.minus(requirementAllMargin).lte(new BigNumber(0)) ? existMargin.minus(requirementAllMargin).abs() : new BigNumber("0"))});
            if (existMargin.plus(amount).minus(requirementAllMargin).gte(new BigNumber(0))) {
                return true;
            } else {
                return {"minAmount": this.format(existMargin.minus(requirementAllMargin).lte(new BigNumber(0)) ? existMargin.minus(requirementAllMargin).abs() : new BigNumber("0"))};
            }
        }).catch(err => {
            console.log("计算最小amount失败", err);
            return false;
        })
    };

    checkPoolLiquidity(tradeVolume) {
        tradeVolume = new BigNumber(tradeVolume);
        return Promise.all([
            this._getPrice(),
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
            console.log("value,tradersNetVolume,tradeVolume", this.format(value), this.format(tradersNetVolume), this.format(tradeVolume));
            // value = -tradersNetVolume * price * multiplier
            // ratio = (liquidity + value + tradersNetCost) / abs(value)
            // ratio >= minPoolMarginRatio
            let ratio = (liquidity.plus(value).plus(tradersNetCost)).dividedBy(value.abs());
            console.log("ratio", this.format(ratio));
            if (ratio.lte(this.minPoolMarginRatio)) return false;
            return true
        }).catch(err => {
            console.log(err);
            return false;
        })
    };

    _getPositionArgs() {
        let that = this;
        let zero = new BigNumber(0);
        return Promise.all([this.exists()]).then(ret => {
            // console.log(ret[0],"--------------------------------------");
            if (ret[0]) {
                return Promise.all([that._getPosition(), this._getStateValues(),]).then(ret => {
                    console.log(ret);
                    let positionInfo = ret[0];
                    let stateValues = ret[1];
                    let volume = that.dividedByUNIT(positionInfo[1]);
                    let cost = that.dividedByUNIT(positionInfo[2]);
                    let lastCumuFundingRate = that.dividedByUNIT(positionInfo[3]);
                    let cumuFundingRate = that.dividedByUNIT(new BigNumber(stateValues["cumuFundingRate"]));
                    let margin = that.dividedByUNIT(positionInfo[4]);

                    // let funding = volume * (cumuFundingRate - lastCumuFundingRate) * 2;
                    let funding = volume.multipliedBy(cumuFundingRate.minus(lastCumuFundingRate)).multipliedBy(new BigNumber(2));
                    console.log("volume,cost,lastCumuFundingRate,funding,curCost，margin",
                        that.format(volume),
                        that.format(cost),
                        that.format(lastCumuFundingRate),
                        that.format(funding),
                        that.format(margin)
                    )
                    return [volume, cost, lastCumuFundingRate, funding, margin]
                }).catch(err => {
                    console.log(err);
                    return [zero, zero, zero, zero, zero]
                })
            } else {
                return [zero, zero, zero, zero, zero]
            }
        }).catch(err => {

        })

    }

    calMarginWithLeverage(volume, leverage = 1) {
        return this._getPrice().then((ret) => {
            let price = this.dividedByUNIT(ret);
            console.log("volume, price, this.multiplier, leverage", volume, this.format(price), this.format(this.multiplier), leverage)

            let margin = new BigNumber(volume).abs().multipliedBy(price).multipliedBy(this.multiplier).dividedBy(new BigNumber(leverage));

            // 100*18000*0.0001/20
            console.log(margin, this.format(margin));
        }).catch((err) => {

        })
    };

    /*添加保证金*///已测
    _depositMargin(amount) {
        let funcName = "depositMargin(uint256,uint256,uint256,uint8,bytes32,bytes32)";
        amount = this.format(new BigNumber(amount).multipliedBy(this._ONE));
        console.log("amount", amount);
        return Promise.all([this._getPrice()]).then(ret => {
            let params = [
                amount, ret[0]["timestamp"], ret[0]["price"], ret[0]["v"], ret[0]["r"], ret[0]["s"]
            ]
            console.log(params);

            return this.transact(this.poolContract, funcName, params).then((ret) => {
                console.log("充入保证金成功");
                return ret;
            }).catch((err) => {
                console.log(err);
            })
        })
    };

    depositMargin(amount) {
        //获取钱包余额,以及allowance
        return Promise.all([this._getWalletBalanceOf(), this._getAllowance()]).then((ret) => {
            let balance = new BigNumber(ret[0]);
            let allowance = new BigNumber(ret[1]);
            let _amount = new BigNumber(amount);
            if (balance.gte(_amount)) {
                if (allowance.lte(_amount)) {
                    //授权
                    return this.approveMax().then((ret) => {
                        return this._depositMargin(amount);
                    })
                } else {
                    // 添加保证金
                    return this._depositMargin(amount);
                }
            } else {
                console.log("钱包余额不足 ");
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    /*提取保证金*///已测
    _withdrawMargin(amount) {
        let funcName = "withdrawMargin(uint256,uint256,uint256,uint8,bytes32,bytes32)";
        amount = this.format(new BigNumber(amount).multipliedBy(this._ONE));
        console.log("amount", amount);
        let result = {"status": false, "message": ""}
        return Promise.all([this._getPrice()]).then(ret => {
            let params = [
                amount, ret[0]["timestamp"], ret[0]["price"], ret[0]["v"], ret[0]["r"], ret[0]["s"]
            ]
            console.log(params);
            return this.transact(this.poolContract, funcName, params).then((ret) => {
                result["status"] = true;
                result["message"] = "Successful withdrawal of margin"
                return result;
            }).catch((err) => {
                console.log(err);
                result["message"] = "Withdrawal of margin failed"
                return result;
            })
        })
    };

    /*提取保证金*///已测
    withdrawMargin(amount) {
        let result = {"status": false, "message": ""}
        return this._getMaxWithdrawMargin().then((ret) => {
            console.log(ret);
            let max_margin = ret;
            let _amount = new BigNumber(amount);
            console.log(max_margin, _amount)
            if (max_margin.gte(_amount)) {
                return this._withdrawMargin(amount);
            } else {
                result["message"] = "Insufficient margin available"
                return result;
            }
        }).catch((err) => {
            console.log(err);
            result["message"] = "Failed to calculate withdrawable margin"
            return result;
        })
    };

    _getMaxWithdrawMargin() {
        let that = this;
        let result = {"status": false, "message": ""}
        return Promise.all([this.exists()]).then(ret => {
            console.log(ret);
            if (!ret[0]) {
                result["message"] = "未打入保证金";
                return result;
            }
            return Promise.all([this._getPosition(), this._getPrice(), this._getStateValues()]).then((ret) => {
                console.log(ret);
                let price = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
                let positionInfo = ret[0];
                let stateValues = ret[2];
                let volume = that.dividedByUNIT(positionInfo[1]);
                let cost = that.dividedByUNIT(positionInfo[2]);
                let lastCumuFundingRate = that.dividedByUNIT(positionInfo[3]);
                let cumuFundingRate = that.dividedByUNIT(new BigNumber(stateValues["cumuFundingRate"]));
                let margin = that.dividedByUNIT(positionInfo[4]);

                let funding = volume.multipliedBy(cumuFundingRate.minus(lastCumuFundingRate)).multipliedBy(new BigNumber(2));
                //volume == 0
                if (this.format(volume) == this.format(new BigNumber(0))) {
                    return margin;
                } else {
                    let funding = volume.multipliedBy(cumuFundingRate.minus(lastCumuFundingRate)).multipliedBy(new BigNumber(2));
                    let value = volume.multipliedBy(price).multipliedBy(that.multiplier);
                    let maxAmount = margin.minus(funding).plus(value).minus(cost).minus(value.abs().multipliedBy(that.minInitialMarginRatio));
                    return maxAmount;
                }
            }).catch((err) => {
                console.log(err);
                return false;
            })
        }).catch(err => {
            console.log(err);
            return false;
        })
    }

    /*获取最大能提取的保证金*/
    getMaxWithdrawMargin(leverage = 10) {
        return this._getMaxWithdrawMargin(leverage).then((ret) => {
            console.log(this.format(this.dividedByUNIT(ret)));
            return this.format(this.dividedByUNIT(ret));
        }).catch()
    };

    /*添加流动性*/
    _addLiquidity(margin) {
        let funcName = "addLiquidity(uint256,uint256,uint256,uint8,bytes32,bytes32)";
        margin = this.format(new BigNumber(margin).multipliedBy(this._ONE));
        console.log("margin", margin);
        return Promise.all([this._getPrice()]).then(ret => {
            let params = [
                margin, ret[0]["timestamp"], ret[0]["price"], ret[0]["v"], ret[0]["r"], ret[0]["s"]
            ]
            console.log(params);

            return this.transact(this.poolContract, funcName, params).then((ret) => {
                console.log("添加流动性成功");
                return ret;
            }).catch((err) => {
                console.log(err);
            })
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
                    console.log("添加流动性");
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
        return Promise.all([this.exists()]).then(ret => {
            if (!ret[0]) {
                return Promise.all([this._getLiquidity()]).then(ret => {
                    console.log(ret);
                    return {
                        "maxRemoveLiquidity": this.format(this.dividedByUNIT(new BigNumber(ret[0])))
                    }
                }).catch(err => {
                    return false;
                })
            } else {
                return Promise.all([this._getStateValues(), this._getTotalSupply(), this._getPrice(), this._getLiquidity()]).then(ret => {
                    console.log(ret);
                    let liquidity = this.dividedByUNIT(new BigNumber(ret[0]["liquidity"]));
                    let tradersNetVolume = this.dividedByUNIT(new BigNumber(ret[0]["tradersNetVolume"]));
                    let tradersNetCost = this.dividedByUNIT(new BigNumber(ret[0]["tradersNetCost"]));
                    let curPrice = this.dividedByUNIT(new BigNumber(ret[2]["price"]));
                    let totalSupply = this.dividedByUNIT(new BigNumber(ret[1]));
                    let shares = totalSupply.multipliedBy(liquidity.minus(tradersNetVolume)).dividedBy(liquidity)
                    let liquidityBalance = this.dividedByUNIT(ret[3]);
                    if (this.format(tradersNetVolume) == 0) {
                        return Promise.all([this._getLiquidity()]).then(ret => {
                            console.log(ret);
                            return {
                                "maxRemoveLiquidity": this.format(this.dividedByUNIT(new BigNumber(ret[0])))
                            }
                        }).catch(err => {
                            return false;
                        })
                    } else {
                        let poolDynamicEquity = liquidity.plus(tradersNetCost).minus(tradersNetVolume.multipliedBy(curPrice).multipliedBy(this.multiplier));
                        let value = tradersNetVolume.multipliedBy(curPrice).multipliedBy(this.multiplier).multipliedBy(new BigNumber(-1));
                        let removeAmount = liquidity.plus(value).plus(tradersNetCost).minus(value.abs().multipliedBy(this.minPoolMarginRatio));
                        console.log("removeAmount,poolDynamicEquity", this.format(removeAmount), this.format(poolDynamicEquity));
                        let amount = removeAmount.multipliedBy(totalSupply).dividedBy(poolDynamicEquity);
                        console.log("removeAmount,poolDynamicEquity,totalSupply,amount, value", this.format(removeAmount), this.format(poolDynamicEquity), this.format(totalSupply), this.format(amount), this.format(value));
                        //removeAmount = amount * poolDynamicEquity / totalSupply
                        let minAmount = liquidityBalance.lte(amount) ? liquidityBalance : amount;
                        return {
                            "maxRemoveLiquidity": this.format(minAmount)
                        }
                    }
                }).catch(err => {
                    return false;
                })
            }
        }).catch(err => {

        })
    };


    /*移除流动性*/
    _removeLiquidity(volume) {
        let funcName = "removeLiquidity(uint256,uint256,uint256,uint8,bytes32,bytes32)";
        volume = this.format(new BigNumber(volume).multipliedBy(this._ONE));
        console.log("volume", volume);
        return Promise.all([this._getPrice()]).then(ret => {
            console.log(ret);
            let params = [
                volume, ret[0]["timestamp"], ret[0]["price"], ret[0]["v"], ret[0]["r"], ret[0]["s"]
            ]
            console.log(this._web3.utils.asciiToHex(ret[0]["r"]))
            console.log(params);
            for (let cKey in params) {
                console.log(typeof params[cKey], params[cKey])
            }
            return this.transact(this.poolContract, funcName, params).then(ret => {
                return true;
            }).catch(err => {
                return false;
            })
        })
    };

    /*获取当前trader的流动性*/
    _getLiquidity() {
        return this.call(this.liquidityTokenContract, "balanceOf", [this.account]).then((ret) => {
            console.log(ret);
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };


    _getPoolWithdrawLiquidity() {
        return Promise.all([this._getStateValues(), this._getPrice(), this._getTotalSupply(), this.exists()]).then(ret => {
            let args = ret[0];
            let price = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
            let liquidity = this.dividedByUNIT(args["liquidity"]);
            let tradersNetCost = this.dividedByUNIT(args["tradersNetCost"]);
            let tradersNetVolume = this.dividedByUNIT(args["tradersNetVolume"]);
            let totalSupply = this.dividedByUNIT(ret[2]);
            // *   tradersNetVolume == 0
            // *   poolDynamicEquity = liquidity + tradersNetCost - (tradersNetVolume * price * multiplier)
            // totalSupply = lToken.totalSupply()
            // removeAmount = amount * poolDynamicEquity / totalSupply
            //
            // value = -tradersNetVolume * price * multiplier
            // ratio = (liquidity -minPoolMarginRatio* abs(value)  + (value + tradersNetCost)) >=  removeAmount
            let poolDynamicEquity = liquidity.plus(tradersNetCost).minus(tradersNetVolume.multipliedBy(price).multipliedBy(this.multiplier));
            console.log("liquidity, tradersNetCost, tradersNetVolume, price, this.multiplier", liquidity, tradersNetCost, tradersNetVolume, price, this.multiplier);
            let value = tradersNetVolume.multipliedBy(new BigNumber(-1)).multipliedBy(price).multipliedBy(this.multiplier);
            console.log("liquidity,value,tradersNetCost,this.minPoolMarginRatio,totalSupply,poolDynamicEquity",
                liquidity, value, tradersNetCost, this.minPoolMarginRatio, totalSupply, poolDynamicEquity)
            let amount = liquidity.plus(value).plus(tradersNetCost).minus(value.abs().multipliedBy(this.minPoolMarginRatio)).multipliedBy(totalSupply.dividedBy(poolDynamicEquity));
            console.log(amount, this.format(amount));

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
        let result = {"status": false, "message": ""}
        return Promise.all([this._getLiquidity(), this._getPoolWithdrawLiquidity()]).then(ret => {
            let liquidity = new BigNumber(ret[0]);
            let poolWithdrawLiquidity = new BigNumber(ret[1]);
            console.log(liquidity, poolWithdrawLiquidity);
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
            console.log(ret);
            return ret;
        }).catch((err) => {

        })
    };


    /*获取总流动性*///已测
    getNetLiquidity() {
        return this._getStateValues().then((ret) => {
            console.log(this.format(this.dividedByUNIT(ret.liquidity)));
            return this.format(this.dividedByUNIT(ret.liquidity));
        }).catch((err) => {
        })
    };

    //positionTokenContract
    /*从链上获取建仓仓位信息*///已测
    _getPosition() {
        return this.call(this.positionTokenContract, "getPosition(address)", [this.account]).then((ret) => {
            console.log(ret);
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    };

    /*获取建仓仓位信息，用于网页展示*///已测
    getPositionInfo(leverage = 10) {
        return Promise.all([this._getPosition(), this._getPrice()]).then((ret) => {
            console.log(ret)
            let positionInfo = ret[0];
            let price = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
            //(owner, volume, cost, lastCumuFundingRate, margin, lastUpdateTimestamp)
            let position = this.dividedByUNIT(positionInfo[1]);
            let cost = this.dividedByUNIT(positionInfo[2]).abs();
            let lastCumuFundingRate = this.dividedByUNIT(positionInfo[3]);
            let allMargin = this.dividedByUNIT(positionInfo[4]);
            let lastUpdateTimestamp = positionInfo[5];
            let averageEntryPrice = cost.dividedBy(position.abs()).dividedBy(this.multiplier);
            let marginHeld = position.abs().multipliedBy(price).multipliedBy(this.multiplier).dividedBy(new BigNumber(leverage));
            console.log("price, position, cost, lastCumuFundingRate, allMargin, averageEntryPrice, marginHeld",
                this.format(price),
                this.format(position),
                this.format(cost),
                this.format(lastCumuFundingRate),
                this.format(allMargin),
                this.format(averageEntryPrice),
                this.format(marginHeld)
            )
            console.log(price, position, cost, lastCumuFundingRate, allMargin, averageEntryPrice, marginHeld)
            return {
                "price": this.format(price),
                "position": this.format(position),
                "cost": this.format(cost),
                "lastCumuFundingRate": this.format(lastCumuFundingRate),
                "allMargin": this.format(allMargin),
                "averageEntryPrice": this.format(averageEntryPrice),
                "marginHeld": this.format(marginHeld),
                "lastUpdateTimestamp": lastUpdateTimestamp
            }
        }).catch((err) => {

        })
    }

    /*获取是否建过仓*///已测
    exists() {
        return this.call(this.positionTokenContract, "exists", [this.account]).then((ret) => {
            return ret;
        }).catch((err) => {
            console.log(err);
        })
    }

    /*oracleContract*/

    /*获取价格*///已测
    _getPrice() {
        return $.ajax({
                url: "https://oracle.deri.finance/price/",
                async: true,
                type: 'get',
                success: function (ret) {
                    // console.log(ret);
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
            console.log(this.format(this.dividedByUNIT(new BigNumber(ret[0].price))));
            return {"price": this.format(this.dividedByUNIT(new BigNumber(ret[0].price)))};
        }).catch((err) => {
            console.log(err);
        })
    }

    calMargin(volume, leverage = 1) {
        return Promise.all([this._getPrice()]).then(ret => {
            console.log(ret)
            let price = this.dividedByUNIT(new BigNumber(ret[0]["price"]));
            console.log(price, leverage, +volume)
            leverage = new BigNumber(leverage);
            volume = new BigNumber(volume).abs();
            console.log(leverage, volume, this.multiplier)
            console.log(volume.multipliedBy(price).multipliedBy(this.multiplier).dividedBy(leverage));
            let fee = volume.multipliedBy(price).multipliedBy(this.multiplier).multipliedBy(this.feeRatio);
            console.log(fee, this.format(fee));
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
            console.log(volume, this.multiplier)
            let fee = volume.multipliedBy(price).multipliedBy(this.multiplier).multipliedBy(this.feeRatio);
            console.log(fee, this.format(fee));
            return {
                "fee": this.format(fee)
            }
        }).catch(err => {

        })
    }

    perLiquidityShare() {
        return Promise.all([this._getStateValues(), this._getPrice(), this._getTotalSupply(), this.exists()]).then(ret => {
            let args = ret[0];
            let price = this.dividedByUNIT(new BigNumber(ret[1]["price"]));
            let liquidity = this.dividedByUNIT(args["liquidity"]);
            let tradersNetCost = this.dividedByUNIT(args["tradersNetCost"]);
            let tradersNetVolume = this.dividedByUNIT(args["tradersNetVolume"]);
            let totalSupply = this.dividedByUNIT(ret[2]);
            let poolDynamicEquity = liquidity.plus(tradersNetCost).minus(tradersNetVolume.multipliedBy(price).multipliedBy(this.multiplier));
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

    calLiquidationPrice() {
        let zero = new BigNumber(0);
        let result = {"status": true, "message": ""}
        //    判断exist
        return Promise.all([this.exists(), this._getPrice()]).then(ret => {
            if (ret[0]) {
                console.log(ret[0]);
                let price = this.dividedByUNIT(ret[1]["price"]);
                // 获取position
                return Promise.all([this._getPosition(), this._getStateValues()]).then(ret => {
                    //price
                    // volume, cost, lastCumuFundingRate, margin
                    let positionInfo = ret[0];
                    let states = ret[1];
                    console.log(positionInfo);
                    let volume = this.dividedByUNIT(positionInfo[1]);
                    if (this.format(volume) == this.format(new BigNumber(zero))) {
                        console.log("仓位为0");
                        result["status"] = true;
                        result["LiquidationPrice"] = "--";
                        return result;
                    }
                    console.log(volume);
                    let cost = this.dividedByUNIT(positionInfo[2]);
                    let lastCumuFundingRate = this.dividedByUNIT(positionInfo[3]);
                    let margin = this.dividedByUNIT(positionInfo[4]);
                    let cumuFundingRate = this.dividedByUNIT(new BigNumber(states["cumuFundingRate"]));

                    console.log("volume,cost,lastCumuFundingRate,margin,cumuFundingRate",
                        this.format(volume),
                        this.format(cost),
                        this.format(lastCumuFundingRate),
                        this.format(margin),
                        this.format(cumuFundingRate)
                    );
                    let entry_price = cost.dividedBy(volume).dividedBy(this.multiplier).abs();
                    console.log("entry_price", this.format(entry_price));
                    // let pnl = volume.multipliedBy(price.minus(entry_price)).multipliedBy(this.multiplier);

                    // let de = margin.plus(pnl);

                    // console.log("de, pnl", this.format(pnl), this.format(de));
                    let funding = volume.multipliedBy(cumuFundingRate.minus(lastCumuFundingRate).multipliedBy(new BigNumber(2)));//volume * (cumuFundingRate - lastCumuFundingRate) * 2

                    margin = margin.minus(funding);
                    let liquidation_price = margin.minus(cost).dividedBy(this.minMaintenanceMarginRatio.multipliedBy(volume.abs()).minus(volume).multipliedBy(this.multiplier));
                    console.log("liquidation_price", liquidation_price)
                    result["status"] = true;
                    liquidation_price = liquidation_price.lt(new BigNumber(0)) ? '--' : this.format(liquidation_price);
                    result["LiquidationPrice"] = liquidation_price;
                    return result;
                }).catch(err => {
                    console.log("cal liquidation price failed", err);
                    return result;
                })
            } else {
                result["status"] = true;
                result["LiquidationPrice"] = "--";
                return result;
            }
        }).catch(err => {
            console.log("cal liquidation price failed", err);
            return result;
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
            console.log(events);
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
                console.log("data", event); // same results as the optional callback above
                return event;
            }).on('changed', function (event) {
                // remove event from local database
                return event;
            }).on('error', console.error);
        }
    }

    // Liquidate
    liquidateEvent() {
        // 获取事件
        // (address owner, int256 volume, int256 cost, uint256 margin, uint256 timestamp, uint256 price, address liquidator, uint256 reward)
        let filter = {owner: this.account};
        let that = this;
        return Promise.all([this.poolContract.events["Liquidate"]({
            filter: filter, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }).on('data', function (event) {
            // console.log("data", event); // same results as the optional callback above
            let returnValues = event.returnValues;
            let _event = {
                "owner": that.account,
                "volume": that.format(that.dividedByUNIT(new BigNumber(event["returnValues"]["volume"]))),
                "cost": that.format(that.dividedByUNIT(new BigNumber(event["returnValues"]["cost"]).abs())),
                "margin": that.format(that.dividedByUNIT(new BigNumber(event["returnValues"]["margin"]))),
                "price": that.format(that.dividedByUNIT(new BigNumber(event["returnValues"]["price"]))),
                "timestamp": event["returnValues"]["timestamp"],
                "liquidator": event["returnValues"]["liquidator"],
            };
            that.liquidate_event_list.push(_event);
        }).on('error', console.error)]).then(ret => {
            console.log(ret);
        })
    }

    tradeEvent() {
        // 获取事件
        // (address indexed owner, int256 tradeVolume, uint256 price)
        let filter = {owner: this.account};
        let that = this;
        return Promise.all([this.poolContract.events["Trade"]({
            filter: filter, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }).on('data', function (event) {
            // console.log("data", event); // same results as the optional callback above
            let returnValues = event.returnValues;
            let _event = {
                "transactionHash": event.transactionHash,
                "price": that.format(that.dividedByUNIT(new BigNumber(returnValues.price))),
                "tradeVolume": that.format(that.dividedByUNIT(new BigNumber(returnValues.tradeVolume))),

            };
            that.event_list.push(_event);
        }).on('error', console.error)]).then(ret => {
            console.log(ret);
        })

    }

    closePosition() {
        let funcName = "tradeWithMargin(int256,uint256,uint256,uint256,uint8,bytes32,bytes32)";
        // 0: 未建仓
        // 1: 仓位为0
        // 2：平仓成功
        return Promise.all([this.exists()]).then(ret => {
            if (!ret[0]) {
                console.log("未建仓")
                return 0;
            } else {
                return Promise.all([this._getPosition()]).then(ret => {
                    let position = new BigNumber(ret[0][1]);
                    if (this.format(position) == this.format(new BigNumber(0))) {
                        console.log("仓位已经为0");
                        return 1;
                    } else {
                        return Promise.all([this._getPrice()]).then(ret => {
                            let _params = ret[0];
                            let params = [
                                this.format(position.multipliedBy(new BigNumber(-1))), 0, _params["timestamp"], _params["price"], _params["v"], _params["r"], _params["s"]
                            ]
                            return this.transact(this.poolContract, funcName, params).then(ret => {
                                return 2;
                            })
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

let c = new Contract();
c.connectWallet()