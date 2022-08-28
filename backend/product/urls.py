from . import views
from django.urls import path

app_name = 'product'

urlpatterns = [



    #---GET LIST OF PRODUCTS URLS
    path('all_products', views.all_products, name="all_products"),
    path('all_categories', views.all_categories, name="all_categories"),
    
    #--GET A SINGULAR OBJECT
    
    path('brand/<int:brand_id>', views.brand_products, name="brand_products"),
    path('vendor/<int:vendor_id>', views.vendor_products, name="vendor_products"),
    path('category/<int:category_id>', views.category_products, name="category_products"),
    path('<int:product_id>', views.single_product, name="product"),
    
    #--PREDICT A  PRICE--#
    path('predictPrice', views.predict_price, name="predict_price"),

    #---SEND TO CHAT---#
    path('sendChat', views.send_chat, name="send_chat"),

    #---POST LIST OF PRODUCTS---#
    path('storeCategory', views.store_category, name="store_category"),
    path('storeBrand', views.store_brand, name="send_chat"),

    path('search', views.search, name="search"),
    path('<slug:category_slug>/<slug:product_slug>/', views.product, name="product"),
    path('<slug:category_slug>/', views.category, name="category")
    
]
