# -*- coding: utf-8 -*-
{
    'name': "brand",

    'summary': """
        Brand""",

    'description': """
        Changes the look and feel
    """,
    "license": "LGPL-3",
    'author': "Kolapro Technologies",
    'website': "http://www.kolapro.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '2.0',

    # any module necessary for this one to work correctly
    'depends': ['base', 'portal','web'],

    'data': [
        'views/weblayout.xml',
    ],

    "assets": {
        "web.assets_backend": [
            "/brand/static/src/js/abstract_web_client.js",
            "/brand/static/src/js/menu.js",
            ],

        "web.assets_qweb": [
            #"/brand/static/src/xml/menus.xml",
        ],
    
        "web._assets_primary_variables": [
            "/brand/static/src/scss/kolaprimaryvariables.scss",
        ],
    },
}
