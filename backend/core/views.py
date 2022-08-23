from django.shortcuts import render
from product.models import Product
from django.http import HttpResponse

# Create your views here.

def frontpage(request):
     return HttpResponse("Run the react server to see the frontend")

def contactpage(request):
    return render(request, 'core/contact.html')