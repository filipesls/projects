Marionette.ModuleHelper = (function(Marionette, _) {
    'use strict';

    var moduleHelper = {};

    moduleHelper.templatePath = 'templates/';
    moduleHelper.templateExt = '.html';
    moduleHelper.templatePrefix = '';

    moduleHelper.loadModuleTemplates = function (module, callback) {
        // walk the views in the provided module
        // gather the templates used by each view
        // then preload them all
        // when done, call the callback
        moduleHelper.templatePath = module.templatePath;
        moduleHelper.templatePrefix = module.prefix;

        var templatesToLoad = [];
        for (var viewName in module.views) {
            var view = module.views[viewName];
            templatesToLoad.push(view.prototype.template);
        }
        var loadingTemplates = moduleHelper.preloadTemplates(templatesToLoad, module);
        $.when(loadingTemplates).done(callback);
    };

    moduleHelper.preloadTemplates = function (templateIds, context) {
        // given a list of templateIds, queue each one for preloading
        // returns a jquery promise object which is resolved when all complete
        var loadAllTemplates = $.Deferred();
        var loadTemplatePromises = [];

        // queue each template for loading
        _.each(templateIds, function (templateId, index) {
            loadTemplatePromises[index] = moduleHelper
                .preloadTemplate(templateIds[index], moduleHelper);
        });

        // count down to 0 as templates are loaded, then resolve
        var templatesRemainingToLoad = loadTemplatePromises.length;
        _.each(loadTemplatePromises, function (aLoadPromise) {
            $.when(aLoadPromise).done(function () {
                templatesRemainingToLoad--;
                if (templatesRemainingToLoad == 0) {
                    loadAllTemplates.resolveWith(context);
                }
            });
        });

        return loadAllTemplates;
    };

    moduleHelper.preloadTemplatesFromOneSingleFile = function(templateFile, context) {
        // preload a single template
        // returns a jquery promise
        var loader = $.Deferred();
        var msg;
        var err;

        if (!templateFile || templateFile.length == 0) {
            err = new Error('No templateId was specified.');
            err.name = 'NoTemplateSpecified';
            throw err;
        }

        var url = moduleHelper.templatePath + templateFile + moduleHelper.templateExt;

        $.get(url, function(serverTemplate) {
            if (!serverTemplate || serverTemplate.length == 0) {
                msg = 'Could not find template: ' + templateFile + '';
                err = new Error(msg);
                err.name = 'NoTemplateError';
                throw err;
            }

            var loadedIDs = [];

            $.each($(serverTemplate), function(index, val) {
                var $obj    = $(this);
                var type    = $obj.attr('type');
                var tagName = String($obj.prop('tagName')).toLowerCase();
                var id      = $obj.attr('id');

                if (( type === 'text/template') && (tagName === 'script') && (id !== undefined)) {
                    moduleHelper.storeTemplate(id, $obj.html() );
                    loadedIDs.push(id);
                }
            });

            loader.resolveWith(context, [loadedIDs] );
        });
        return loader;
    };

    moduleHelper.preloadTemplate = function(templateId, context) {
        // preload a single template
        // returns a jquery promise
        var loader = $.Deferred();
        var msg;
        var err;

        if (!templateId || templateId.length == 0) {
            err = new Error('No templateId was specified.');
            err.name = 'NoTemplateSpecified';
            throw err;
        }

        var url = moduleHelper.templatePath + templateId + moduleHelper.templateExt;

        $.get(url, function(serverTemplate) {
            if (!serverTemplate || serverTemplate.length == 0) {
                msg = 'Could not find template: ' + templateId + '';
                err = new Error(msg);
                err.name = 'NoTemplateError';
                throw err;
            }

            moduleHelper.storeTemplate(templateId, serverTemplate);
            loader.resolveWith(context);

        });
        return loader;
    };


    moduleHelper.storeTemplate = function(templateId, template) {
        // compile template and store in cache
        template = Marionette.TemplateCache.prototype.compileTemplate(template);
        var cachedTemplate = new Marionette.TemplateCache(templateId);
        cachedTemplate.compiledTemplate = template;
        Marionette.TemplateCache.templateCaches[templateId] = cachedTemplate;
    };

    return moduleHelper;
})(Marionette,_);
