# -*- coding: utf-8 -*-
from odoo import fields, models, api
from odoo.exceptions import ValidationError
from datetime import datetime
import requests
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta

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

    category_id = fields.Many2one('category', string = 'Category')
    vendor_id = fields.Many2one(related='create_uid', string = 'Vendor')
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
        default="petrol"
    )

    offer_type = fields.Selection(
        selection=[
                ("used", "Used"),
                ("new", "New"),
            ],
        string="Offer Type",
        default="new",
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

    mileage = fields.Integer(default=0)
    hp = fields.Integer('Horsepower',default=0)
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

    def scrape_price(self):
        url = 'http://localhost:8000/scraper/scrape'
        data = {
            "make": self.brand_id.name.lower(),
            "car_model": self.car_model_id.name.lower(),
            "year": str(self.year)     
        }
        value = requests.post(url, data=data)
        scraped_lines = self.env["scraped.price.line"]
        value = json.loads(value.content)
        for i in value['data']:
            line = {
                'source':i['source'],
                'price': int(i['price']),
                'number_scraped':int(i['number_scraped']),
                'product_id':self.id,
            }
            line_result = scraped_lines.sudo().create(line)
        
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

    scraped_price_lines_ids = fields.One2many(
        'scraped.price.line', 
        'product_id',
        string='Scraped Price Line'
    )

    x_css = fields.Html(
        sanitize=False,
        compute='_compute_css',
        store=False,
    )

    def _compute_css(self):
        for rec in self:
            # To Remove Edit Option
            if rec.scraped == True :            
                rec.x_css ='<style>.o_form_button_edit {display: none !important;}</style>'
            else:
                rec.x_css = False

    @api.model
    def get_products_by_month(self):
        products_dict = []
        products_labels = []
        current_date = datetime.now()
        y = 1
        products_labels.append(current_date.strftime("%b - %y"))
        productsnumber = self.env['product'].search_count([
                    ('create_date', '>=', current_date.strftime('%Y-%m-01')),
                    ('create_date', '<', (current_date + relativedelta(months=1)).strftime('%Y-%m-01'))
                ])
        
        products_dict.append(productsnumber)        
        
        while y <= 4:
            date2 =  current_date - relativedelta(months=y)
            products_labels.append(date2.strftime("%b - %y"))
            productsnumber = self.env['product'].search_count([
                    ('create_date', '>=', date2.strftime('%Y-%m-01')),
                    ('create_date', '<', (date2 + relativedelta(months=1)).strftime('%Y-%m-01')),
            ])
            products_dict.append(productsnumber)
            y = y+1
        products_dict.reverse()
        products_labels.reverse()
        
        records = { 
            'products_labels':products_labels,
            'products_dict':products_dict,
        }
        return  records

#-----------observed price lines model----------#
class ScrapedPriceLines(models.Model):
    _name = 'scraped.price.line'
    _description = 'Scraped Price Lines'
    _order = "create_date desc"
    product_id = fields.Many2one(
        'product', 
        string='Product', 
        ondelete="cascade"
    )
    source = fields.Char('Source')    
    price = fields.Integer('Scraped Price')
    number_scraped = fields.Integer("Number of cars")
    

    