# -*- coding: utf-8 -*-
from odoo import fields, models, api
from odoo.exceptions import ValidationError
from datetime import datetime

class Product(models.Model):
    _name = 'product'
    _description = 'Product'
    _order = 'brand_id,car_model_id, vendor_id asc'
    
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

    category_id = fields.Many2one('category', string = 'Category', required="true")
    vendor_id = fields.Many2one('res.users', string = 'Vendor', required="true")
    brand_id = fields.Many2one('brand', string = 'Brand', required="true")
    car_model_id = fields.Many2one('car.model', string = 'Model', required="true")
    
    description = fields.Text('Description')
    image =  fields.Image("Image", required="true")
    image2 =  fields.Image("Image 2")
    image3 =  fields.Image("Image 3")
    transmission = fields.Selection(
        selection=[
                ("manual", "Manual"),
                ("automatic", "Automatic"),
            ],
        string="Transmission",
        default="automatic",
         required="true"
    )
    fuel = fields.Selection(
        selection=[
                ("petrol", "Petrol"),
                ("diesel", "Diesel"),
            ],
        string="Fuel",
        default="petrol",
        required="true"
    )

    offer_type = fields.Selection(
        selection=[
                ("used", "Used"),
                ("new", "New"),
            ],
        string="Offer Type",
        default="new", required="true"
    )
    
    year = fields.Selection(
        selection=[
            ("2022","2022"),
            ("2021","2021"),
            ("2020","2020"),
            ("2019","2019"),
            ("2019","2019"),
            ("2018","2018"),
            ("2017","2017"),
            ("2016","2016"),
            ("2015","2015"),
            ("2014","2014"),
            ("2013","2013"),
            ("2012","2012"),
            ("2011","2011"),
            ("2010","2010"),
            ("2009","2009"),
            ("2008","2008"),
            ("2007","2007"),
            ("2006","2006"),
            ("2005","2005"),
            ("2004","2004"),
            ("2003","2003"),
            ("2002","2002"),
            ("2001","2001"),
            ("2000","2000"),
            ("1999","1999"),
            ("1998","1998"),
            ("1997","1997"),
            ("1996","1996"),
            ("1995","1995"),
            ("1994","1994"),
            ("1993","1993"),
            ("1992","1992"),
        ],
        string="Estimated Year of Completion"
    )

    mileage = fields.Integer(default=0, required="true")
    hp = fields.Integer('Horsepower',default=0, required="true")
    status = fields.Boolean(default=False)
    scraped = fields.Boolean(default=False)
    
    predicted_price = fields.Integer('Predicted Price', readonly=True,store=True)
    selling_price = fields.Integer(default=1000000)
    @api.constrains('selling_price')
    def _check_selling(self):    
        if self.selling_price < 1000000 and self.status == True:
            raise ValidationError('Please enter a selling price greater than 1,000,000')
        elif self.selling_price <= self.base_price and self.status == True:
            raise ValidationError('Selling price(Display Price) must be greater than base price for negotiator to work')
    
    base_price = fields.Integer(default=1000000)
    @api.constrains('base_price')
    def _check_base(self):    
        if self.base_price < 1000000 and self.status == True:
            raise ValidationError('Please enter a base price greater than 1,000,000')

    profit = fields.Char(default="0%", compute="compute_profit")
    
    @api.depends('selling_price','base_price')
    def compute_profit(self):
        for rec in self:
            if rec.selling_price > 0 and rec.base_price > 0:
                profit = ((rec.selling_price - rec.base_price) / rec.base_price) * 100
                rec.profit = str(round(profit,0)) + "%"
            else:
                rec.profit = '0%'
    

    def predict_price(self):
        Predictor = self.env['predictor']
        price_returned = Predictor.predict(self) # calls the predict function in class predict with car values e.g make, model
        self.write({
            'predicted_price': price_returned
        })
    
    @api.model
    def click_products(self):
        result = {
            'event':'clicked',
        }
        return result

    @api.model
    def get_product_count(self):
        product_count = self.env['product'].search_count([])
        
        records = {
            'product_count':product_count,
        }
        return  records
