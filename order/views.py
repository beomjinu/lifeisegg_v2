from django.shortcuts import render

# Create your views here.

def index(requests):
    context = {
        "title": "주문 작성",
    }

    return render(requests, "order/order.html", context)
