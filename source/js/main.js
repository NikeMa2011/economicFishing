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
            moneyProfit -= 80;
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

function netBuyAll () {
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