/*global  $, IMOI, Backbone*/
'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Models.Servico = Backbone.Model.extend({
  defaults: {
    'poid' : '',
    'login': '',
    'billsInfos': []
  },
  initialize: function() {
    console.log('IMOI.Models.User initialize');
  },
  addOnChange: function() {
    this.on('change', function() {
      console.log('Object for this model has changed.');
    });
  }
});

IMOI.Collections.Servico = Backbone.Collection.extend({
  model: IMOI.Models.Servico,
  initialize: function() {
    this.parse(IMOI.USER_DATA);
  },
  parse : function(response){
    for ( var i in response.billsInfos ) {
      this.models.push( new this.model(response.billsInfos[i]) );
    }
  }
});






