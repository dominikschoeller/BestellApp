let currentBasket = [];
let currentPrice = 0;
let totalPrice = 0;
let deliveryCost = 5;


function init() {
    getFromLocalStorage();
    renderMeals();
    calculatePrice();
    renderBasket();
    renderBasketBtnValue();
}

function renderMeals() {
    let mealContentRef = document.getElementById("meals-section");
    mealContentRef.innerHTML = "";

    for (let mealIndex = 0; mealIndex < myDishes.length; mealIndex++) {
        mealContentRef.innerHTML += getMealTamplate(mealIndex);
    }
}

function renderBasket() {
    let basketContentRef = document.getElementById("renderd-basket");
    basketContentRef.innerHTML = "";

    for (let basketIndex = 0; basketIndex < currentBasket.length; basketIndex++) {
        basketContentRef.innerHTML += renderBasketTemplate(basketIndex);
    }
}

function getFromLocalStorage() {
    let myArr = JSON.parse(localStorage.getItem("myBasket"));
    if (myArr != null) {
        currentBasket = myArr
    }
}

function getMeal(mealIndex) {
    let currentMeal = myDishes[mealIndex];

    let existing = currentBasket.find(item => item.name === currentMeal.name);
    if (existing) {
        existing.count += 1;
    } else {
        currentBasket.push({ ...currentMeal, count: 1 });
    }
    saveToLocalStorage(currentBasket);
    renderBasket();
    clearOrderBtnTemplate();
}

function saveToLocalStorage(currentBasket) {
    localStorage.setItem("myBasket", JSON.stringify(currentBasket));
    calculatePrice();
}

function increaseCount(basketIndex) {
    currentBasket[basketIndex].count += 1;
    saveToLocalStorage(currentBasket);
    renderBasket();
    calculatePrice();
}

function decreaseCount(basketIndex) {
    currentBasket[basketIndex].count -= 1;

    if (currentBasket[basketIndex].count <= 0) {
        currentBasket.splice(basketIndex, 1);
    }
    saveToLocalStorage(currentBasket);
    renderBasket();
    calculatePrice();
}

function removeFromBasket(basketIndex) {
    currentBasket.splice(basketIndex, 1);
    saveToLocalStorage(currentBasket);
    calculatePrice();
    renderBasket();
}

function calculatePrice() {
    currentPrice = 0;
    for (let priceIndex = 0; priceIndex < currentBasket.length; priceIndex++) {
        currentBasket[priceIndex].sumPrice = currentBasket[priceIndex].count * currentBasket[priceIndex].price;
        currentPrice += currentBasket[priceIndex].sumPrice;
    }
    calculateTotalPrice();
    renderPrice();
    renderBasketBtnValue();
}

function calculateTotalPrice() {
    totalPrice = currentPrice + deliveryCost;
}

function renderPrice() {
    let priceContentRef = document.getElementById("price");
    priceContentRef.innerHTML = "";
    priceContentRef.innerHTML += renderPriceTemplate();
}

function emptyBasket() {
    currentBasket.length = 0;
    saveToLocalStorage(currentBasket);
    calculatePrice();
    renderBasket();
    getOrderBtnTemplate();
}

function getOrderBtnTemplate() {
    let orderNotificationContentRef = document.getElementById("order-notification");
    orderNotificationContentRef.innerHTML = "";
    orderNotificationContentRef.innerHTML += renderOrderBtnTemplate();
}

function clearOrderBtnTemplate() {
    let orderNotificationContentRef = document.getElementById("order-notification");
    orderNotificationContentRef.innerHTML = "";
}

function toggleOverlay() {
    let overlayBtnFixRef = document.getElementById('basket-overlay-btn-fix');
    let overlayBtnRef = document.getElementById('basket-overlay-btn');
    let overlayBasektRef = document.getElementById('basket-wrapper');
    let contentRef = document.getElementById('content');

    if (overlayBasektRef.classList.contains('overlay-display-none')) {
        overlayBasektRef.classList.remove('overlay-display-none');
        contentRef.classList.add('d_none');
        overlayBtnFixRef.classList.remove('d_none');
        overlayBtnRef.classList.add('d_none')
    }
    else {
        overlayBasektRef.classList.add('overlay-display-none');
        contentRef.classList.remove('d_none');
        overlayBtnFixRef.classList.add('d_none');
        overlayBtnRef.classList.remove('d_none')
    }
}

function renderBasketBtnValue(){
    let basketBtnFixValueRef = document.getElementById('basket-overlay-btn-fix-value');
    basketBtnFixValueRef.innerHTML = totalPrice.toFixed(2);
    let basketBtnValueRef = document.getElementById('basket-overlay-btn-value');
    basketBtnValueRef.innerHTML = totalPrice.toFixed(2);
}
