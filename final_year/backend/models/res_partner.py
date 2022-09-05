from odoo.exceptions import ValidationError
from odoo import fields, models, api, _
import werkzeug.urls
import re


class Partner(models.Model):
    _inherit = "res.partner"

