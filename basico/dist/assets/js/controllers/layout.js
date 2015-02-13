/*global  $, IMOI, Cocktail, Backbone, Marionette, _utils */

'use strict';
window.IMOI      = window.IMOI || new Marionette.Application();

IMOI.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize:function (options) {
        _utils.d('IMOI.Controllers.Layout.init');
        this.initLayout();
        this.preloadEssentialTemplates();
        IMOI.vent.bind('essential-templates-preload:done', this.onDoneEssentialTemplatesPreload );
    },

    initLayout: function(){
        IMOI.addRegions({
            devRegion     : '#dev',
            loadingRegion : '#loading',
            headerRegion  : '#header',
            contentRegion : '#wrapper'
        });

        (DEV) && $('body').addClass('dev');
    },

    preloadEssentialTemplates: function(){
        // var preloading = Marionette.ModuleHelper.preloadTemplates( IMOI.templates.preload, this );
        var preloading = Marionette.ModuleHelper.preloadTemplatesFromOneSingleFile( 'essential', this );
        var that = this;
        $.when(preloading).done( function(){
            IMOI.vent.trigger('essential-templates-preload:done', that);
        });
    },

    onDoneEssentialTemplatesPreload: function(scope){

        // adds header
        IMOI.i.infoHeader = new IMOI.Views.Infoheader();
        IMOI.headerRegion.show( IMOI.i.infoHeader );

        if (DEV) scope.addDevHelper();
        else IMOI.vent.trigger('layout:done');
    },

    addDevHelper: function() {
        _utils.d('IMOI.Controllers.Layout.addDevHelper');

        IMOI.i.devHelperView = new Marionette.LayoutView({
            template: Marionette.TemplateCache.get( 'devhelper-view' ),
            regions: {
                navbarholder: '#navbar-holder',
                iframeholder: '#iframe-holder'
            }
        });
        IMOI.i.devHelperView.render();
        IMOI.devRegion.show( IMOI.i.devHelperView );
        IMOI.i.devHelperView.navbarholder.show( new IMOI.Views.Navbar() );
        IMOI.i.devHelperView.iframeholder.show( new IMOI.Views.Iframe() );
        IMOI.i.devHelperView.addRegion('iframe', '.iframe-emulator');

        IMOI.vent.trigger('layout:done');
    }
});
