// 何意味?

const moneyOwnedDOM = document.getElementById("moneyOwned");
const dayDOM = document.getElementById("day");

const totalNetOwnedDOM = document.getElementById("totalNetOwned");
const netInshoreDOM = document.getElementById("netInshore");
const netOutshoreDOM = document.getElementById("netOutshore");
const netExtraDOM = document.getElementById("netExtra");

const netBuyNumberDOM = document.getElementById("netBuyNumber");
const moneyCostDOM = document.getElementById("moneyCost");

const weatherDOM = document.getElementById("weather");

const nextButtonDOM = document.getElementById("nextButton");

const buyManuDOM = document.getElementById("buyManu");
const buyButtonDOM = document.getElementById("buyButton");

const inshoreIncomeDOM = document.getElementById("inshoreIncome");
const outshoreIncomeDOM = document.getElementById("outshoreIncome");

const netPriceDOM = document.getElementById("netPrice");

const rentMoneyDOM = document.getElementById("rentMoney");

const resultBoxDOM = document.getElementById("resultBox");

const informationDOM = document.getElementById("information");
const informationBoxDOM = document.getElementById("informationBox");

const gameOverDOM = document.getElementById("gameOver");

const netDamagedTextDOM = document.getElementById("netDamagedText");

const moneyProfitDOM = document.getElementById("moneyProfit");

let moneyOwned = 50;
let day = 1;

let net = {
    inshore: 0,
    outshore: 0,
    extra: 6
}

let weatherIsGood = null;
let badWeatherPosibility = 0.5;

let netIncomePosibility = {
    inshore: {
        minimum: 2,
        maximum: 6
    },
    outshore: {
        minimum: 6,
        maximum: 12
    }
}

let netPrice = null;
let netPricePosibility = {
    minimum: 5,
    maximum: 30
}

let netBuyNumber = 0;

let incomePrice = {
    inshore: 0,
    outshore: 0
}

let rentMoney = 80;

let manuOpen = false;

let inRound = false;

let isInWeekEnd = false;

let gameOver = false;
let negativeMoney = 0;

function setWeatherCondition() {
    let randomNumber = Math.random();

    if (randomNumber <= badWeatherPosibility) {
        weatherIsGood = true;
    } else {
        weatherIsGood = false;
    }
}

function setIncomePirce() {
    incomePrice.inshore = Math.floor((Math.random() * (netIncomePosibility.inshore.maximum - netIncomePosibility.inshore.minimum)) + netIncomePosibility.inshore.minimum);
    incomePrice.outshore = Math.floor((Math.random() * (netIncomePosibility.outshore.maximum - netIncomePosibility.outshore.minimum)) + netIncomePosibility.outshore.minimum);
}

function setNetPrice() {
    netPrice = Math.floor((Math.random() * (netPricePosibility.maximum - netPricePosibility.minimum) + netPricePosibility.minimum));
}

function setStatusDOM() {
    moneyOwnedDOM.innerHTML = moneyOwned + '$';
    dayDOM.innerHTML = '第' + day + '天';
}

function setNetStatusDOM() {
    totalNetOwnedDOM.innerHTML = net.inshore + net.outshore + net.extra;
    netInshoreDOM.innerHTML = net.inshore;
    netOutshoreDOM.innerHTML = net.outshore;
    netExtraDOM.innerHTML = net.extra;
}

function setWeather() {
    if (weatherIsGood) {
        weatherDOM.innerHTML = "好天气";
        weatherDOM.className = "greenText";
    } else {
        weatherDOM.innerHTML = "坏天气";
        weatherDOM.className = "redText";
    }
}

function buyButtonPressed() {
    buyButtonDOM.style = "animation: 1s ease-out shiftFromRightToLeft; transform: translate(-100%, -50%);";
    buyManuDOM.style = "animation: 1s ease-out shiftFromLeftToRight; transform: translate(0, -50%);";

    manuOpen = true;
}

function setIncomePriceDOM() {
    inshoreIncomeDOM.innerHTML = incomePrice.inshore + '$';
    outshoreIncomeDOM.innerHTML = incomePrice.outshore + '$';

    netPriceDOM.innerHTML = netPrice + '$';

    rentMoneyDOM.innerHTML = rentMoney + '$';
}

