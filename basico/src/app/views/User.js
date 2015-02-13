/*global  IMOI, _utils, Backbone, _  */

'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.User = Marionette.ItemView.extend({

    tagName      : 'div id=user',
    className    : 'hey ho',
    id           : 'nonis',
    hash         : 'user',
    // el           : '#wrapper',
    src_template : 'templates/user.html',

    template: null,

    initialize: function (options) {
        _utils.d('IMOI.userView.initialize');
        this.options = options || {};


        // initializes again if model changes
        // this.model.bind('change', _.bind(this.render, this));
        this.model.on('change', this.render);

        this.template = (this.template === null) ? IMOI.utils.loadTemplate( this.src_template ) : this.template;
        this.render();
    },

    events: {
        'click button#opa'     : 'opa'
    },

    opa: function(){
        this.model.set({name: 'me'});
        // IMOI.i.router.navigate('ueba/barra/whatever/')
    },

    render: function () {
        var content = _.template( this.template );
        this.$el.html( content( this.model.attributes) );
        return this;
    }
});

// 71161
// sync api
//// document.getElementById('twitter-wjs').insertAdjacentHTML('beforebegin', '<div id="bookmark" style="font-size:12px;width:40px;height:20px;background:#ccc;position:fixed;right:0px;top:0px;padding:10px;">'+window.pageYOffset+'</div>');
// window.addEventListener("scroll", function(evt) {
//     document.getElementById('bookmark').innerHTML = window.pageYOffset;
// });

Cocktail.mixin( IMOI.Views.User, IMOI.Mixins.common );
