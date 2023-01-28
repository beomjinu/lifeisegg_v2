from django.contrib import admin
from .models import ProductModel, ProductImg

class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "sale", "stock", "created",]

admin.site.register(ProductModel, ProductAdmin)
admin.site.register(ProductImg)