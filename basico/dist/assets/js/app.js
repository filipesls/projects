/*global  $, IMOI, Cocktail, Backbone*/

'use strict';

var _utils;
var DEV   = true;
var debug = true;

window.IMOI = window.IMOI || new Marionette.Application();

IMOI.i           = {}; // instances namespace
IMOI.Models      = {};
IMOI.Collections = {};
IMOI.Views       = {};
IMOI.Router      = {};
IMOI.Controllers = {};
IMOI.Mixins      = {};
IMOI.USER_DATA   = {};

IMOI.addInitializer(function(options) {
    (debug) && console.log('IMOI.init');
});
IMOI.on('before:start', function() {
    IMOI.utils.initialize();
});
IMOI.on('start', function(options) {
    // authenticate user here
    IMOI.i.layout  = new IMOI.Controllers.Layout();
});
IMOI.vent.bind('layout:done', function(options) {
    (debug) && console.log('IMOI:layout:done');
    IMOI.i.router = new IMOI.Routes({
        controller: new IMOI.Controllers.Router
    });
    (!Backbone.History.started) && Backbone.history.start({
        pushState: false
    });
});

$(function() {
    // Configure all ajax to send X-Auth-Token
    // $.ajaxSetup({
    //   beforeSend: function(xhr) {
    //     xhr.setRequestHeader('X-Auth-Token', IMOI.utils.getParam('q'));
    //   }
    // });
    $.get(IMOI.API, {
        q: IMOI.utils.getParam('q')
    }, function(data) {
        IMOI.USER_DATA = data;
        IMOI.start();
    });
});
