IMOI.Views.Infoheader = Marionette.ItemView.extend({
    tagName    : 'div id=infoheader',

    initialize: function (options) {
        _utils.d('IMOI.Views.Infoheader.initialize');
        var options = options || {
            title : ''
        };

        this.template = Marionette.TemplateCache.get( 'infoheader-view' );
        this.$el.html( _.template( this.template(options) ));
    },

    updatePageName: function( name ){
        this.$el.html( _.template( this.template({title: name}) ));
    },

    render: function () {
        return this;
    }
});
Cocktail.mixin( IMOI.Views.Infoheader, IMOI.Mixins.common );
