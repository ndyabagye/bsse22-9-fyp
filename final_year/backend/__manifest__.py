{
    'name': 'Auto Car',

    'summary': """
        Final Year Auto car
    """,

    'description': """
        Final Year Auto car
    """,

    'author': 'Final Year',
    'category': 'Productivity',
    'license': 'AGPL-3',
    'version': '0.2',
    
    'depends': ['base','brand','web_responsive'],
    'data': [
        
        "data/order_data.xml",

        #--------security files--------#
        'security/security.xml',
        'security/security_record_rules.xml',
        'security/ir.model.access.csv',

        #--------views--------#
        'views/category.xml',
        'views/brand.xml',
        'views/car_model.xml',
        'views/product.xml',
        'views/order.xml',
        'views/dashboard.xml',
        'views/menus.xml',

    ],
    
    'images':[
    ],

    "assets": {
        "web.assets_backend": [
            "/backend/static/src/css/materialdesignicons.min.css",
            '/backend/static/src/css/layout.css',
            '/backend/static/src/js/new_cep_backend.js',
            '/backend/static/src/scss/common.scss',
            '/backend/static/src/js/tooltip.js',
            
        ],

        "web.assets_qweb": [
            '/backend/static/src/xml/cep_new_dashboard.xml',
        ],
    },
    
}
