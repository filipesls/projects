/*global  IMOI, DEV  */
'use strict';
window.IMOI = window.IMOI || new Marionette.Application();
IMOI.Mixins = IMOI.Mixins || {};

IMOI.Mixins.common = {
    initialize: function() {
        (!_.isUndefined(this.pageName)) && this.updateInfoHeader(); // updates header
    },
    updateInfoHeader: function() {
        IMOI.i.infoHeader.updatePageName(this.pageName);
    },
    loadTemplate: function(templateID, callback) {
        if (_.isUndefined( Marionette.TemplateCache.templateCaches[templateID] )) {
            var loadTemplate = Marionette.ModuleHelper.preloadTemplatesFromOneSingleFile(templateID, this);
            $.when(loadTemplate).done(function(loadedIDs) {
                // _.each( loadedIDs, function(id){
                //   console.log(id); // each <script id> inside the template HTML
                // });
                this.setTemplate();
                (typeof callback == 'function') && callback();
            });
        } else {
            this.setTemplate();
            (typeof callback == 'function') && callback();
        }
    }
};
// add like this
// Cocktail.mixin( IMOI.Views.MeusServicos, IMOI.Mixins.common );
