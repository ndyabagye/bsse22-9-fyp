# -*- coding: utf-8 -*-
from odoo import fields, models, api

class Product(models.Model):
    _name = 'product'
    _description = 'Product'
    _order = 'name, vendor_id asc'
    
    name = fields.Char("Name", compute="product_name")
    @api.depends('brand_id','car_model_id')
    def product_name(self):
        for car in self:
            if car.brand_id:
                car.name = car.brand_id.name
            if car.car_model_id:
                car.name = car.name +'-'+car.car_model_id.name
            else:
                car.name = 'CAR'

    category_id = fields.Many2one('category', string = 'Category')
    vendor_id = fields.Many2one('res.users', string = 'Vendor')
    brand_id = fields.Many2one('brand', string = 'Brand')
    car_model_id = fields.Many2one('car.model', string = 'Model')
    
    description = fields.Text('Description')
    image =  fields.Image("Image")
    image2 =  fields.Image("Image 2")
    image3 =  fields.Image("Image 3")
    transmission = fields.Selection(
        selection=[
                ("manual", "Manual"),
                ("automatic", "Automatic"),
            ],
        string="Transmission",
        default="automatic",
    )
    fuel = fields.Selection(
        selection=[
                ("petrol", "Petrol"),
                ("diesel", "Diesel"),
            ],
        string="Fuel",
        default="petrol",
    )

    offer_type = fields.Selection(
        selection=[
                ("used", "Used"),
                ("new", "New"),
            ],
        string="Offer Type",
        default="new",
    )
    year = fields.Date("Year of Make")
    mileage = fields.Integer(default=0)
    hp = fields.Integer('Horsepower',default=0)
    status = fields.Boolean(default=False)
    
    selling_price = fields.Integer(default=0)
    base_price = fields.Integer(default=0)
    profit = fields.Integer(default=0)
    

    def predict_price(self):

        Predictor = self.env['predictor']
        price_returned = Predictor.predict(self) # calls the predict function in class predict with car values e.g make, model
        self.write({
            'selling_price': price_returned
        })
    