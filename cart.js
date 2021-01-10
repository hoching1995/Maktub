//update the cartNumber

loadCart();

function loadCart() {
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    var cartCount = document.getElementById("cart-count")
    if (!cartCurrentNumber) {
        //if cart is 0 then print 0 instead of null 
        cartCount.setAttribute('data-count', 0);
    } else
    //else the number
        cartCount.setAttribute('data-count', cartCurrentNumber);
}


// load the cart value once page is loaded

function displayCart() {
    let inCartItem = localStorage.getItem("productsInCart");
    inCartItem = JSON.parse(inCartItem);
    let productsContainer = document.querySelector(".products")
    let counter = 0;
    var totalCost = parseInt(localStorage.getItem('totalCost'));
    if (inCartItem) {

        productsContainer.innerHTML = '';
        // item means each item in the object which is the inCartItem
        Object.values(inCartItem).map(item => {
            // if an item is 
            if (item.inCart > 0) {
                productsContainer.innerHTML += `
            <div class ="product-incart" id="${item.Id}" >
            <ion-icon class="closeButton" name="close-circle" id="${item.Id}"></ion-icon>
            <img src="${item.src}">
            <span class="itemProductName">${item.Productname}</span>
        </div>
        <div class="price-incart">$${item.Price}</div>
        <div class="quantity">
        <ion-icon name="caret-back-outline" class="decreaseButton" id="${item.Id}"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-outline" class="increaseButton" id="${item.Id}"></ion-icon>
        </div>
        <div class="total">
        $${item.inCart * item.Price},00
        </div>
                    `
                console.log(item.src);
            }

            // document.getElementById(item.Id + "CloseBtm").addEventListener('click', event => { removeAll(item); });
        })

        productsContainer.innerHTML +=
            `
        <div class="CartTotalContainer">
            <div class="CartTotalTitle">
                Basket Total: 
                $${totalCost},00
                </div>
        </div>

        
        <div class="single-product-page-add-to-cart">
            <a href="./testcheckoutpage.html" id="checkout" class="btn btn-primary">Check out</a>
            
        </div>
        
        `



    }
}
//it got bound to the specific button you generated in the current loop iteration. But that button gets replaced, when you do .innerHTML += … in the next iteration. The browser creates the elements by re-parsing what the current innerHTML of the container already contained, plus what you newly added. But since those buttons do not contain event handling in the HTML code itself, you get “new” buttons replacing the already existing ones, that are now missing the event handler. You should go read up on event delegation, that is a common method to deal with dynamically added elements. 
//this function is searching each button and add Functionality to it.  
function applyButton() {
    const deleteButton = Array.from(document.getElementsByClassName('closeButton'));
    deleteButton.forEach(button => {
        button.addEventListener('click', () => removeAll(button.id))
    })
    const increaseButton = Array.from(document.getElementsByClassName('decreaseButton'));
    increaseButton.forEach(button => {
        button.addEventListener('click', () => decreaseItem(button.id))
    })
    const decreaseButton = Array.from(document.getElementsByClassName('increaseButton'));
    decreaseButton.forEach(button => {
        button.addEventListener('click', () => increaseItem(button.id))
    })
}

function increaseItem(id) {
    let cartItems = localStorage.getItem('productsInCart');
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    cartItems = JSON.parse(cartItems);
    var itemPrice = parseInt(cartItems[id].Price);

    var totalCost = parseInt(localStorage.getItem('totalCost'));
    //update localstorage's total cost
    localStorage.setItem('totalCost', (totalCost + itemPrice))
        //update localstorage' cartnumber
    localStorage.setItem('cartnumber', cartCurrentNumber + 1);
    //update the jsonfile item in cart. 
    cartItems[id].inCart += 1;

    // passing jason as string
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
        // totallcost(item);

    //update cart and button each time.after clicking the delete button. 
    loadcart();
    displayCart();
    applyButton();

}

