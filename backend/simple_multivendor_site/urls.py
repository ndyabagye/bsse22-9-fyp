
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('core.urls')),
    path('admin/', admin.site.urls),
    path('vendor/', include('vendor.urls')),
    path('product/', include('product.urls')),
    path('cart/', include('cart.urls')),
    path('order/', include('order.urls')),
    path('location/', include('location.urls')),
    path('users/', include('users.urls')),
    path('scraper/', include('scraper.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
