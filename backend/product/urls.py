from . import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    
    #---BRAND URLS --- all urls that return brand objects
    path('all_brands', views.all_brands, name="All Brands"),
    path('create_brand', views.create_brand, name="Create Brand"),
    path('brand/<int:brand_id>', views.get_brand, name="Get Brand"),
    path('update_brand/<int:brand_id>', views.update_brand, name="Update Brand"),
    path('archive_brand/<int:brand_id>', views.archive_brand, name="Archive Brand"),
    
    
    #---CATEGORY URLS -- all urls that return category objects
    path('all_categories', views.all_categories, name="All Categories"),
    path('create_category', views.create_category, name="Create Category"),
    path('category/<int:category_id>', views.get_category, name="Get Category"),
    path('update_category/<int:category_id>', views.update_category, name="Update Category"),
    path('archive_category/<int:category_id>', views.archive_category, name="Archive Category"),


    #---PRODUCTS URLS --- all urls that return product objects
    path('all', views.all_products, name="all_products"),
    path('create', views.create_product, name="Create Product"),
    path('<int:product_id>', views.get_product, name="Get Product"),
    path('update/<int:product_id>', views.update_product, name="Update Product"),
    path('archive/<int:product_id>', views.archive_product, name="Archive Product"),
    path('brand_products/<int:brand_id>', views.brand_products, name="Brand Products"),
    path('vendor_products/<int:vendor_id>', views.vendor_products, name="Vendor Products"),
    path('category_products/<int:category_id>', views.category_products, name="Category Products"),
    
    #--PREDICT A  PRICE--#
    path('predictPrice', views.predict_price, name="predict_price"),

    #---SEND TO CHAT---#
    path('sendChat', views.send_chat, name="send_chat"),




    #---OLD URLS---#
    path('search', views.search, name="search"),
    path('<slug:category_slug>/<slug:product_slug>/', views.product, name="product"),
    path('<slug:category_slug>/', views.category, name="category")
    
]
