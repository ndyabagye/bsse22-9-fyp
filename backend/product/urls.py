from . import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    
    #---BRAND URLS --- all urls that return brand objects
    path('all_brands', views.all_brands, name="All Brands"),
    path('brand_products/<int:brand_id>', views.brand_products, name="Brand Products"),
    
    
    #---CATEGORY URLS -- all urls that return category objects
    path('all_categories', views.all_categories, name="All Categories"),
    path('category_products/<int:category_id>', views.category_products, name="Category Products"),
    

    #---PRODUCTS URLS --- all urls that return product objects
    path('all', views.all_products, name="all_products"),
    path('<int:product_id>', views.get_product, name="Get Product"),
    
    #---SEND TO CHAT---#
    path('sendChat', views.send_chat, name="send_chat"),


]
