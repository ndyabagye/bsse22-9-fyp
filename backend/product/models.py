# Form Images
from io import BytesIO
from os import name
from statistics import quantiles
from PIL import Image
from django.core.files import File

from django.db import models
from vendor.models import Vendor


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=55)
    ordering = models.IntegerField(default=0)
    description = models.CharField(max_length=50, blank=True,null=True)
    parent_id = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE)
    featured = models.BooleanField(default=False)
    menu = models.BooleanField(default=True)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    banner = models.ImageField(upload_to='uploads/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['ordering']

    def __str__(self):
        return self.title

FRONTEND_TYPE_ENUM =(
    ("1", 'select'),
    ("2", 'radio'),
    ("3", 'text'),
    ("4", 'text_area'),
)

class Attribute(models.Model):
    code = models.CharField(max_length=50)
    name = models.SlugField(max_length=55)
    frontend_type = models.CharField(max_length=2, choices = FRONTEND_TYPE_ENUM, default="1")
    is_filterable = models.BooleanField(default=False)
    is_required = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['code']

    def __str__(self):
        return self.name

class AttributeValue(models.Model):
    value = models.CharField(max_length=50)
    attribute_id = models.ForeignKey(Attribute, related_name='attribute_values', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=20, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['attribute_id']

    def __str__(self):
        return self.value

class Brand(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=55)
    logo = models.ImageField(upload_to='uploads/', blank=True, null=True)
    category = models.ForeignKey(Category, related_name='brands', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, related_name='products', blank=True, null=True, on_delete=models.SET_NULL)
    vendor = models.ForeignKey(Vendor, related_name="products", on_delete=models.CASCADE)
    sku = models.CharField(max_length=50, blank=True, null=True,)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=55)
    quantity = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    weight = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True,)
    
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True,)
    sale_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True,)
    status = models.BooleanField(default=False)
    added_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True) # Change uploads to thumbnails 

    class Meta:
        ordering = ['-added_date']

    def __str__(self):
        return self.name

    
    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()
                return self.thumbnail.url
            
            else:
                # Default Image
                return 'https://via.placeholder.com/240x180.jpg'
    
    # Generating Thumbnail - Thumbnail is created when get_thumbnail is called
    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail

class ProductAttribute(models.Model):
    attribute_id = models.ForeignKey(Attribute, related_name='attribute', on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, related_name='product', on_delete=models.CASCADE)
    value = models.CharField(max_length=50) 
    price = models.DecimalField(max_digits=20, decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['attribute_id']

    def __str__(self):
        return self.value


