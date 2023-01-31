function ConvertNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function counter(num, stock, price, sale) {
    var stockInt = parseInt(stock);
    if (quantity + num >= 1) {
        if (quantity + num > stockInt) {
            alert("\uC7AC\uACE0\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4.\n\uD604\uC7AC \uC8FC\uBB38\uAC00\uB2A5 \uC218\uB7C9: ".concat(stock, "\uAC1C"));
        }
        else {
            quantity += num;
            document.getElementById("counterQuantity").innerText = quantity.toString();
        }
    }
    var priceInt = parseInt(price);
    var saleInt = parseInt(sale);
    document.getElementById("resultPrice").innerText = ConvertNumber((priceInt - saleInt) * quantity) + "원";
    if (saleInt != 0) {
        document.getElementById("price").innerText = ConvertNumber(priceInt * quantity) + "원";
    }
}
function changeBigImage(image) {
    var bigImage = document.getElementById("bigImage");
    if ((bigImage instanceof HTMLImageElement) && image instanceof HTMLImageElement) {
        bigImage.src = image.src;
    }
}
function setCookie(key, value, day) {
    var expires = new Date();
    expires.setDate(expires.getDate() + day);
    document.cookie = key + "=" + value + "; path=/; expires=" + expires["toGMTString"]() + ";";
}
function addCart(productID, target) {
    if (target === void 0) { target = null; }
    var info = productID + "." + quantity.toString();
    var cartCookie = document.cookie.match("(^|;) ?cart=([^;]*)(;|$)");
    if (cartCookie == null) {
        setCookie("cart", info, 30);
    }
    else {
        var cart = cartCookie[2];
        var cartList = cart.split(",");
        var isChange = false;
        for (var i in cartList) {
            if (productID == cartList[i].split(".")[0]) {
                cartList[i] = productID + "." + (parseInt(cartList[i].split(".")[1]) + quantity).toString();
                isChange = true;
            }
        }
        if (isChange != true) {
            setCookie("cart", cart + "," + info, 30);
        }
        else {
            setCookie("cart", cartList.join(","), 30);
        }
    }
    if (target != null) {
        target.innerText = "장바구니에 담겼습니다.";
    }
    setCartQuantity();
}
function setCartQuantity() {
    var cartCookie = document.cookie.match("(^|;) ?cart=([^;]*)(;|$)");
    if (cartCookie == null) {
        document.getElementById("cartQuantity").innerText = "";
    }
    else {
        var cart = cartCookie[2];
        document.getElementById("cartQuantity").innerText = "(" + cart.split(",").length + ")";
    }
}
var quantity = 1;
setCartQuantity();
