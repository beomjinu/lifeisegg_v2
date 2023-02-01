function getCartCookieList() {
    return document.cookie.match('(^|;) ?cart=([^;]*)(;|$)')[2].split(",");
}
function addQuantity(productID, productResultPrice, productStock, num) {
    var cartCookieList = getCartCookieList();
    for (var i in cartCookieList) {
        if (cartCookieList[i].split(".")[0] == productID) {
            var quantity = parseInt(cartCookieList[i].split(".")[1]);
            if (quantity + num >= 1) {
                if (quantity + num > parseInt(productStock)) {
                    alert("\uD574\uB2F9 \uC0C1\uD488\uC758 \uC7AC\uACE0\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4.\n\uD604\uC7AC \uC8FC\uBB38\uAC00\uB2A5 \uC218\uB7C9: ".concat(productStock, "\uAC1C"));
                }
                else {
                    cartCookieList[i] = productID + "." + (quantity + num).toString();
                    document.getElementById("quantity-" + productID).innerText = (quantity + num).toString();
                    document.getElementById("price-" + productID).innerText = ConvertNumber(((quantity + num) * parseInt(productResultPrice))) + "원";
                    setCookie("cart", cartCookieList.join(","), 30);
                    loadTotalValues();
                }
            }
            break;
        }
    }
}
function deleteCartProduct(productID) {
    var cartCookieList = getCartCookieList();
    for (var i in cartCookieList) {
        if (cartCookieList[i].split(".")[0] == productID) {
            cartCookieList.splice(parseInt(i), 1);
            break;
        }
    }
    setCookie("cart", cartCookieList.join(","), 30);
    location.reload();
}
function loadTotalValues() {
    var cartCookieList = getCartCookieList();
    var totalProductPrice = 0;
    for (var i in cartCookieList) {
        var price = document.getElementById("price-" + cartCookieList[i].split(".")[0]).innerText;
        totalProductPrice += parseInt(price.replace(/,/g, ""));
    }
    document.getElementById("totalProductPrice").innerText = ConvertNumber(totalProductPrice) + "원";
    var shipmentFee = 0;
    if (totalProductPrice < 50000) {
        shipmentFee += 2500;
    }
    document.getElementById("shipmentFee").innerText = ConvertNumber(shipmentFee) + "원";
    document.getElementById("totalPrice").innerText = ConvertNumber(totalProductPrice + shipmentFee) + "원";
}
function ConvertNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
loadTotalValues();
