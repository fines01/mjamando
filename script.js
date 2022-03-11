let minOrderPrice = 20;
let cart = [];
let categories = ['Suppen', 'Salate', 'Hauptspeisen', 'Desserts'];
let dishes = [ // Tryout: Array with JSON Objects
    {
        'name': 'Würzige Kichererbsenpfanne', // Zugriff über Schlüssel: element['name']
        'description': 'Scharfe Kichererbsenpfanne mit Zucchini und Melanzani. (Vegetarisch)',
        'price': 8.90,
        //'extras': {
        // 'name': '',
        // 'extraPrice': ,
        // },
        'category': 2
    },
    {
        'name': 'Chili - Tomatensuppe',
        'description': 'Tomatensuppe mit Pfiff.',
        'price': 4.60,
        // 'extras': {
        //     'name': '',
        //     'extraPrice': ,
        // },
        'category': 0
    },
    {
        'name': 'Scharfe Zitronenspaghetti mit Garnelen',
        'description': 'Teigwaren mit pfeffriger Zitronen - Frischkäsesauce, Cayennepfeffer und Garnelen.',
        'price': 8.50,
        // 'extras': {},
        'category': 2
    },
    {
        'name': 'Tex-Mex Chili mit Bohnen',
        'description': 'Traditionelles Tex-Mex Chili mit Rindfleisch und Bohnen.',
        'price': 14.9,
        //  'extras': {},
        'category': 2
    },
    {
        'name': 'Höllische Limonensuppe',
        'description': 'Erfrischende, würzige Suppe mit Limonen, Zitronengras, Kokosmilch, Gurken und Chili.',
        'price': 4.90,
        //  'extras': {},
        'category': 0
    },
    {
        'name': 'Schokoladenmousse mit Chili',
        'description': 'Dunkle Schokolade mit Chili, die perfekte Kombination.',
        'price': 7.8,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Vanilleeis mit Kürbiskernöl',
        'description': 'Ein bodenständiger, steirischer Klassiker.',
        'price': 4.30,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Oma Aloisias Apfelstrudel',
        'description': 'Traditioneller handgezogener Apfelstrudel. Ein Klassiker, aber mit einem würzigen Twist.',
        'price': 5.9,
        //'extras': {},
        'category': 3
    },
    {
        'name': 'Teuflisch scharfer Mangosalat',
        'description': 'Thai- inspirierter Salat mit Erdnüssen, Garnelen und Mangos.',
        'price': 6.90,
        //'extras': {},
        'category': 1
    },
];

// HTML templates

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
                <a href="#menu-navbar"><img class="icon" src="img/arrow-up-single.png" alt="arrow up icon"></a>
              </div>
              <!-- menu items -->
        `;
}

// Menu items generieren
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
    // cart section: items (in fkt tmeplate(amount,name,price) mit vals aus fkt updateCart(cart))
    element.innerHTML += /*html*/ `
        <!-- <div class="basket-content"> -->
            <div class="basket-items">
                <div class="items-row">
                    <strong class="">${cart[i].amount}</strong>
                    <strong class="cartitem-name">${cart[i].name}</strong>
                    <span>${ displayPrice(cart[i].price)}</span>
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


// render content
function render() {

    let navbar = document.getElementById('menu-navbar');
    let section = document.getElementById('menu-categories');
    let cartItems = document.getElementById('basket-content');
    let cartSum = document.getElementById('sum');
    let displayDelivery = document.getElementById('display-delivery');
    let orderBtn = document.getElementById('order-button');
    let cartCounter = document.getElementById('cart-counter');
    let itemCounter = document.getElementById('show-amount');

    navbar.innerHTML = '';
    section.innerHTML = '';
    cartItems.innerHTML = '';
    cartSum.innerHTML = '';
    displayDelivery.innerHTML = '';
    orderBtn.innerHTML = /*html*/ `
        <img src="img/pizza.png" alt="">
        <h4>Gerichte auswählen</h4>
        <p>Wähle Gerichte aus und füge sie deinem Warenkorb hinzu. <br> Wir liefern sie in Kürze!</p>`;

// update cart-counter (TODO: in Function!!?)
    cartCounter.innerHTML = countCartItems();
    if (countCartItems() > 0) {
        cartCounter.classList.remove('hidden');
    }
    else {
        cartCounter.classList.add('hidden');
    }

    // render search-bar in menu-navbar (not finished yet)
    menuSearchTemplate(navbar);

    // render menu - navbar with all categories
    for (i = 0; i < categories.length; i++) {
        menuNavTemplate(navbar, i);
    }

    // render menu - items ordered by categories
    for (i = 0; i < categories.length; i++) {
        // A.: render category headlines
        menuSectionTemplate(section, i);
        // first element without up-link (1.: in Fkt, 2.: NOT working)
        if (i == 0){
            document.getElementById(categories[i]).innerHTML = `<h3 class="category-name" id="${categories[i]}">${categories[i]}</h3>`
        }
        // B.: render manu - items belonging to the respective categories
        for (x = 0; x < dishes.length; x++) {
            if (dishes[x].category == i) {
                menuItemsTemplate(section, x);
                // displayItemsAmount(itemCounter, dishes[x].name); // gn? --> Test: (*)
                //console.log(`TEST: ${displayItemsAmount(dishes[x].name)}`); // (*) check(-) undefined!!!
            }
        }
    }

    // render cart - items
    for (i = 0; i < cart.length; i++) {
        cartItemsTemplate(cartItems, i);
    }

    // calculate price (TODO: in function!!!)
    let price = calculatePrice(cart);
    let delivery = calculateDelivery(price);
    let total = price + delivery;
    let difference = minOrderPrice - price;

    if (cart.length > 0){
        // render cart section displaying the price overwiew, order button and delivery price
        cartSumTemplate(cartSum, price, delivery, total);
        orderBtnTemplate(orderBtn, total);
        displayDeliveryTemplate(displayDelivery, difference);
    }
};

// 
function addToCart(dish) {
    // check if item already exists in cart
    let itemExists = false;
    for (i = 0; i < cart.length; i++) {
        // item already exists
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
    render();
}

// yeah.. well that's what it does
function removeFromCart(i) {
    if (cart[i].amount > 1) {
        cart[i].amount--;
    } else {
        cart.splice(i, 1);
    }
    render();
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

// function displayItemsAmount(element, name){
//     for(let i=0; i<cart.length; i++){
//         if (cart[i].name == name){
//             //console.log(`added:  ${name} amount: ${cart[i].amount}`); //check(+)
//             element.innerHTML = '';
//             element.innerHTML += `<span>${cart[i].amount}</span>`;

//             return cart[i].amount;
//         }
//     }
// }

// display price
function displayPrice(num) {
    return `${num.toFixed(2)} €`; // toFixed(2) Zahl als String mit 2 Nachkommastellen
}

// Toggle HTML element
function toggleElement(element){
    element.classList.toggle('hidden');
}

// For testing purposes/ stuff not finished yet
function preventAction(event){
    event.preventDefault();
}