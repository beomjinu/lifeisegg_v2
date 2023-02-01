function getCartCookieList() {
    return document.cookie.match('(^|;) ?cart=([^;]*)(;|$)')[2].split(",");
}

function addQuantity(productID: string, productResultPrice: string, productStock: string, num: number) {
    var cartCookieList = getCartCookieList()
    
    for (var i in cartCookieList) {
        if (cartCookieList[i].split(".")[0] == productID) {
            var quantity = parseInt(cartCookieList[i].split(".")[1])
            
            if (quantity + num >= 1) {
                if (quantity + num > parseInt(productStock)) {
                    alert(`해당 상품의 재고가 부족합니다.\n현재 주문가능 수량: ${productStock}개`)
                }
                else {
                    cartCookieList[i] = productID + "." + (quantity + num).toString()
                    document.getElementById("quantity-" + productID).innerText = (quantity + num).toString()
                    document.getElementById("price-" + productID).innerText = ConvertNumber(((quantity + num) * parseInt(productResultPrice))) + "원"
                    setCookie("cart", cartCookieList.join(","), 30)
                    loadTotalValues()
                }
            }
            
            break
        }
    }
    
}

function deleteCartProduct(productID: string) {
    var cartCookieList = getCartCookieList()

    for (var i in cartCookieList) {
        if (cartCookieList[i].split(".")[0] == productID) {
            cartCookieList.splice(parseInt(i), 1)
            break
        }
    }

    setCookie("cart", cartCookieList.join(","), 30)
    location.reload()
}

function loadTotalValues() {
    var cartCookieList = getCartCookieList()
    var totalProductPrice: number = 0
    for (var i in cartCookieList) {
        var price = document.getElementById("price-" + cartCookieList[i].split(".")[0]).innerText
        totalProductPrice += parseInt(price.replace(/,/g, ""))
    }
    
    document.getElementById("totalProductPrice").innerText = ConvertNumber(totalProductPrice) + "원"
    
    var shipmentFee: number = 0
    if (totalProductPrice < 50000) {
        shipmentFee += 2500
    }

    document.getElementById("shipmentFee").innerText = ConvertNumber(shipmentFee) + "원"
    document.getElementById("totalPrice").innerText = ConvertNumber(totalProductPrice + shipmentFee) + "원"

}

function ConvertNumber(num: number) { // 분명 base.ts에 함수가 있는데 (ts도 인지중) 브라우저 콘솔에서는 함수가 없다고 나온다. 우선순위도 뒤라서 괜찮을텐데..
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

loadTotalValues()