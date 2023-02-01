from django.shortcuts import render
from product.models import ProductModel
from django.shortcuts import get_object_or_404

# Create your views here.

def index(request):
    cart = [[int(i.split(".")[0]), int(i.split(".")[1])] for i in request.COOKIES["cart"].split(",")]
    cartProductList = []

    for i in cart:
        product = get_object_or_404(ProductModel, pk=i[0])
        product.cartQuantity = i[1]
        product.imageList = list(reversed([productImage.image for productImage in list(product.images.all())]))
        product.mainImage = product.imageList[0]
        product.resultPrice = product.price - product.sale
        product.cartInitPrice = format(product.resultPrice * product.cartQuantity, ",")
        cartProductList.append(product)

    context = {
        "title": "장바구니",
        "cartProductList": cartProductList,
    }

    return render(request, "cart/cart.html", context)
