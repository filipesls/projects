/*global  IMOI, _utils, Backbone, _  */
// http://stackoverflow.com/questions/5527823/simplest-of-backbone-js-examples
'use strict';
window.IMOI = window.IMOI || new Marionette.Application();
IMOI.Views.MeusServicos = Marionette.ItemView.extend({
  pageName    : 'Meus Serviços',
  tagName     : 'div id=meus-servicos',
  templateID  : 'meus-servicos',
  template    : null,
  userMessage : '',
  modalDialog : $('#modal-dialog .content'),
  events: {
    'click': 'clickAlert',
    'click button.close': 'optionsClose',
    'click .install-open-tr': 'installService',
    'click .btn-mais-opcoes': 'otionsOpen',
    'click .btn-termo-uso': 'openTDU',
    'click .btn-desistir-compra': 'quitPurchase'
  },
  initialize: function() {
    _utils.d('IMOI.MeusServicos.initialize');
    //--------------  templateID, ---- Callback
    this.loadTemplate(this.templateID);
  },
  setTemplate: function() {
    this.template = Marionette.TemplateCache.get(this.templateID);
    this.tplItemServico = Marionette.TemplateCache.get('item-servico');
    this.tplBoxServicos = Marionette.TemplateCache.get('box-servicos');
    this.tplTDU = Marionette.TemplateCache.get('tdu-content-modal');

    this.on('change', this.compileTemplate);
    this.compileTemplate();
  },
  compileTemplate: function() {
    var user = new IMOI.Models.User();
    var serviceList = [];
    for (var i in this.collection.models) {
      serviceList.push(this.translateServiceStatus(this.collection.models[i]));
    }
    var userTerminals = user.get('terminals');
    var associatedPoids = userTerminals[0].associatedPoids;
    var includedServices = [];
    var anotherServices = serviceList;
    _.each(serviceList, function(service) {
      if (associatedPoids.indexOf(service.get('poid')) !== -1) {
        includedServices.push(service);
        for( var i in anotherServices ) {
          if ( anotherServices[i].get('poid') == service.get('poid') ) {
            delete anotherServices[i];
          }
        }
      }

      anotherServices = _.without(anotherServices, includedServices);
    });
    var renderedIncludedServices = this.renderServices(includedServices);
    var renderedAnotherServices = this.renderServices(anotherServices);
    var renderedBoxServicos = this.renderedBoxServices(renderedIncludedServices, renderedAnotherServices);
    var options = {
      msgAlerta: this.userMessage,
      boxServices: renderedBoxServicos,
      boxModalCancelamento: ''
    };
    var content = _.template(this.template(options));
    this.$el.html(content);
    this.render();
    this.initializeUI();

  },
  translateServiceStatus: function(service) {
    switch (service.get('status')) {
      case '10103':
        service.set('status', 'cancelado');
        break;
      case '10102':
        service.set('status', 'inativo');
        break;
      case '10100':
        service.set('status', 'ativo');
      break;
    }
    return service;
  },
  renderServices: function(services) {
    var includedServices = '';
    for (var i in services) {
      var service = services[i];
      var options = {
        'uid': _.uniqueId('srv-') ,
        'status': service.get('status'),
        'title': service.get('plans')[0].description,
        'licenca': '',
        'tduURL': service.get('plans')[0].services[0].tdu,
        'configuracoes': '',
        'caracteristicas': [],
        'dados_instalacao': []
      };

      var content = this.tplItemServico(options);
      includedServices += content;
    }
    return includedServices;
  },
  renderedBoxServices: function(renderedIncludedServices, renderedAnotherServices) {
    return this.tplBoxServicos({
      includedServices: renderedIncludedServices,
      anotherServices: renderedAnotherServices
    });
  },
  initializeUI: function() {
    this.delegateEvents();
    // $('.tooltip-oi').tooltip();
  },
  installService: function(ev) {
    $(ev.target).parents().next('.conteudo-instalar').fadeIn('slow');
  },
  otionsOpen: function(ev) {
    ev.preventDefault();
    var _uid = $(ev.target).attr('data-service');
    $('#'+_uid+' .conteudo-mais-opcoes').fadeIn('slow');
  },
  optionsClose: function(ev) {
    ev.preventDefault();
    var _uid = $(ev.target).attr('data-service');
    $('#'+_uid+' .conteudo-mais-opcoes').fadeOut('slow');
  },
  openTDU: function(ev) {
    ev.preventDefault();
    var _uid = $(ev.target).attr('data-service');
    $('#'+_uid+' #modalTermoUso').modal();
  },
  quitPurchase: function(ev) {
    $(ev.target).parents('li').fadeOut('fast');
  },
  render: function() {
    return this;
    // return;
    // this.template({
    //   boxIncludedServices: _boxIncludedServices,
    //   boxAnotherServices: 'BBBBBB'
    // });
    // var content = _.template();
    // this.$el.html(content);
    // this.initializeUI();
  }
});
Cocktail.mixin(IMOI.Views.MeusServicos, IMOI.Mixins.common);
