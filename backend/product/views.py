import random # To get random products from the database
from django.shortcuts import redirect, render, get_object_or_404
from .models import Category, Product,Brand
from django.db.models import Q
from cart.cart import Cart
from django.http import JsonResponse
from django.contrib import messages
from django.shortcuts import redirect, render, get_object_or_404

from .forms import AddToCartForm,CategoryForm
from cart.cart import Cart
from predictor.models import Predictor
from chat.models import ChatBot
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt # import

#--- USED TO GET BRANDS---#
def all_brands(request):
    brands = list(Product.objects.values())
    return JsonResponse(brands,safe=False)


#--- USED TO GET CATEGORIES---#
def all_categories(request):
    categories = list(Category.objects.values())
    return JsonResponse(categories,safe=False)

def get_child_categories(request):
    child_categories = list(Category.objects.values())
    return JsonResponse(child_categories,safe=False)

#--- USED TO GET PRODUCTS---#
def all_products(request):
    products = list(Product.objects.values())
    return JsonResponse(products,safe=False)

def brand_products(request,brand_id):
    obj = Product.objects.filter(brand_id=brand_id)
    products = list(obj.values())
    return JsonResponse(products,safe=False)

def vendor_products(request,vendor_id):
    obj = Product.objects.filter(vendor_id = vendor_id)
    products = list(obj.values())
    return JsonResponse(products,safe=False)

def category_products(request,category_id):
    obj = Product.objects.filter(category_id=category_id)
    products = list(obj.values())
    return JsonResponse(products,safe=False)

def single_product(request, product_id):
    obj = Product.objects.filter(pk=product_id)
    product = list(obj.values())
    return JsonResponse(product,safe=False)

@csrf_exempt 
def predict_price(request):
    price_data = {}
    if request.method == 'POST':
        car_values = request.POST
        car_values = dict(car_values.lists())
        price_returned = Predictor.predict(car_values) # calls the predict function in class predict with car values e.g make, model
        price_data['predicted_price'] = price_returned
    else:
        price_data["predicted_price"] = "no product details"
    
    return JsonResponse(price_data,safe=False)

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

@csrf_exempt 
def store_brand(request):
    if request.method == 'POST':
        brand = Brand(request.POST)

        """
        if form.is_valid():
            # process form data
            obj = Category() #gets new object
            obj.business_name = form.cleaned_data['business_name']
            obj.business_email = form.cleaned_data['business_email']
            obj.business_phone = form.cleaned_data['business_phone']
            obj.business_website = form.cleaned_data['business_website']
            #finally save the object in db
            obj.save()
            return HttpResponseRedirect('/')"""

@csrf_exempt 
def store_category(request):
    if request.method == 'POST':
        category = CategoryForm(request.POST)
        if category.is_valid():
            obj = Category() #gets new object
            obj.title = category.cleaned_data['title']
            obj.slug = category.cleaned_data['slug']
            obj.description = category.cleaned_data['description']
            obj.save()
            return HttpResponse("valid")
        else:
            return HttpResponse("invalid")



# Create your views here.
def product(request, category_slug, product_slug):
    # Create instance of Cart class
    cart = Cart(request)
    
    product = get_object_or_404(Product, category__slug=category_slug, slug=product_slug)

    # Check whether the AddToCart button is clicked or not
    if request.method == 'POST':
        form = AddToCartForm(request.POST)

        if form.is_valid():
            quantity = form.cleaned_data['quantity']
            cart.add(product_id=product.id, quantity=quantity, update_quantity=False)

            messages.success(request, "The product was added to the cart.")

            return redirect('product:product', category_slug=category_slug, product_slug=product_slug)            
    
    else:
        form = AddToCartForm()

    similar_products = list(product.category.products.exclude(id=product.id))

    # If more than 4 similar products, then get 4 random products 
    if len(similar_products) >= 4:
        similar_products = random.sample(similar_products, 4)
    
    context = {
        'product': product,
        'similar_products': similar_products,
        'form': form,
    }

    return render(request, 'product/product.html', context)

def category(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    return render(request,'product/category.html', {'category': category})

def search(request):
    print("")
    print("hehr")
    print("")
    query = request.GET.get('query', '') # second is default parameter which is empty
    products = Product.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))
    #return render(request, 'product/search.html', {'products':products, 'query': query})