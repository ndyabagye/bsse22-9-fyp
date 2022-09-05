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