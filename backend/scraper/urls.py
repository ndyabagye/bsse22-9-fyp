from . import views
from django.urls import path

app_name = 'scraper'

urlpatterns = [
    
    #---SCRAPE URL 
    path('scrape', views.scrape, name="Scrape"),
]