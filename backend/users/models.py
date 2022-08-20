from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    
    name = models.CharField(max_length=255, default="")
    email = models.EmailField(max_length=254, default="")
    location = models.CharField(max_length=255, default="")
    address = models.CharField(max_length=255, default="")
    contact = models.CharField(max_length=255, default="")
    logo = models.ImageField(upload_to='uploads/', blank=True, null=True)
    advert1 = models.ImageField(upload_to='uploads/', blank=True, null=True)
    advert2 = models.ImageField(upload_to='uploads/', blank=True, null=True)
    advert3 = models.ImageField(upload_to='uploads/', blank=True, null=True)
    business_status = models.BooleanField(default=False)
    advert_status = models.BooleanField(default=False)
    business_subscription = models.DecimalField(max_digits=20, decimal_places=0, default=0)
    advert_subscription = models.DecimalField(max_digits=20, decimal_places=0, default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

    def get_balance(self):
        items = self.items.filter(vendor_paid=False, order__vendors__in=[self.id])
        return sum((item.product.price * item.quantity) for item in items)

    def get_paid_amount(self):
        items = self.items.filter(vendor_paid=True, order__vendors__in=[self.id])
        return sum((item.product.price * item.quantity) for item in items)
