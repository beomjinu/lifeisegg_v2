from django.shortcuts import render
# Create your views here.

def index(request):
    context = {
        "title"     : "제품",
    }
    return render(request, "product/product.html", context)
