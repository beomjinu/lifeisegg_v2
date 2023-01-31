function ConvertNumber(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function counter(num: number, stock: string, price: string, sale: string) {
    var stockInt: number = parseInt(stock)

    if (quantity + num >= 1) {
        if (quantity + num > stockInt) {
            alert(`재고가 부족합니다.\n현재 주문가능 수량: ${stock}개`)
        }
        else {
            quantity += num;
            document.getElementById("counterQuantity").innerText = quantity.toString()
        }
    }

    var priceInt: number = parseInt(price)
    var saleInt: number = parseInt(sale)

    document.getElementById("resultPrice").innerText = ConvertNumber((priceInt - saleInt) * quantity) + "원"
    if (saleInt != 0) {
        document.getElementById("price").innerText = ConvertNumber(priceInt * quantity) + "원"
    }
}

function changeBigImage(image: HTMLImageElement) {
    let bigImage = document.getElementById("bigImage")
    if ((bigImage instanceof HTMLImageElement) && image instanceof HTMLImageElement) {
        bigImage.src = image.src
    }
}

function setCookie(key: string, value: string, day: number) {
    var expires = new Date()
    expires.setDate(expires.getDate() + day)
    document.cookie = key + "=" + value + "; path=/; expires=" + expires["toGMTString"]() + ";"
}

function addCart(productID: string, target=null) {
    var info: string = productID + "." + quantity.toString()
    var cartCookie: RegExpMatchArray|null = document.cookie.match("(^|;) ?cart=([^;]*)(;|$)")

    if (cartCookie == null) {
        setCookie("cart", info, 30)
    }
    else {
        var cart: string = cartCookie[2] 
        var cartList = cart.split(",")
        var isChange: boolean = false
        
        for (var i in cartList) {
            if (productID == cartList[i].split(".")[0]) {
                cartList[i] = productID + "." + (parseInt(cartList[i].split(".")[1]) + quantity).toString()
                isChange = true
            }
        }

        if (isChange != true) {
            setCookie("cart", cart + "," + info, 30)
        }
        else {
            setCookie("cart", cartList.join(","), 30)
        }
    }

    if (target != null) {
        target.innerText = "장바구니에 담겼습니다."
    }

    setCartQuantity()
    
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

let quantity: number = 1;
setCartQuantity()