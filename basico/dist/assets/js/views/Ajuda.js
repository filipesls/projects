'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.Ajuda = Marionette.ItemView.extend({

	tagName    : 'div id=ajuda',
	templateID : 'ajuda',
    pageName   : 'Ajuda',
	template   : null,
    model      : 'ajuda',

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
Cocktail.mixin( IMOI.Views.Ajuda, IMOI.Mixins.common );
