let minOrderPrice = 20;
let cart = [];

// *** HTML templates ***

function menuNavTemplate(navbar, i) {
    navbar.innerHTML += /*html*/ `
            <a href="#${categories[i]}">${categories[i]}</a>
            `;
}

function menuSearchTemplate(navbar){
    navbar.innerHTML = /*html*/`
        <a href="" onclick="preventAction(event)"><img onclick="showSearchbar()" src="img/search.png" alt="search"></a>
    `;
}

function menuSectionTemplate(section, i) {
    //Headline für jew Kategorie generieren, (Kategorienname)
    section.innerHTML += /*html*/ `
              <div class="category-headline">
                <h3 class="category-name" id="${categories[i]}">${categories[i]}</h3>
                <a href="#menu-navbar"><img class="icon up-link" src="img/arrow-up-single.png" alt="arrow up icon"></a>
              </div>
              <!-- menu items -->
        `;
}

function menuItemsTemplate(section, i) {
    section.innerHTML += /*html*/ `
    <div class="menu-items">
        <h3>${dishes[i].name}</h3>
        <p>${dishes[i].description}</p>
        <span>${displayPrice(dishes[i].price)}</span>
        <!-- <button onclick="addToCart(${dishes[x]})" class="add-item">[+]</button> -->
        <button onclick="addToCart(  {'name': '${dishes[i].name}', 'price': ${dishes[i].price}, 'amount': +1 } )" class="add-item icon-btn" id="show-amount">
            <img src="img/plus-icon.png" alt="">
        </button>
    </div>
    `;
}

function cartItemsTemplate(element, i) {
    element.innerHTML += /*html*/ `
        <!-- <div class="basket-content"> -->
            <div class="basket-items">
                <div class="items-row">
                    <strong class="">${cart[i].amount}</strong>
                    <strong class="cartitem-name">${cart[i].name}</strong>
                    <span>${ displayPrice(cart[i].price * cart[i].amount)}</span>
                </div>
                <div class="items-row">
                    <a href="" onclick="preventAction(event)">Anmerkung hinzufügen</a>
                    <div>
                        <button onclick="removeFromCart(${i})" class="icon-btn">
                            <img src="img/minus-icon.png" alt="minus icon">
                        </button>
                        <button onclick ="addToCart( {'name': '${cart[i].name}', 'price': ${cart[i].price}, 'amount': +1 } )" class="icon-btn">
                            <img src="img/plus-icon.png" alt="plus icon">
                        </button>
                    </div>
                </div>
            </div>
        <!-- </div>  -->
    `;
}

function cartSumTemplate(element, price, delivery, total) {
    // cart section: price (in fkt Template(price,delivery.total))
    element.innerHTML += /*html*/ `
        <div class="sum-row">
            <span>Zwischensumme</span>
            <span>${displayPrice( price )}</span>
        </div>
        <div class="sum-row">
            <span>Lieferkosten</span>
            <span>${displayPrice( delivery )}</span>
        </div>
        <div class="sum-row">
            <strong>Gesamt</strong>
            <strong>${ displayPrice(total)}</strong>
        </div>
    `;
}

function displayDeliveryTemplate(element, diff){
    if (diff > 0 ) {
        element.innerHTML = /*html*/`
            <div>
                <strong>Wir liefern umsonst:</strong>
                <br>
                Gratis Lieferung ab einem Bestellwert von ${displayPrice(minOrderPrice)}.
                <br>
                Es fehlen noch <strong>${displayPrice(diff)}</strong>!
            </div>
        `;
    }
    else {
        element.innerHTML = /*html*/ `
            <div><strong>Gratis Lieferung!</strong></div>
        `;
    }
}

function orderBtnTemplate(element, total) {
    element.innerHTML = /*html*/ `
    <button>Bezahlen: ${displayPrice(total)}</button>`;
}

function emptyCartTemplate( element) {
    element.innerHTML = /*html*/ `
        <img src="img/pizza.png" alt="pizza image">
        <h4>Gerichte auswählen</h4>
        <p>Wähle Gerichte aus und füge sie deinem Warenkorb hinzu. <br> Wir liefern sie in Kürze!</p>`;
}

// *** RENDER content ***

function init() {
    renderMenuNavbar();
    renderMenuItems();
    renderCart();
};

