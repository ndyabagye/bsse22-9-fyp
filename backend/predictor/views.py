from django.shortcuts import render
from django.http import HttpResponse
    
# Create your models here.
def index(request):
    return HttpResponse("Hello world!")