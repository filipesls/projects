/*global  IMOI, _utils, Backbone, _  */

'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.Navbar = Marionette.ItemView.extend({

    tagName    : 'div id=navbar',
    templateID : 'navbar-view',
    template   : null,

    initialize: function (options) {
        _utils.d('IMOI.Navbar.initialize');
        this.options = options || {};

        this.template = Marionette.TemplateCache.get( this.templateID );
        this.$el.html( _.template(this.template()));

        this.listenTo(this, 'show', this.updateState, this);
    },

    events: {
        'click nav ul.nav li a'     : 'updateState',
        'click button.dev-remove'   : 'hide'
    },

    hide: function(e){
        this.$el.fadeOut('fast');
    },

    updateState: function(e){
        $('nav ul.nav li a').parent('li').removeClass('active');
        setTimeout(function() {
            $('nav ul.nav li a[href*="' + window.location.hash + '"]').parent('li').addClass('active');
        }, 10);
    },
    render: function() {
    }
});
// Cocktail.mixin( IMOI.Views.Navbar, IMOI.Mixins.common );

IMOI.Views.Iframe = Marionette.ItemView.extend({
    tagName: 'div id=iframe',
    template: '<div class="iframe-emulator">iframe</div>',

    initialize: function (options) {
        _utils.d('IMOI.Views.Iframe.initialize');
        this.options = options || {};
    },

    render: function () {
        var content = _.template( this.template );
        this.$el.html( content );
        return this;
    }
});
Cocktail.mixin( IMOI.Views.Iframe, IMOI.Mixins.common );
