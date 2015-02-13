'use strict';
window.IMOI      = window.IMOI || new Marionette.Application();

IMOI.Routes = Backbone.Marionette.AppRouter.extend({

    appRoutes: {
        ''                            : 'addView_home',               // #
        '!/'                          : 'addView_home',               // #!/
        '!/meus-servicos'             : 'addView_meusServicos',       // #!/meus-servicos
        '!/meus-avisos'               : 'addView_meusAvisos',         // #!/meus-avisos
        '!/minhas-faturas'            : 'addView_minhasFaturas',      // #!/minhas-faturas
        '!/loja'                      : 'addView_solucoesPraVoce',    // #!/loja
        '!/loja/:categoria/:pagina'   : 'addView_solucoesInterna',    // #!/loja
        '!/ajuda'                     : 'addView_ajuda',              // #!/ajuda
        '!/modals'                    : 'addView_modals',             // #!/modals
        '!/carrinho'                  : 'addView_carrinho',           // #!/carrinho
        '!/503'                       : 'addView_503',                // #!/503
        '*other'                      : 'defaultRoute'                // #!/
    },

    initialize: function (options) {
        _utils.d('IMOI.Controllers.router.init');
    }
});
