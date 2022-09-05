from django.forms import ModelForm, models

from product.models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = [
            'category_id', 
            'brand_id',
            'image', 
            'description', 
            'base_price']