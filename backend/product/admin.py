from django.contrib import admin

# Register your models here.

from .models import Category, Product, Attribute, AttributeValue, Brand, ProductAttribute

admin.site.register(Category)
admin.site.register(Attribute)
admin.site.register(AttributeValue)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductAttribute)