/*global  $, IMOI, Cocktail, Backbone, Marionette*/
'use strict';
window.IMOI = window.IMOI || new Marionette.Application();
IMOI.utils = {
    initialize: function() {
        _utils = this;
        _utils.d('IMOI.utils.initialize')
    },
    isIE: function() {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            return true;
        }
    },
    isMobile: function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    },
    d: function(c, msg) {
        msg = msg || ' ';
        (debug) && console.log(c, msg);
    },
    getParam: function(strParam) {
        var querystring = window.location.search.substring(1);
        var variables = querystring.split('&');
        for (var param = 0; param < variables.length; param++) {
            var paramName = variables[param].split('=');
            if (paramName[0] == strParam) {
                return paramName[1];
            }
        }
        return '';
    }
};
// Avoids `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// BACKBONE HACKS
// logs Backbone.sync
// var id_counter = 1;
// Backbone.sync = function(method, model) {
//     console.log('I have been passed ' + method + ' with ' + JSON.stringify(model));
//     if (method === 'create') {
//         model.set('id', id_counter++);
//     }
// };

// http://jules.boussekeyt.org/2013/backbone-functions.html
Backbone.Model.prototype._super = Backbone.View.prototype._super = Backbone.Router.prototype._super = Backbone.Collection.prototype._super = function(funcName) {
    return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
};
Backbone.Model.prototype.log = Backbone.View.prototype.log = function() {
    console.log.apply(console, ['[' + this.cid + ']'].concat([].splice.call(arguments, 0)));
};
