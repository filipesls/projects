/*global  $, IMOI, Cocktail, Backbone, Marionette, _utils */

'use strict';
window.IMOI      = window.IMOI || new Marionette.Application();

IMOI.Controllers.Router = Backbone.Marionette.Controller.extend({

    wrapper: null,

    initialize:function (options) {

        ( debug ) && console.log('IMOI.Controllers.Router.init');

        // better leave only the important stuff. it's here, for now.
        $('#loading-holder').fadeOut('fast');

        this.wrapper = ( DEV && !_.isUndefined( IMOI.i.devHelperView ) ) ? IMOI.i.devHelperView.iframe : IMOI.contentRegion;
    },

    defaultRoute: function(other){
        _utils.d('default route, trying to reach ' + other);
    },

    addView_user: function () {
        this.wrapper.show( new IMOI.Views.User() );
    },

    addView_home: function () {
        _utils.d('addView_home');
    },

    addView_carrinho: function () {
        this.wrapper.show( new IMOI.Views.Carrinho() );
    },

    addView_meusServicos: function () {
        this.wrapper.show( new IMOI.Views.MeusServicos({
            collection: new IMOI.Collections.Servico()
        }));
    },

    addView_meusAvisos: function () {
        this.wrapper.show( new IMOI.Views.MeusAvisos({
            collection: new IMOI.Collections.Avisos()
        }));
    },

    addView_minhasFaturas: function () {
        this.wrapper.show( new IMOI.Views.MinhasFaturas() );
    },

    addView_solucoesPraVoce: function () {
        this.wrapper.show( new IMOI.Views.SolucoesPraVoce() );
    },

    addView_solucoesInterna: function (categoria, pagina) {
        this.wrapper.show( new IMOI.Views.SolucoesInterna() );
    },

    addView_ajuda: function () {
        this.wrapper.show( new IMOI.Views.Ajuda() );
    },

    addView_modals: function () {
        this.wrapper.show( new IMOI.Views.Modals() );
    },
    addView_503: function () {
        this.wrapper.show( new IMOI.Views.Error503() );
    }
});