function nextButtonPressed() {
    if (inRound) {
        inRound = false;

        weatherDOM.innerHTML = "null";
        weatherDOM.className = "";

        nextButtonDOM.innerHTML = "开始";
        resultBoxDOM.hidden = true;

        netDamagedTextDOM.hidden = true;
    } else {
        inRound = true;

        let moneyProfit = 0;

        nextButtonDOM.innerHTML = "下一天";
        resultBoxDOM.hidden = false;

        setWeatherCondition();
        setWeather();

        setIncomePirce();
        setNetPrice();

        day++;

        if (day % 5 == 0) {
            moneyProfit -= rentMoney;

            rentMoney += 5;
        }

        if (net.inshore + net.outshore > 200) {
            Math.random() > 0.2 ? information("pollution") : null;
        } else if (moneyOwned > 100000) {
            Math.random() > 0.6 ? information("tooMuchMoney") : null;
        } else {
            Math.random() > 0.8 ? information() : null;
        }

        if (moneyOwned < 0) {
            negativeMoney++;
        } else {
            negativeMoney = 0;
        }

        if (negativeMoney > 5) {
            information("outOfMoney");
        }

        if (weatherIsGood) {
            moneyProfit += net.inshore * incomePrice.inshore;
            moneyProfit += net.outshore * incomePrice.outshore;
        } else {
            moneyProfit += net.inshore * incomePrice.inshore * 2;

            if (net.outshore > 0) {
                netDamagedTextDOM.hidden = false;
            }

            net.outshore = 0;
        }

        moneyOwned += moneyProfit;

        moneyProfitDOM.innerHTML = moneyProfit + '$';

        if (moneyProfit < 0) {
            moneyProfitDOM.className = "redText";
        } else {
            moneyProfitDOM.className = "greenText";
        }

        setStatusDOM();
        setNetStatusDOM();
        setIncomePriceDOM();
    }
}

let netBuyNumberChange = {
    increase() {
        if ((netBuyNumber + 1) * netPrice <= moneyOwned) {
            netBuyNumber++;
            netBuyNumberDOM.innerHTML = netBuyNumber;

            setNetBuyCost();
        }
    },
    decrease() {
        if (netBuyNumber > 0) {
            netBuyNumber--;
            netBuyNumberDOM.innerHTML = netBuyNumber;

            setNetBuyCost();
        }
    }
}

function setNetBuyCost() {
    moneyCostDOM.innerHTML = netBuyNumber * netPrice + '$';
}

function netBuy() {
    netBuyNumberDOM.innerHTML = 0;

    moneyOwned -= netBuyNumber * netPrice;

    net.extra += netBuyNumber;

    netBuyNumber = 0;

    setNetBuyCost();
    setStatusDOM();
    setNetStatusDOM();
}

function netBuyAll() {
    netBuyNumber = 0;

    while (true) {
        if ((netBuyNumber + 1) * netPrice < moneyOwned) {
            netBuyNumber++;
        } else {
            break;
        }
    }

    moneyOwned -= netBuyNumber * netPrice;

    net.extra += netBuyNumber;

    netBuyNumber = 0;

    setStatusDOM();
    setNetStatusDOM();
}

