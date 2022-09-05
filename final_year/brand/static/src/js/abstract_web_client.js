
odoo.define('brand.EACWebClient', function(require) {
    'use strict';

    const { Component, useState } = owl;
    const { xml } = owl.tags;
    const { patch } = require('web.utils');
    const { WebClient } = require("@web/webclient/webclient");
    
    patch(WebClient.prototype, "test_patching_my_component", {
        setup() {
            this._super();
            this.title.setParts({ zopenerp: "AUTO CAR" }); 
        }
    });  
});