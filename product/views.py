from django.shortcuts import render, redirect, get_object_or_404
from .models import ProductModel
# Create your views here.

def index(request):
    return redirect("/product")

def product(request):
    productList = ProductModel.objects.order_by("-created")
    for product in productList:
        product.mainImage = list(product.images.all())[-1].image
        product.resultPrice = format(product.price - product.sale, ",")
        product.formatPrice = format(product.price, "," )

    context = {
        "title"         : "라이프이즈에그",
        "productList"   : productList,
    }
    return render(request, "product/product.html", context)

def detail(request, productID):
    product = get_object_or_404(ProductModel, pk=productID)
    product.imageList = list(reversed([productImage.image for productImage in list(product.images.all())]))
    product.mainImage = product.imageList[0]
    product.resultPrice = format(product.price - product.sale, ",")
    product.formatPrice = format(product.price, ",")

    context = {
        "title"     : product.name,
        "product"   : product,
    }

    return render(request, "product/detail.html", context)
