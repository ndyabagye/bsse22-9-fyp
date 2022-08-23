from django.urls import path
from . import views
from django.views.generic.base import RedirectView

app_name = 'core'

urlpatterns = [
    path('', RedirectView.as_view(url='http://localhost:3000')),
    #path('', views.frontpage, name="home"),
    path('contact-us/', views.contactpage, name="contact"),
]
