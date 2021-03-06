let itemName = document.getElementById("itemName");
let itemPrice = document.getElementById("itemPrice");
let formBtn = document.getElementById("formBtn");
let items = document.getElementById("items");
let conclusion = document.getElementById("conclusion");

let numRegex = /^([1-9]\d*|0)(\.\d+)?$/;
// /^([1-9]\d*|0)(\.\d+)?$/ - regex for numbers with .
// /^[0-9]+$/
// /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/ - regex for num with comma or dot

// make an array of prices
let pricesArray = [];

function removeItem(e) {
    e.target.parentElement.remove();
    // line below is weird, but it works
    // currently this is the only way i find out to work
    let price = Number(e.target.parentElement.querySelector(".price").innerText);
    let index = pricesArray.indexOf(price);
    pricesArray.splice(index, 1);
    let summary = Number(pricesArray.reduce((a, b) => a + b, 0)).toFixed(2);
    conclusion.innerHTML = `You will pay <span class="total">${summary}</span> UAH for your items`;
}

function addToList() {
    let nameErr = document.getElementById("nameErr");
    let priceErr = document.getElementById("priceErr");
    //check if form is filled properly
    if (itemName.value === "") {
        nameErr.innerHTML = `please, print name of bought item`;
    } else {
        nameErr.innerHTML = "";
    }
    if (itemPrice.value === "" || numRegex.test(itemPrice.value) === false) {
        priceErr.innerHTML = `please, print the price of bought item`;
    } else {
        priceErr.innerHTML = "";
    }
    if (itemName.value !== "" && itemPrice.value !== "" &&
        numRegex.test(itemPrice.value) !== false) {
        let productName = itemName.value;
        let productPrice = itemPrice.value;

        let listItem = document.createElement("li");
        listItem.innerHTML = `<p class="list-item"> <span class="name">${productName}</span> for 
        <span class="price">${productPrice}</span> UAH </p>`;
        pricesArray.push(Number(productPrice)); //add a price to an array

        let delBtn = document.createElement("p");
        delBtn.innerHTML = `(delete item)`;
        delBtn.classList.add("close");

        items.appendChild(listItem);
        listItem.appendChild(delBtn);
        delBtn.addEventListener("click", removeItem, false);

        // make a sum of prices in array
        let summary = Number(pricesArray.reduce((a, b) => a + b, 0)).toFixed(2);
        // display the total sum to pay 
        conclusion.innerHTML = `You will pay <span class="total">${summary}</span> UAH for your items`;
    }
}
formBtn.addEventListener("click", addToList, false);
document.body.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addToList();
    }
}, false)

//PWA functionality
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker seems to work"))
            .catch(res => console.log("something is wrong service worker", err))
    })
}