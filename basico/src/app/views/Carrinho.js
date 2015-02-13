'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.Carrinho = Marionette.ItemView.extend({

	tagName    : 'div id=carrinho',
	templateID : 'carrinho',
    pageName   : 'Carrinho',
	template   : null,
    model      : 'carrinho',

	initialize: function (options) {
        this.options = options || {};

		this.loadTemplate( this.templateID );

        // this.model.bind('change', _.bind(this.render, this));
        // this.model.on('change', this.render);
	},

    setTemplate: function( options ){

        this.template = Marionette.TemplateCache.get( this.templateID );

        var options = options || {
            foo    : 'bar',
            quem   : 'eu',
            quando : 'agora',
            onde   : 'na web'
        };

        // var content = _.template( this.template( this.model.attributes ) );
        var content = _.template( this.template( options ) );
        this.$el.html( content );

        this.initializeUI();
    },

    initializeUI: function(){
        $('.tooltip-oi').tooltip();
        $('.popover-oi').popover();
    },

    events: {
        // 'click button#doit'     : 'doThatThingYouDo'
    },

    getList: function(){},
    getItem: function(){},
    openItem: function(){},

    doThatThingYouDo: function(){
        // this.model.set({name: 'me'});
        // IMOI.i.router.navigate('ueba/barra/whatever/')
    },

	render: function () {
        return this;
	}
});
Cocktail.mixin( IMOI.Views.Carrinho, IMOI.Mixins.common );