// update cart-counter for the cart-icon in head navbar
function renderCartIcon() {
    let cartCounter = document.getElementById('cart-counter');
    cartCounter.innerHTML = countCartItems();
    if (countCartItems() > 0) {
        cartCounter.classList.remove('hidden');
    } else {
        cartCounter.classList.add('hidden');
    }
}

// render menu-navbar with all categories // TODO --> ISSUE with first headline (styling: not in beginning of hl (.category-headline, #menu-navbar )...??)
function renderMenuNavbar() {
    let navbar = document.getElementById('menu-navbar');
    navbar.innerHTML = '';

    for (i = 0; i < categories.length; i++) {
        menuNavTemplate(navbar, i);
    }
}

// render menu-items ordered by categories 
function renderMenuItems() {
    let section = document.getElementById('menu-categories');
    section.innerHTML = '';

    for (i = 0; i < categories.length; i++) {
        // A.: render category headlines
        menuSectionTemplate(section, i);
        // render first element without up-link
        document.getElementsByClassName('up-link')[0].classList.add('hidden');
        // B.: render menu - items belonging to the respective categories
        for (x = 0; x < dishes.length; x++) {
            if (dishes[x].category == i) {
                menuItemsTemplate(section, x);
                // displayItemsAmount(itemCounter, dishes[x].name); // gn? --> Test: (*)
                //console.log(`TEST: ${displayItemsAmount(dishes[x].name)}`); // (*) check(-) undefined!!!
            }
        }
    }
}

function renderCartItems() {
    let cartItems = document.getElementById('basket-content');
    cartItems.innerHTML = '';
    for (i = 0; i < cart.length; i++) {
        cartItemsTemplate(cartItems, i);
    }
}

// render cart section displaying the price overwiew, order button and delivery price (ev vb?)
function renderTotalCostBreakdown(orderBtn) {
     let cartSum = document.getElementById('sum');
     let displayDelivery = document.getElementById('display-delivery');
     cartSum.innerHTML = '';
     displayDelivery.innerHTML = '';

     let price = calculatePrice(cart);
     let delivery = calculateDelivery(price);
     let total = price + delivery;
     let difference = minOrderPrice - price;

    if (cart.length > 0) {
        cartSumTemplate(cartSum, price, delivery, total);
        orderBtnTemplate(orderBtn, total);
        displayDeliveryTemplate(displayDelivery, difference);
    }
}

function renderCart() {
    let orderBtn = document.getElementById('order-button');
    emptyCartTemplate(orderBtn);
    renderCartIcon();
    renderCartItems();
    renderTotalCostBreakdown(orderBtn);
}

// *** FUNCTIONALITY...o.so

function addToCart(dish) {
    // check if item already exists in cart
    let itemExists = false;
    for (i = 0; i < cart.length; i++) {
        // item already exists in cart
        if (dish.name == cart[i].name) {
            // increase amount of item
            cart[i].amount++;
            itemExists = true;
        }
    }
    // item does not yet exist in cart
    if (!itemExists) {
        // push to cart
        cart.push(dish);
    }
    renderCart();
}

function removeFromCart(i) {
    if (cart[i].amount > 1) {
        cart[i].amount--;
    } else {
        cart.splice(i, 1);
    }
    renderCart();
}

// calculate delivery costs
function calculateDelivery(totalPrice) {
    if (totalPrice >= minOrderPrice) {
        return 0;
    } else {
        return 3.9;
    }
}

// calculate price of all cart items, without delivery costs
function calculatePrice(items) {
    let sum = 0;
    for (i = 0; i < items.length; i++) {
        sum += items[i].price * items[i].amount;
    }
    return sum;
}

// count all items in cart
function countCartItems() {
    let counter = 0;
    for(let i=0; i< cart.length; i++){
        counter += cart[i].amount;
    }
    return counter;
}

// display price (consistency)
function displayPrice(num) {
    return `${num.toFixed(2)} €`; // toFixed(2) Zahl als String mit 2 Nachkommastellen
}

function toggleMenu() {
    let nav = document.getElementById('nav-responsive');
    nav.classList.toggle('show-responsive-nav');
}

// Toggle HTML element
function toggleElement(element){
    element.classList.toggle('hidden');
}

// For testing purposes/ stuff not yet finished
function preventAction(event){
    event.preventDefault();
}