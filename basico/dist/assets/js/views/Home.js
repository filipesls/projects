/*global  IMOI, Backbone, _  */

'use strict';
window.IMOI      = window.IMOI || new Marionette.Application();

IMOI.Views.Home = Marionette.ItemView.extend({

    tagName    : 'div id=home',
    templateID : 'home',
    template   : null,
    model      : 'home',

    initialize: function (options) {
        this.options = options || {};

        this.loadTemplate( this.templateID );

        // this.model.bind('change', _.bind(this.render, this));
        // this.model.on('change', this.render);
    },

    setTemplate: function( options ){

        this.template      = Marionette.TemplateCache.get( this.templateID );
        // this.template_item = Marionette.TemplateCache.get( 'aviso' );

        this.template = Marionette.TemplateCache.get( this.templateID );

        var options = options || {
        };

        // var content = _.template( this.template( this.model.attributes ) );
        var content = _.template( this.template( options ) );

        this.$el.html( content );
    },

    events: {
        // 'click button#doit'     : 'doThatThingYouDo'
    },

    getList: function(){},
    getItem: function(){},
    openItem: function(){},
    dismiss:  function(){},
    refresh:  function(){},

    doThatThingYouDo: function(){
        // this.model.set({name: 'me'});
        // IMOI.i.router.navigate('ueba/barra/whatever/')
    },

    render: function () {
        return this;
    }
});

Cocktail.mixin( IMOI.Views.Home, IMOI.Mixins.common );
