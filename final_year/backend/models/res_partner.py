from odoo.exceptions import ValidationError
from odoo import fields, models, api, _
import werkzeug.urls
import re


class Partner(models.Model):
    _inherit = "res.partner"

    is_vendor = fields.Boolean('Is vendor')
    is_customer = fields.Boolean('Is customer')
    
    @api.model
    def click_vendors(self):
        result = {
            'event':'clicked',
        }
        return result

    @api.model
    def get_vendor_count(self):
        vendor_count = self.env['res.partner'].search_count([])
        
        records = {
            'vendor_count':vendor_count,
        }
        return  records

