from urllib import response
from odoo import http
from odoo.http import request
import json
import base64
import datetime


class Autocar(http.Controller):

#----------------PRODUCT URLS---------------------#
    @http.route('/products/all', type='http', auth="public", db='finalyear')
    def get_products(self, **post):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Product = env['product']
        products = Product.sudo().search([
            ('status', '=', True), 
        ])
        values = []
        for product in products:
            img_b64 = ""
            if product.image:
                im_b64 = base64.b64encode(product.image).decode("utf8")
            else:
                im_b64 = "no image"
            values.append({
                'id': product.id,
                'category': product.category_id.name,
                'vendor_id': product.vendor_id.name,
                'brand_id':product.brand_id.name,
                'car_model_id':product.car_model_id.name,
                'description': product.description,
                'image': im_b64,
                'image2': 'no image',
                'image3': 'no_image',
                'transmission': product.transmission,
                'year':product.year,
                'mileage':product.mileage,
                'selling_price':product.selling_price,
                'base_price':product.base_price,
            })
        
        return json.dumps(values)

    @http.route('''/product/<int:id>''', type='http', auth="public",db='finalyear')
    def proudct_detail(self, id, **kwargs):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Product = env['product']
        products = Product.sudo().search([
            '&',
            ('id', '=', id),
            ('status', '=', True), 
        ])

        values = []
        for product in products:
            img_b64 = ""
            if product.image:
                im_b64 = base64.b64encode(product.image).decode("utf8")
            else:
                im_b64 = "no image"
            values.append({
                'id': product.id,
                'category': product.category_id.name,
                'vendor_id': product.vendor_id.name,
                'brand_id':product.brand_id.name,
                'car_model_id':product.car_model_id.name,
                'description': product.description,
                'image': im_b64,
                'image2': 'no image',
                'image3': 'no_image',
                'transmission': product.transmission,
                'year':product.year.year,
                'mileage':product.mileage,
                'selling_price':product.selling_price,
                'base_price':product.base_price,
            })
        
        return json.dumps(values)

#----------------BRAND URLS---------------------#
    @http.route('/brands/all', type='http', auth="public", db='finalyear')
    def get_brands(self, **post):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Brand = env['brand']
        brands = Brand.sudo().search([])
        values = []
        for brand in brands:
            img_b64 = ""
            if brand.brand_logo:
                im_b64 = base64.b64encode(brand.brand_logo).decode("utf8")
            else:
                im_b64 = "no image"
            values.append({
                'id': brand.id,
                'category': brand.name,
                'logo': im_b64,
                
            })
        
        return json.dumps(values)

    @http.route('''/brand/<int:id>''', type='http', auth="public",db='finalyear')
    def brand_products(self, id, **kwargs):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Product = env['product']

        products = Product.sudo().search([
             ('brand_id','=',id)
        ])
        
        values = []
        for product in products:
            img_b64 = ""
            if product.image:
                im_b64 = base64.b64encode(product.image).decode("utf8")
            else:
                im_b64 = "no image"
            values.append({
                'id': product.id,
                'category': product.category_id.name,
                'vendor_id': product.vendor_id.name,
                'brand_id':product.brand_id.name,
                'car_model_id':product.car_model_id.name,
                'description': product.description,
                'image': im_b64,
                'image2': 'no image',
                'image3': 'no_image',
                'transmission': product.transmission,
                'year':product.year.year,
                'mileage':product.mileage,
                'selling_price':product.selling_price,
                'base_price':product.base_price,
            })
        
        return json.dumps(values)


#----------------CATEGORY URLS---------------------#
    @http.route('/categories/all', type='http', auth="public", db='finalyear')
    def get_categories(self, **post):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Category = env['category']
        categories = Category.sudo().search([])
        values = []
        for category in categories:
            values.append({
                'id': category.id,
                'category': category.name,
            })
        
        return json.dumps(values)

    @http.route('''/category/<int:id>''', type='http', auth="public",db='finalyear')
    def category_products(self, id, **kwargs):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Product = env['product']

        products = Product.sudo().search([
             ('category_id','=',id)
        ])
        
        values = []
        for product in products:
            img_b64 = ""
            if product.image:
                im_b64 = base64.b64encode(product.image).decode("utf8")
            else:
                im_b64 = "no image"
            values.append({
                'id': product.id,
                'category': product.category_id.name,
                'vendor_id': product.vendor_id.name,
                'brand_id':product.brand_id.name,
                'car_model_id':product.car_model_id.name,
                'description': product.description,
                'image': im_b64,
                'image2': 'no image',
                'image3': 'no_image',
                'transmission': product.transmission,
                'year':product.year.year,
                'mileage':product.mileage,
                'selling_price':product.selling_price,
                'base_price':product.base_price,
            })
        
        return json.dumps(values)

#----------------ORDER URLS---------------------#
    @http.route("/post/order", type='http', auth="user", website=True, csrf=True)
    def post_order(self, **kw):
        env = request.env(context=dict(request.env.context, show_address=True, no_tag_br=True))
        Order = env['order']

        vals = {
            
        }
        order = Order.sudo().create(vals)
        if order:
            return json.dumps({"submitted":"success"})
        else:
            return json.dumps({"submitted":"failed"})

