var data;

function fetchData() {
    fetch("productspecs.json")
        .then(response => {
            data = response.json();

            return data;
        })
        .then(json => {
            // json.Men.forEach(x => {
            //     makeCard(x);
            // });

            // json.Women.forEach(x => {
            //     makeCard(x);
            // });
            makeCard(json.Man[1]);
            makeCard(json.Women[0]);
            makeCard(json.Accessories[8]);
            makeCard(json.AppleProductCase[0]);
        });
}


function makeCard(item) {
    var div = document.createElement("div");
    var id = item.Id;
    var productname = item.Productname;
    var price = item.Price;
    var root = document.getElementById('card-root');
    var description = "Some quick example text to build on the card title and make up the bulk of the card's content."
    div.innerHTML =
        `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${item.src}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${productname}</h5>
            <p class="card-text">${description}</p>
            <p class="price">${"$"+price}</p>
            <a href="${item.herf}" class="btn btn-primary">To Gallery</a>
            <a href="#" id ="${id}AddToCart" class="btn btn-primary">Add to Cart</a>
        </div>
    </div>`;
    // line 42 would create btn for each item and the id is the the product id. 
    root.appendChild(div);
    // add to cart btn lisenter
    document.getElementById(id + "AddToCart").addEventListener("click", ("click", () => { addCartClicked(item); }));

}

//update the cartNumber
function addCartClicked(item) {
    var cartCurrentNumber = parseInt(localStorage.getItem('cartnumber'));
    if (cartCurrentNumber) {
        localStorage.setItem('cartnumber', cartCurrentNumber + 1);
        // changing the cart number
        var cartCount = document.getElementById("cart-count")
        cartCount.setAttribute('data-count', cartCurrentNumber + 1);
    } else {
        localStorage.setItem('cartnumber', 1);
        // changing the cart number
        var cartCount = document.getElementById("cart-count")
        cartCount.setAttribute('data-count', 1);
    }
    addItemToCart(item);

}

function addItemToCart(item) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        if (cartItems[item.Id] == undefined) {
            item.inCart = 1;
            cartItems = {
                ...cartItems,
                [item.Id]: item
            }
        } else
            cartItems[item.Id].inCart += 1;
    } else {
        item.inCart = 1;
        cartItems = {
            [item.Id]: item
        }
    }


    // passing jason as string
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    totallcost(item);
}

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
loadcart();
search();