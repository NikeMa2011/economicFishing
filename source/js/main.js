const moneyOwnedDOM = document.getElementById("moneyOwned");
const dayDOM = document.getElementById("day");

const totalNetOwnedDOM = document.getElementById("totalNetOwned");
const netInshoreDOM = document.getElementById("netInshore");
const netOutshoreDOM = document.getElementById("netOutshore");
const netExtraDOM = document.getElementById("netExtra");

const weatherDOM = document.getElementById("weather");

const nextButtonDOM = document.getElementById("nextButton");

const buyManuDOM = document.getElementById("buyManu");
const buyButtonDOM = document.getElementById("buyButton");

const inshoreIncomeDOM = document.getElementById("inshoreIncome");
const outshoreIncomeDOM = document.getElementById("outshoreIncome");

const netPriceDOM = document.getElementById("netPrice");

const rentMoneyDOM = document.getElementById("rentMoney");

let moneyOwned = 50;
let day = 1;

let net = {
    inshore: 0,
    outshore: 0,
    extra: 6
}

let weatherIsGood = null;
let badWeatherPosibility = 0.4;

let netIncomePosibility = {
    inshore: {
        minimum: 2,
        maximum: 8
    },
    outshore: {
        minimum: 8,
        maximum: 16
    }
}

let netPrice = null;
let netPricePosibility = {
    minimum: 2,
    maximum: 30
}

let incomePrice = {
    inshore: 0,
    outshore: 0
}

let rentMoney = 80;

let manuOpen = false;

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
    } else if (weatherIsGood = null) {
        weatherDOM.innerHTML = "未知";
        weatherDOM.className = undefined;
    } else {
        weatherDOM.innerHTML = "坏天气";
        weatherDOM.className = "redText";
    }
}

function checkBuyManu() {
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

function setNextButtonDOM(type) {
    if (type == "nextDay") {
        nextButtonDOM.innerHTML = "下一天";
    } else if (type == "start") {
        nextButtonDOM.innerHTML = "开始";
    } else {
        throw new Error("o.0");
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
setNextButtonDOM("start");