function information(option) {
    if (option == "outOfMoney") {
        informationDOM.innerHTML = "由于你太久没还钱, 你被告了, 你破产了";
        gameOverDOM.hidden = true;

        clearAllProperty();

        informationBoxDOM.hidden = false;
        gameOver = true;
    } else if (option == "tooMuchMoney") {
        if (Math.random() < 0.5) {
            informationDOM.innerHTML = "由于你的钱太多, 你被资本做局了, 他们拿走了你60%的资产";

            net.extra = net.inshore + net.outshore;
            net.inshore = net.outshore = 0;

            net.extra = Math.floor(net.extra / 0.6);
            moneyOwned = Math.floor(net.extra / 0.6);

            informationBoxDOM.hidden = false;
        } else {
            informationDOM.innerHTML = "由于你的钱太多, 你被资本做局了, 你所有资产都被拿走了, 你破产了";
            gameOverDOM.hidden = false;

            clearAllProperty();

            informationBoxDOM.hidden = false;
            gameOver = true;
        }
    } else if (option == undefined) {
        let randomNumber = Math.random();

        if (randomNumber > 0.5) {
            randomNumber = Math.random();

            if (randomNumber < 0.5) {
                if (moneyOwned > 200) {
                    return;
                }

                informationDOM.innerHTML = "你这天走在路上看到了20块钱, 你问了一下没有人认, 所以你拿走了";
                gameOverDOM.hidden = true;

                moneyOwned += 20;

                informationBoxDOM.hidden = false;
            } else if (randomNumber < 0.8) {
                if (moneyOwned > 500) {
                    return;
                }

                informationDOM.innerHTML = "你这天走在路上看到了50块钱, 你问了一下没有人认, 所以你拿走了";
                gameOverDOM.hidden = true;

                moneyOwned += 50;

                informationBoxDOM.hidden = false;
            } else if (randomNumber < 0.92) {
                if (moneyOwned > 1000) {
                    return;
                }

                informationDOM.innerHTML = "你这天走在路上看到了100块钱, 你问了一下没有人认, 所以你拿走了";
                gameOverDOM.hidden = true;

                moneyOwned += 100;

                informationBoxDOM.hidden = false;
            } else {
                informationDOM.innerHTML = "你这天下海时看到一个溺水的小孩, 你把他救了上来, 家长给你20000块";
                gameOverDOM.hidden = true;

                moneyOwned += 20000;

                informationBoxDOM.hidden = false;
            }
        } else {
            randomNumber = Math.random();

            if (randomNumber < 0.5) {
                informationDOM.innerHTML = "你这天在放置笼子时被海胆扎到, 你花了80块来治疗";
                gameOverDOM.hidden = true;

                moneyOwned -= 80;

                informationBoxDOM.hidden = false;
            } else if (randomNumber < 0.7) {
                informationDOM.innerHTML = "你这天得了严重的感冒, 你花了200块来治疗";
                gameOverDOM.hidden = true;

                moneyOwned -= 200;

                informationBoxDOM.hidden = false;
            } else {
                if (moneyOwned < 1200) {
                    return
                }

                informationDOM.innerHTML = "你这天不小心撞上了别人的船, 你交了1500块来修";
                gameOverDOM.hidden = true;

                moneyOwned -= 1500;

                informationBoxDOM.hidden = false;
            }
        }
    } else if (option == "pollution") {
        informationDOM.innerHTML = "因为你的网太多, 警察把你抓起来并且没收了你全部的网, 还扣了你5000块钱";

        net.extra = net.inshore = net.outshore = 0;
        moneyOwned -= 5000;

        informationBoxDOM.hidden = false;
    }
}

function clearAllProperty() {
    net.extra = net.inshore = net.outshore = 0;
    moneyOwned = 0;
}

let netNumberChange = {
    inshore: {
        increase() {
            if (net.extra > 0) {
                net.inshore++;
                net.extra--;

                setNetStatusDOM();
            }
        },
        decrease() {
            if (net.inshore > 0) {
                net.inshore--;
                net.extra++;

                setNetStatusDOM();
            }
        },
        all() {
            net.inshore = net.inshore + net.outshore + net.extra;
            net.outshore = net.extra = 0;

            setNetStatusDOM();
        }
    },
    outshore: {
        increase() {
            if (net.extra > 0) {
                net.outshore++;
                net.extra--;

                setNetStatusDOM();
            }
        },
        decrease() {
            if (net.outshore > 0) {
                net.outshore--;
                net.extra++;

                setNetStatusDOM();
            }
        },
        all() {
            net.outshore = net.inshore + net.outshore + net.extra;
            net.inshore = net.extra = 0;

            setNetStatusDOM();
        }
    }
}

window.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
        if (manuOpen) {
            buyButtonDOM.style = "animation: 1s ease-out shiftFromLeftToRight; transfrom: translate(0, -50%);";
            buyManuDOM.style = "animation: 1s ease-out shiftFromRightToLeft; transform: translate(-100%, -50%);";

            manuOpen = false;
        }
    }
});

setIncomePirce();
setNetPrice();

setStatusDOM();
setNetStatusDOM();
setIncomePriceDOM();

netBuyNumberDOM.innerHTML = netBuyNumber;