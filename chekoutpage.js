function displayCart() {
    let inCartItem = localStorage.getItem("productsInCart");
    inCartItem = JSON.parse(inCartItem);
    let checkoutContainer = document.querySelector(".checklist-container")
    let counter = 0;
    var totalCost = parseInt(localStorage.getItem('totalCost'));
    if (inCartItem) {

        checkoutContainer.innerHTML = '';
        // item means each item in the object which is the inCartItem
        Object.values(inCartItem).map(item => {
            // if an item is 
            if (item.inCart > 0) {
                checkoutContainer.innerHTML += `
                <p><a href="${item.herf}">${item.Productname}</a> <span class="price">${item.Price}</span></p>
           
                    `
                console.log(item.src);
            }

            // document.getElementById(item.Id + "CloseBtm").addEventListener('click', event => { removeAll(item); });
        })

        checkoutContainer.innerHTML +=
            `
            <div class="check-out-total">
            <p>Total
            <span class="price"><b>${totalCost}</b></span></p>
            </div>
        `
    }
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

displayCart();
loadcart();
search();