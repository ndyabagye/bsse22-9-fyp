from django.db import models

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=50) 
    parent_id = models.ForeignKey('self', blank=True, null=True,on_delete=models.CASCADE)
    
    delivery_price = models.DecimalField(max_digits=19, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.slug