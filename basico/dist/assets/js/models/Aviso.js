'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Models.Aviso = Backbone.Model.extend({
    defaults: {
      'id'           : 0,
      'poid'         : '',
      'cpfCnpj'      : '',
      'message'      : '',
      'link'         : '',
      'registryDate' : 0,
      'read'         : false
    },

    initialize: function() {
        this.addOnChange();
    },

    addOnChange: function() {
        this.on('change:status', function(){
            var status = model.get('id');
            console.log('id value for this model has changed.');
        });
    }
});

var PageableCollection = Backbone.PageableCollection;

IMOI.Collections.Avisos = Backbone.Collection.extend({
    model : IMOI.Models.Aviso,
    url   : IMOI.API_NOTIFICATION,

    initialize: function(){
    },

    parse : function(response){
        for (var i = 0; i < response.length; i++) {
            this.models.push( new this.model(response[i]) );
        }
    },

    fetch: function(){
        return Backbone.Collection.prototype.fetch.call(this, {
            success : this.fetchSuccess,
            error   : this.fetchError
        });
    },

    fetchSuccess: function (collection, response) {
        _utils.d('IMOI.Collections.Avisos fetch success');
    },

    fetchError: function (collection, response) {
        throw new Error('IMOI.Collections.Avisos fetch error');
    }

});

