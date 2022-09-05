from django import forms
from django.forms.fields import IntegerField
from django.forms.forms import Form


class AddToCartForm(forms.Form):
    quantity = forms.IntegerField()

class CategoryForm(forms.Form):
    name = forms.CharField(label='name', max_length=100)
    slug = forms.CharField(label='slug', max_length=100)
    description = forms.CharField(label='description', max_length=100)
    status = forms.BooleanField(required=False, initial=False)

class BrandForm(forms.Form):
    name = forms.CharField(label='name', max_length=100)
    slug = forms.CharField(label='slug', max_length=100)
    description = forms.CharField(label='description', max_length=100)
    status = forms.BooleanField(required=False, initial=False)

"""class ProductForm(forms.Form):
    name = forms.CharField(label='name', max_length=100)
    slug = forms.CharField(label='slug', max_length=100)
    description = forms.CharField(label='description', max_length=100)
    status = forms.BooleanField(required=False, initial=False)
    
    category_id = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    vendor_id = models.ForeignKey(Vendor, related_name="products", on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    added_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    image2 = models.ImageField(upload_to='uploads/', blank=True, null=True)
    image3 = models.ImageField(upload_to='uploads/', blank=True, null=True)
    status = models.BooleanField(default=False)
    
    TRANSMISSION_CHOICES = [
        ('automatic', 'Automatic'),
        ('manual', 'Manual'),
    ]
    selling_price = models.IntegerField(default=0,blank=True, null=True)
    base_price = models.IntegerField(default=0,decimal_places=2, blank=True, null=True)
    profit = models.IntegerField(default=0,decimal_places=2, blank=True, null=True)
    brand_id = models.ForeignKey(Brand, related_name='products', blank=True, null=True, on_delete=models.SET_NULL)
    model = models.CharField(max_length=50)
    transmission = models.CharField(
        max_length='50',
        choices=TRANSMISSION_CHOICES,
        default="automatic"
    )
    year = models.IntegerField(default=0)
    mileage = models.IntegerField(default=0)"""