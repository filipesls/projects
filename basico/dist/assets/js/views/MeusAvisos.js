/*global  IMOI, Backbone, _  */

'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.MeusAvisos = Marionette.ItemView.extend({

    tagName    : 'div id=meus-avisos',
    templateID : 'meus-avisos',
    pageName   : 'Meus Avisos',
    template   : null,
    avisosList : [],

    initialize: function (options) {
        this.options = options || {};
        this.loadTemplate( this.templateID );
    },

    setTemplate: function( options ){
        this.template      = Marionette.TemplateCache.get( this.templateID );
        this.template_item = Marionette.TemplateCache.get( 'aviso' );
        this.loadCollection();
    },

    loadCollection: function(){
        var promiseCollection = this.collection.fetch();
        $.when(promiseCollection).then(_.bind(this.onCollectionLoaded, this));
    },

    onCollectionLoaded: function(){
        // get array list of the models
        for (var i in this.collection.models) {
            this.avisosList.push(this.collection.models[i]);
        }
        var options = {
            mensagensAviso : this.compileAvisos( this.avisosList )
        }
        var content = _.template( this.template( options ) );
        this.$el.html( content );
        // this.listenTo(this.collection,'add', this.renderItem);
    },

    compileAvisos: function( obj ){
        var avisos = [];
        for (var i = 0; i < obj.length; i++) {
            if (!_.isUndefined(obj[i].attributes)) {
                avisos.push({
                    data     : this.parseDate(obj[i].attributes.registryDate),
                    mensagem : obj[i].attributes.message
                });
            }
        };
        return this.template_item( {'avisos' : avisos} );
    },

    parseDate: function(UNIX_timestamp) {
        var a      = new Date(UNIX_timestamp*1000);
        var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        var year   = a.getFullYear();
        // var month  = months[a.getMonth()];
        var month  = a.getMonth()+1;
        var date   = a.getDate();
        var hour   = a.getHours();
        var min    = a.getMinutes();
        var sec    = a.getSeconds();
        // var time   = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time   = date + '/' + month + '/' + year;
        return String(time);
    },

    events: {
        // 'click button#doit'     : 'doThatThingYouDo'
    },

    doThatThingYouDo: function(){
        // this.model.set({name: 'me'});
        // IMOI.i.router.navigate('ueba/barra/whatever/')
    },

    render: function () {
        return this;
    }
});
Cocktail.mixin( IMOI.Views.MeusAvisos, IMOI.Mixins.common );

