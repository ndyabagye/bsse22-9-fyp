from django.forms import ModelForm, models

from product.models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['category', 'brand','image', 'name', 'description', 'price']