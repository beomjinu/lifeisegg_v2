from django.urls import path
from . import views

urlpatterns = [
    path("", views.product, name="product"),
    path("<int:productID>/", views.detail, name="detail"),
]

