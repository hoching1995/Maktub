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

function toallcost(item) {
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

function createDiscription() {
    var itemNumber = 8;
    // also change line 102 for the group ( women/man...etc)
    itemNumber--;
    const productText = document.querySelector('.single-product-page-text');
    productText.innerHTML = '';
    // set up for the json file 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'productspecs.json', true);
    xhr.send(null);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var responseObject = JSON.parse(xhr.responseText);
            var productName = responseObject.Man[itemNumber].Productname;
            var discription = responseObject.Man[itemNumber].description;
            var color = responseObject.Man[itemNumber].color;
            var price = responseObject.Man[itemNumber].Price;
            var id = responseObject.Man[itemNumber].Id;
            var item = responseObject.Man[itemNumber];
            console.log(productName);
            const div = document.createElement("div");

            div.innerHTML =
                `<div class="innertext">
                <br>
                <h1>${productName}</h2>
                <h3>$${price}</h3>
            `

            for (var k = 0; k < discription.length; k++) {
                div.innerHTML += `<div class="discription-txt">${discription[k]} </div>`;
            }

            productText.appendChild(div);
            if (undefined !== color && color.length) {
                div.innerHTML +=
                    `
            <br>
            <h4>color: </h4>
            `
                productText.appendChild(div);
                //creating options
                var selectList = document.createElement("select");
                selectList.id = "mySelect";
                productText.appendChild(selectList);
                for (var k = 0; k < color.length; k++) {
                    var option = document.createElement("option");
                    option.setAttribute("value", color[k]);
                    option.text = color[k];
                    selectList.appendChild(option);
                }
            }
            //creating the buy buttun 
            const newdiv = document.createElement("div");
            newdiv.innerHTML =
                `
            <div class="single-product-page-add-to-cart">
                <a href="#" id="${id}AddToCart" class="btn btn-primary">Add to Cart</a>
                
            </div>
            `

            productText.appendChild(newdiv);
            document.getElementById(id + "AddToCart").addEventListener("click", ("click", () => { addCartClicked(item); }));
        }
    }

}

function createImages() {
    // const createSub = document.querySelector('.small-img-row');
    const createMainImage = document.querySelector('.Imagebox');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'gallery.json', true);
    xhr.send(null);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var responseObject = JSON.parse(xhr.responseText);
            var image = responseObject.straightWallet;
            // create the main image 
            const div = document.createElement("div");
            createMainImage.innerHTML =
                `
            <img src="${image[0].src}" alt="" id="product-img">

            `
                // createMainImage.appendChild(div);


            //create the sub image 
            const createSub = document.createElement('div');
            createSub.className = "small-img-row";
            createSub.innerHTML = '';



            for (var i = 0; i < image.length; i++) {
                const div2 = document.createElement("div");
                div2.innerHTML = "";
                div2.className = "small-img-col";
                div2.innerHTML += `<img src="${image[i].src}" alt="" class="small-img">`
                createSub.appendChild(div2);
                createMainImage.appendChild(createSub);
                imageViwer(i);
            }


        }

    }

}

//creating subimage changing function
function imageViwer(number) {
    var smallImg = document.getElementsByClassName("small-img");
    var productImg = document.getElementById("product-img");
    smallImg[number].onclick = function() {
        productImg.src = smallImg[number].src;
    }

}

// calculate height of browser window 


// load the cart value once page is loaded 
loadcart();
search();
createImages();
createDiscription();