function decreaseItem(id) {
    let cartItems = localStorage.getItem('productsInCart');
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    cartItems = JSON.parse(cartItems);
    var itemPrice = parseInt(cartItems[id].Price);
    if (0 <= cartItems[id].inCart) {
        var totalCost = parseInt(localStorage.getItem('totalCost'));
        //update localstorage's total cost
        localStorage.setItem('totalCost', (totalCost - itemPrice))
            //update localstorage' cartnumber
        localStorage.setItem('cartnumber', cartCurrentNumber - 1);
        //update the jsonfile item in cart. 
        cartItems[id].inCart -= 1;

        // passing jason as string
        localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            // totallcost(item);

        //update cart and button each time.after clicking the delete button. 
        loadcart();
        displayCart();
        applyButton();
    }
}

//function will remove item in local storage and jason
function removeAll(id) {
    let cartItems = localStorage.getItem('productsInCart');
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    cartItems = JSON.parse(cartItems);
    var itemPrice = parseInt(cartItems[id].Price);
    var numberOfItem = parseInt(cartItems[id].inCart);
    var itemsCost = itemPrice * numberOfItem;
    var totalCost = localStorage.getItem('totalCost');
    //update localstorage's total cost
    localStorage.setItem('totalCost', totalCost - itemsCost)
        //update localstorage' cartnumber
    localStorage.setItem('cartnumber', cartCurrentNumber - numberOfItem);
    //update the jsonfile item in cart. 
    cartItems[id].inCart = 0;

    // passing jason as string
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
        // totallcost(item);

    //update cart and button each time.after clicking the delete button. 
    loadcart();
    displayCart();
    applyButton();

}




//update the tallcost in localStorage
function totallcost(item) {
    var totalcost = parseInt(localStorage.getItem('totalCost'));
    var price = parseInt(item.Price);
    if (totalcost) {
        totalcost += price;
        localStorage.setItem('totalCost', totalcost);
    } else {
        localStorage.setItem('totalCost', price);
    }
}
// refeash cart everytime 
function loadcart() {
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    var cartCount = document.getElementById("cart-count")
    if (!cartCurrentNumber) {
        //if cart is 0 then print 0 instead of null 
        cartCount.setAttribute('data-count', 0);
    } else
    //else the number
        cartCount.setAttribute('data-count', cartCurrentNumber);
}

function search() {
    //getting the input 
    const searchInput = document.getElementById('SearchInput');
    const suggestionsPanel = document.querySelector('.suggestions');
    searchInput.addEventListener('keyup', function() {
        const input = searchInput.value;
        suggestionsPanel.innerHTML = '';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'productspecs.json', true);
        xhr.send(null);
        xhr.onload = function() {

            if (xhr.status === 200) {
                var responseObject = JSON.parse(xhr.responseText);
                console.log(responseObject.Women.length);
                var counter = 1;
                for (var i = 0; i < responseObject.Women.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Women[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Women[i].Productname)
                        suggestions = responseObject.Women[i].Productname;
                        const div = document.createElement("div");
                        div.innerHTML =
                            `
                        <div>
                            <a href="${responseObject.Women[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.Man.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Man[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Man[i].Productname)
                        suggestions = responseObject.Man[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.Man[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.AppleProductCase.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.AppleProductCase[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.AppleProductCase[i].Productname)
                        suggestions = responseObject.AppleProductCase[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.AppleProductCase[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
                for (var i = 0; i < responseObject.Accessories.length; i++) {
                    if (counter <= 5 && input != "" && responseObject.Accessories[i].Productname.toLowerCase().includes(input)) {
                        console.log(responseObject.Accessories[i].Productname)
                        suggestions = responseObject.Accessories[i].Productname;
                        const div = document.createElement('div');
                        div.innerHTML = `
                        <div>
                            <a href="${responseObject.Accessories[i].herf}">${suggestions}</a>
                        </div>
                        `;
                        suggestionsPanel.appendChild(div);
                        counter++;
                    }
                }
            }
        }
    })
}

// load the cart value once page is loaded 

search();
displayCart();
loadcart();
applyButton();