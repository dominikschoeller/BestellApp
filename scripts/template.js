function getMealTamplate(mealIndex) {
    return `<div class="single-meal-section">
                <button class="meal-btn" onclick="getMeal(${mealIndex}); event.stopPropagation()">+</button>
                <div class="single-meal-text">
                    <h2 class="single-meal-headline">${myDishes[mealIndex].name}</h2>
                    <p class="single-meal-description">${myDishes[mealIndex].description}</p>
                    <p class="single-meal-price">${myDishes[mealIndex].price.toFixed(2)}€</p>
                </div>
            </div>`;
}

function renderBasketTemplate(basketIndex) {
    return `<p class="meal-headline-basket margin-top-24">${currentBasket[basketIndex].name}</p>
            <div class="basket-meal-nav margin-top-24">
                <button class="basket-meal-nav-minus" onclick="decreaseCount(${basketIndex}); event.stopPropagation()"><i class="fa-solid fa-minus"></i></button>
                <p class="basket-meal-nav-count">${currentBasket[basketIndex].count}x</p>
                <button class="basket-meal-nav-plus" onclick="increaseCount(${basketIndex}); event.stopPropagation()"><i class="fa-solid fa-plus"></i></button>
                <p class="basket-meal-nav-price">${currentBasket[basketIndex].sumPrice.toFixed(2)}€</p>
                <button class="basket-meal-nav-trash" onclick="removeFromBasket(${basketIndex}); event.stopPropagation()"><i class="fa-solid fa-trash-can"></i></button>
            </div>`;
}

function renderPriceTemplate() {
    return `<div>
            <p class="margin-top-8">${currentPrice.toFixed(2)}€</p>
            <p class="margin-top-8">${deliveryCost.toFixed(2)}€</p>
            <p class="total-price-text margin-top-8">${totalPrice.toFixed(2)}€</p>
            </div>`;
}

function renderOrderBtnTemplate() {
    return `<p class="order-notification margin-top-8">Herzlichen Glückwunsch. Wir haben deine Bestellung erhalten!</p>`;
}