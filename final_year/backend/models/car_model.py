# -*- coding: utf-8 -*-
from odoo import fields, models, api

class CarModel(models.Model):
    _name = 'car.model'
    _description = 'Model'
    _order = 'name'

    name = fields.Char('Name', required=True) 
    brand_id = fields.Many2one('brand', string = 'Brand', required=True)
    description = fields.Text()