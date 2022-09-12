from __future__ import print_function
import random # To get random products from the database
from django.shortcuts import redirect, render, get_object_or_404
from .models import Category, Product,Brand
from django.db.models import Q
from cart.cart import Cart
from django.http import JsonResponse
from django.contrib import messages
from django.shortcuts import redirect, render, get_object_or_404

from .forms import AddToCartForm,CategoryForm,BrandForm
from cart.cart import Cart
from predictor.models import Predictor
from chat.models import ChatBot
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt # import
import xmlrpc.client

url = 'http://localhost:8069'
db = 'finalyear'
username = 'jkigula@icloud.com'
password = 'ni3r-mauh-xdwn'

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))
#---BRAND URLS---#
def all_brands(request):
    uid = common.authenticate(db, username, password, {})
    records = models.execute_kw(db, uid, password,
        'brand',
        'search_read',
        [[]], {
            'fields': ['id', 'name', 'slug','description','brand_logo']
        }
    )

    return JsonResponse(records,safe=False)

def brand_products(request,brand_id):
    uid = common.authenticate(db, username, password, {})
    records = models.execute_kw(db, uid, password,
        'product',
        'search_read',
        [[['brand_id','=',brand_id]]], {
            'fields': [
                'id',
                'category_id',
                'vendor_id',
                'brand_id',
                'car_model_id',
                'description',
                'image',
                'image2',
                'image3',
                'transmission',
                'year',
                'mileage',
                'selling_price',
                'base_price',
            ]
        }
    )
    return JsonResponse(records,safe=False)

#---CATEGORY URLS---#
def all_categories(request):
    uid = common.authenticate(db, username, password, {})
    records = models.execute_kw(db, uid, password,
        'category',
        'search_read',
        [[]], {
            'fields': ['id', 'name', 'description']
        }
    )

    return JsonResponse(records,safe=False)

def category_products(request,category_id):
    uid = common.authenticate(db, username, password, {})
    records = models.execute_kw(db, uid, password,
        'product',
        'search_read',
        [[['category_id','=',category_id]]], {
            'fields': [
                'id',
                'category_id',
                'vendor_id',
                'brand_id',
                'car_model_id',
                'description',
                'image',
                'image2',
                'image3',
                'transmission',
                'year',
                'mileage',
                'selling_price',
                'base_price',
            ]
        }
    )
    return JsonResponse(records,safe=False)

#---PRODUCT URLS---#
def all_products(request):
    uid = common.authenticate(db, username, password, {})
    records = models.execute_kw(db, uid, password,
        'product',
        'search_read',
        [[['status','=',True]]], {
            'fields': [
                'id',
                'category_id',
                'vendor_id',
                'brand_id',
                'car_model_id',
                'description',
                'image',
                'image2',
                'image3',
                'transmission',
                'year',
                'mileage',
                'selling_price',
                'base_price',
            ]
        }
    )

    return JsonResponse(records,safe=False)

def get_product(request, product_id):
    print('')
    print('hshahsa')
    print('')
    uid = common.authenticate(db, username, password, {})
    print('')
    print(uid)
    print('')
    records = models.execute_kw(db, uid, password,
        'product',
        'search_read',
        [[['id','=',product_id]]], {
            'fields': [
                'id',
                'category_id',
                'vendor_id',
                'brand_id',
                'car_model_id',
                'description',
                'image',
                'image2',
                'image3',
                'transmission',
                'year',
                'mileage',
                'selling_price',
                'base_price',
            ]
        }
    )

    return JsonResponse(records,safe=False)

#--ORDER URLS-----#
@csrf_exempt
def make_order(request):
    if request.method == 'POST':
        client_response = request.POST
        order = {}
        for i in client_response:
            order[i] = client_response[i]
        uid = common.authenticate(db, username, password, {})
        id = models.execute_kw(db, uid, password,
            'order', 'create', [order])
        if type(id) == int:
            return HttpResponse(id)
    return HttpResponse("not saved")





#-----REGISTRATION
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        client_response = request.POST
        registration = {}
        for i in client_response:
            registration[i] = client_response[i]


        del registration['confirm_password']
        registration['company_ids'] = [1]
        registration['company_id'] = 1

        print("")
        print(registration)
        print("")

        uid = common.authenticate(db, username, password, {})
        user_id = models.execute_kw(db, uid, password,
            'res.users',
            'create', [
                registration
            ])

    if type(user_id) == int:
            return HttpResponse(user_id)
    return HttpResponse("not saved")

#-----CHAT URLS----#
@csrf_exempt
def send_chat(request):
    chat_response = {}
    if request.method == 'POST':
        client_response = request.POST
        client_response = dict(client_response.lists())
        chatbot_response_returned = ChatBot.chat(client_response) # calls the predict function in class predict with car values e.g make, model
        chat_response = chatbot_response_returned
    else:
        chat_response["response"] = "i didnt get that"
    return JsonResponse(chat_response,safe=False)