from django.shortcuts import render

# Create your views here.

def index(request):
    context = {
        "title": "장바구니"
    }
    return render(request, "cart/cart.html", context)
