let currentBasket = [];
let currentPrice = 0;
let totalPrice = 0;
let deliveryCost = 5;


function init(){
    getFromLocalStorage();
    renderMeals();
    calculatePrice();
    renderBasket();
}

function renderMeals(){
    let mealContentRef = document.getElementById("meals-section");
    mealContentRef.innerHTML = "";

    for (let mealIndex = 0; mealIndex < myDishes.length; mealIndex++) {
        mealContentRef.innerHTML += getMealTamplate(mealIndex); 
    }
}

function renderBasket(){
    let basketContentRef = document.getElementById("renderd-basket");
    basketContentRef.innerHTML = "";
    let overlayBasketContentRef = document.getElementById("basket-overlay-meal");
    overlayBasketContentRef.innerHTML = "";

    for (let basketIndex = 0; basketIndex < currentBasket.length; basketIndex++) {
        basketContentRef.innerHTML += renderBasketTemplate(basketIndex);
        overlayBasketContentRef.innerHTML += renderBasketTemplate(basketIndex);
    }
}

function getFromLocalStorage(){
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
        currentBasket.push({...currentMeal, count: 1 });
    }
    saveToLocalStorage(currentBasket);
    renderBasket();
    clearOrderBtnTemplate();
}

function saveToLocalStorage(currentBasket){
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

function calculatePrice(){
    currentPrice = 0;
    for (let priceIndex = 0; priceIndex< currentBasket.length; priceIndex++) {
        currentBasket[priceIndex].sumPrice = currentBasket[priceIndex].count * currentBasket[priceIndex].price;
        currentPrice += currentBasket[priceIndex].sumPrice;
    }
    calculateTotalPrice();
    renderPrice();
}

function calculateTotalPrice() {
    totalPrice = currentPrice + deliveryCost;
}

function renderPrice(){
    let priceContentRef = document.getElementById("price");
    priceContentRef.innerHTML = "";
    priceContentRef.innerHTML += renderPriceTemplate();

    let overlayPriceContentRef = document.getElementById("overlay-price");
    overlayPriceContentRef.innerHTML = "";
    overlayPriceContentRef.innerHTML += renderPriceTemplate();
}

function emptyBasket(){
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
    let overlayOrderNotificationContentRef = document.getElementById("overlay-order-notification");
    overlayOrderNotificationContentRef.innerHTML = "";
    overlayOrderNotificationContentRef.innerHTML += renderOrderBtnTemplate();

}

function clearOrderBtnTemplate() {
    let orderNotificationContentRef = document.getElementById("order-notification");
    orderNotificationContentRef.innerHTML = "";
    let overlayOrderNotificationContentRef = document.getElementById("overlay-order-notification");
    overlayOrderNotificationContentRef.innerHTML = "";
}


function toggleOverlay() {
    let overlay = document.getElementById('renderd-overlay-basket');
    overlay.classList.toggle('d_none');
    
}
