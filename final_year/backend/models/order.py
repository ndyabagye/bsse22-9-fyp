import django.db
from pkg_resources import require
from odoo import models, fields, api

class Order(models.Model):

    _name = 'order'
    _description = 'Order'
    _order = 'code'
    
    code = fields.Char(string='Code', default="/", readonly=True)
    name = fields.Char(compute='compute_name')
    @api.depends('code')
    def compute_name(self):
        for rec in self:
            rec.name = rec.code

    name = fields.Char("Name") 
    email = fields.Char("Email")
    address = fields.Char("Address")
    phone = fields.Char("Contact") 
    product_id = fields.Many2one('product')
    vendor_id = fields.Many2one(related = "product_id.vendor_id")
    image = fields.Image(related = "product_id.image")
    
    final_price = fields.Integer(string = "Final Price", required=True)
    base_price = fields.Integer(related = "product_id.base_price")
    profit = fields.Char(default="0%", compute="compute_profit")
    
    @api.depends('final_price','base_price')
    def compute_profit(self):
        for rec in self:
            if rec.final_price > 0 and rec.base_price > 0:
                profit = ((rec.final_price - rec.base_price) / rec.base_price) * 100
                rec.profit = str(round(profit,0)) + "%"
            else:
                rec.profit = '0%'
    
    state = fields.Selection([
        ('ordered', 'Ordered'),
        ('delivered', 'Delivered'),
        ('returned', 'Returned'),   
    ],  string='State of Order', 
        readonly=True, 
        index=True, 
        copy=False, default='ordered',
    )

    def action_set_to_delivered(self):
        self.write({'state': 'delivered'})
    
    def action_set_to_returned(self):
        self.write({'state': 'returned'})

    @api.model
    def create(self, vals):
        if vals.get("code", "/") == "/":
            vals["code"] = self._prepare_order_code(vals)
        
        result = super(Order, self).create(vals)
        return result

    def _prepare_order_code(self, values):
        seq = self.env["ir.sequence"]
        return seq.next_by_code("order.sequence") or "/"

    @api.model
    def click_orders(self):
        result = {
            'event':'clicked',
        }
        return result

    @api.model
    def get_order_count(self):
        order_count = self.env['order'].search_count([])
        
        records = {
            'order_count':order_count,
        }
        return  records
