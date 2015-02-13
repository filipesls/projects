'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Models.Ajuda = Backbone.Model.extend({
    defaults: {
        name: 'Anonymous'
    },

    initialize: function() {
        console.log('IMOI.Models.Ajuda initialize');
        this.addOnChange();
    },

    addOnChange: function() {
        this.on('change:name', function(){
            console.log('Name value for this model has changed.');
        });
    }
});


