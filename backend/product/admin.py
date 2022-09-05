from django.contrib import admin

# Register your models here.

from .models import Category, Product, Brand

admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Product)