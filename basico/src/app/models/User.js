/*global  $, IMOI, Backbone*/
'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

// Model
IMOI.Models.User = Backbone.Model.extend({
  urlRoot: IMOI.API,
  idAttribute: 'id',
  defaults: {
    'id': '',
    'cpfCnpj': '',
    'name': '',
    'terminals': [],
    'billInfos': [],
    'accessToken': null
  },
  initialize: function() {
    console.log('IMOI.Models.User initialize');
    this.parse(IMOI.USER_DATA);
    this.addOnChange();
  },
  addOnChange: function() {
    this.on('change', function() {
      console.log('Object for this model has changed.');
    });
  },
  parse: function(data) {
    this.set({
      'id': data.id ,
      'cpfCnpj': data.cpf,
      'name': data.name,
      'terminals': data.terminals,
      'billInfos': data.billInfos
    });
  }
});
