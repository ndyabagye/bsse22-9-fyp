# -*- coding: utf-8 -*-
from odoo import fields, models, api

class Brand(models.Model):
    _name = 'brand'
    _description = 'Brand'
    _order = 'name'

    name = fields.Char('Name', required=True) 
    slug = fields.Char('Slug', required=True) 
    description = fields.Text('Description')
    brand_logo =  fields.Image("Brand Logo")

    @api.model
    def click_brands(self):
        result = {
            'event':'clicked',
        }
        return result

    @api.model
    def get_brand_count(self):
        brand_count = self.env['brand'].search_count([])
        
        records = {
            'brand_count':brand_count,
        }
        return  records


    @api.model
    def most_common_brand(self):
        brand_dict = []
        brand_labels = []
        
        
        records = { 
            'brand_labels':brand_labels,
            'brand_dict':brand_dict,
        }
        return  records
