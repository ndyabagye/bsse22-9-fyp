# -*- coding: utf-8 -*-
from odoo import fields, models, api

class Category(models.Model):
    _name = 'category'
    _description = 'Category'
    _order = 'name'

    name = fields.Char('Name', required=True) 
    description = fields.Text()