'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Models.Carrinho = Backbone.Model.extend({
    defaults: {
        title: 'carrinho'
    }
});
