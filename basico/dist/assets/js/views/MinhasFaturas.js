'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.MinhasFaturas = Marionette.ItemView.extend({

    pageName   : 'Minhas Faturas',
    tagName    : 'div id=minhas-faturas',
    templateID : 'minhas-faturas',
	template   : null,
    model      : 'minhas-faturas',

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
Cocktail.mixin( IMOI.Views.MinhasFaturas, IMOI.Mixins.common );
