'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.SolucoesPraVoce = Marionette.ItemView.extend({

	tagName    : 'div id=loja',
	templateID : 'solucoes-pra-voce',
	pageName   : 'Soluções pra Você',
	template   : null,

	// src_template: 'templates/solucoes-pra-voce.html',
	// src_template_item: 'templates/solucoes-pra-voce/item.html',
	// src_template_item_destaque: 'templates/solucoes-pra-voce/item-destaque.html',

	// tpl_item: null,
	// tpl_item_destaque: null,

	bg_colors: ['roxo', 'verde', 'laranja'],

	itens: [
		{
			category: 'Segurança',
			title: 'Segurança Multidispositivo - 3 licenças',
			description: 'Muito mais do que um Antivírus. Proteção completa para computadores Windows, Macs, tablets e smartphones.',
			image: 'assets/img/multidispositivo-420x125.png',
			ammount: '19,90',
			link: '#!/loja/seguranca/multidispositivo',
		},
		{
			category: 'Segurança',
			title: 'Proteção da Família',
			description: 'Acompanhe em tempo real as atividades dos seus filhos na internet.',
			image: 'assets/img/protecao-da-familia-185x100.png',
			ammount: '11,90',
			link: '#!/loja/seguranca/protecao-da-familia',
		},
		{
			category: 'Suporte',
			title: 'Suporte Remoto',
			description: 'Uma equipe pronta para manter seu computador funcionando e tirar suas dúvidas sobre informática, 24 horas por dia.',
			image: 'assets/img/suporte-remoto-185x100.png',
			ammount: '9,90',
			link: '#!/loja/suporte/remoto',
		},
		{
			category: 'Suporte',
			title: 'Suporte Multidispositivos',
			description: 'Solucione os problemas do seu computador, celular, smartphone ou tablet.',
			image: 'assets/img/suporte-multidispositivo-185x100.png',
			ammount: '14,90',
			link: '#!/loja/suporte/multidispositivo',
		},
		{
			category: 'Educação',
			title: 'Educa Plus',
			description: 'Reforce seus estudos! Confira a melhor opção em educação online do Ensino infantil ao pré-vestibular.',
			image: 'assets/img/educa-plus-185x100.png',
			ammount: '12,90',
			link: '#!/loja/educacao/educa',
		},
		{
			category: 'Educação',
			title: 'Inglês',
			description: 'Aprenda Inglês do seu jeito, de forma dinâmica e interativa para dominar o idioma mais usado do mundo.',
			image: 'assets/img/ingles-185x100.png',
			ammount: '29,90',
			link: '#!/loja/educacao/ingles',
		},
		{
			category: 'Diversão',
			title: 'Cartoon',
			description: 'Seus desenhos favoritos do Cartoon Network disponíveis online e a qualquer hora.',
			image: 'assets/img/cartoon-185x100.png',
			ammount: '9,90',
			link: '#!/loja/diversao/cartoon',
		}
	],


	initialize: function () {
		this.loadTemplate( this.templateID );
	},

	setTemplate: function(){

        this.template               = Marionette.TemplateCache.get( this.templateID );
        this.template_item          = Marionette.TemplateCache.get( 'item-solucoes-pra-voce' );
        this.template_item_destaque = Marionette.TemplateCache.get( 'item-destaque-solucoes-pra-voce' );

		var solucoesHtml = '';

		var color_index = 1;
		for ( var i in this.itens ) {

			// Sorteio de cores para os itens da lista
			this.itens[i].color = this.bg_colors[color_index];
			if ( color_index == 2 ) {
				this.bg_colors.unshift(this.bg_colors[2]);
				this.bg_colors.pop();
				color_index = 0;
			} else {
				color_index++;
			}

			if ( i == 0 ) {
				solucoesHtml += this.template_item_destaque((this.itens[i])) ;
			} else {
				solucoesHtml += this.template_item((this.itens[i])) ;
			}
		}

		var renderedOptions = {
			'conteudoSolucoes' : solucoesHtml
		}

		var content	= _.template( this.template( renderedOptions ) );
		this.$el.html( content );
	},

	render: function () {
		return this;
	}
});

Cocktail.mixin( IMOI.Views.SolucoesPraVoce, IMOI.Mixins.common );
