function setCookie(key: string, value: string, day: number) {
    var expires = new Date()
    expires.setDate(expires.getDate() + day)
    document.cookie = key + "=" + value + "; path=/; expires=" + expires["toGMTString"]() + ";"
}

function setCartQuantity() {
    var cartCookie: RegExpMatchArray|null = document.cookie.match("(^|;) ?cart=([^;]*)(;|$)")

    if (cartCookie == null) {
        document.getElementById("cartQuantity").innerText = "";
    }
    else {
        var cart: string = cartCookie[2]
        document.getElementById("cartQuantity").innerText = "(" + cart.split(",").length + ")" 
    }
}

setCartQuantity()