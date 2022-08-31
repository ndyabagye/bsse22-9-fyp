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
    name = models.CharField(max_length=55)
    slug = models.SlugField(max_length=55)
    description = models.CharField(max_length=50, blank=True,null=True)
    status = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=55)
    description = models.CharField(max_length=50, blank=True,null=True)
    status = models.BooleanField(default=False)
    logo = models.ImageField(upload_to='uploads/', blank=True, null=True)
    archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
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
    selling_price = models.IntegerField(default=0)
    base_price = models.IntegerField(default=0)
    profit = models.IntegerField(default=0)
    brand_id = models.ForeignKey(Brand, related_name='products', blank=True, null=True, on_delete=models.SET_NULL)
    model = models.CharField(max_length=50)
    transmission = models.CharField(
        max_length=50,
        choices=TRANSMISSION_CHOICES,
        default="automatic"
    )
    year = models.IntegerField(default=0)
    mileage = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-added_date']

    def __str__(self):
        return self.name