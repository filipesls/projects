'use strict';

var DEV   = (_.isUndefined(DEV)) ? false : true;
var debug = (_.isUndefined(debug)) ? false : true;

window.IMOI      = window.IMOI || new Marionette.Application();

IMOI.BASE_URL          = window.location.protocol + '//' + window.location.host + window.location.pathname;
IMOI.API_MOCKUP        = IMOI.BASE_URL + 'mockdata/data.json';
IMOI.API_NOTIFICATION  = IMOI.BASE_URL + '/notification/';
IMOI.API_NOTIFICATION  = IMOI.BASE_URL + 'mockdata/notification.json';
IMOI.API               = IMOI.API_MOCKUP;
// IMOI.API               = 'https://imoiweb.oiinternet.com.br';

