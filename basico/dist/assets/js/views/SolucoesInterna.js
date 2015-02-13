'use strict';
window.IMOI = window.IMOI || new Marionette.Application();

IMOI.Views.SolucoesInterna = Marionette.ItemView.extend({

	src_template: 'templates/solucoes-pra-voce-internas.html',
	src_template_item_destaque_interna: 'templates/solucoes-pra-voce/item-destaque-interna.html',
	src_template_principais_vantagens: 'templates/solucoes-pra-voce/principais-vantagens.html',
	//src_template_banner_conheca_tambem: 'templates/solucoes-pra-voce/banner-conheca-tambem.html',

	template: null,
	tpl_item_destaque_interna: null,
	tpl_principais_vantagens: null,
	//tpl_banner_conheca_tambem: null,

	itens: {
		'seguranca':{
			'multidispositivo': {
				title: 'Segurança Multidispositivo',
				description: 'Muito mais do que um simples Antivírus. Proteção completa para computadores, Macs, tablets e smartphones. Segurança contra vírus, programas indesejados e spams. Conecte-se, compre e interaja on-line, em qualquer um dos seus dispositivos com tranquilidade.',
				ammount: '19,90',
				itens: [
						'Gerencia de forma simples e centralizada todos os dispositivos pela nuvem',
						'Identifica e remove vírus e outras ameaças digitais dos seus dispositivos',
						'Protege informações pessoais e ajuda na localização de Tablets e smartphones em caso de perda ou roubo',
						'Armazena arquivos de tablets e smartphones e transfere para outro aparelho em caso de necessidade',

				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/multidispositivo.png',
					'vantagens': 'assets/img/multidispositivo-menor.png'
				}
			},
			'protecao-da-familia': {
				title: 'Proteção da Família',
				description: 'Garanta que seus filhos explorem tudo que a Internet pode oferecer de maneira segura. O Proteção da Família permite que você controle o acesso na web sem interferir na liberdade deles.',
				ammount: '11,90',
				itens: [
					'Saiba remotamente o que seus filhos estão fazendo na internet;',
					'Gerencia quanto tempo seus filhos ficam na Internet;',
					'Monitora e registra conversas de mensagens instantâneas;',
					'Impede o acesso a sites e aplicativos inadequados para a idade;',
					'Permite o bloqueio de conteúdos inadequados por meio de palavras-chave;',
					'Impede que informações pessoais sejam compartilhadas sem a sua autorização.'
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/protecao-da-familia.png',
					'vantagens': 'assets/img/protecao-da-familia-menor.png'
				}
			}
		},
		'suporte':{
			'remoto': {
				title: 'Suporte Remoto',
				description: 'Agora você não precisa mais chamar a ajuda do vizinho, dos filhos ou daquele amigo que sabe tudo de informática. Quando tiver algum problema com seu computador, fale com os técnicos do Suporte Computador.',
				ammount: '9,90',
				itens: [
					'Atendimento feito por especialistas em informática 24horas, 7 dias da semana;',
					'Ajuda na instalação de impressoras, câmeras, scanners, e etc.;',
					'Apoio na configuração do Pacote Office (versão original), Outlook e serviços Oi;',
					'Suporte na configuração de rede wifi ou problemas técnicos com sua internet.'
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/suporte-remoto.png',
					'vantagens': 'assets/img/suporte-remoto-menor.png'
				}
			},
			'multidispositivo': {
				title: 'Suporte Multidispositivo',
				description: 'Quando acontecer algum problema com seu celular, smartphone, tablet e computador conte com a ajuda dos nossos técnicos e solucione seus problemas!',
				ammount: '14,90',
				itens: [
					'Atendimento feito por especialistas, 24 horas 7 dias da semana;',
					'Auxílio em até 4 aparelhos entre celulares, smartphones, tablets e computadores, com a combinação que desejar;',
					'Suporte para fazer backup dos seus aparelhos;',
					'Apoio na configuração do Pacote Office (versão original), Outlook e serviços Oi;',
					'Suporte na configuração de rede wifi ou problemas técnicos com sua internet;',
					'Configuração e orientação para envio de mensagens instantâneas SMS, MMS, ou de aplicativos;',
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/suporte-multidispositivo.png',
					'vantagens': 'assets/img/suporte-multidispositivo-menor.png'
				}
			}
		},
		'educacao':{
			'educa': {
				title: 'Educa Plus',
				description: 'Melhor reforço escolar para estudantes do Ensino Fundamental ao Médio disponível na Internet, com simulados para vestibular, ENEM e guia de profissões. Tudo isso com professores 24h, 7 dias da semana para tirar todas as dúvidas.',
				ammount: '12,90',
				itens: [
					'Toda a vida escolar coberta por atividades: do Ensino Fundamental ao Médio;',
					'Simulados para ajudar na preparação para ENEM e Vestibular;',
					'Professores qualificados e disponíveis 24h por dia, 7 dias da semana;',
					'Reforço escolar para todas as matérias e conteúdo atualizado constantemente;',
					'Jogos educativos e atividades que deixam o aprendizado mais interessante.'
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/educa-plus.png',
					'vantagens': 'assets/img/educa-plus-menor.png'
				}
			},
			'ingles': {
				title: 'Inglês',
				description: 'Aprenda inglês do seu jeito! Jogos interativos, temas do seu interesse e a possibilidade de consultar professores nativos fazem deste curso a melhor opção para quem quer dominar o idioma.',
				ammount: '29,90',
				itens: [
					'Inglês para todos os níveis: do iniciante ao fluente;',
					'Você faz um teste para avaliar seu nível e em qual módulo pode iniciar o curso;',
					'Aprendizado personalizado - você pode montar a sua agenda e escolher os temas de sua preferência quando quiser;',
					'Jogos educativos, aulas temáticas e professores nativos para consulta;',
					'Testes para avaliar a evolução do seu aprendizado;',
					'Certificado a cada módulo finalizado.'
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/ingles.png',
					'vantagens': 'assets/img/ingles-menor.png'
				}
			}
		},
		'diversao':{
			'cartoon': {
				title: 'Cartoon',
				description: 'Os desenhos preferidos da galera do Cartoon Network disponíveis na Internet. Seus filhos podem montar sua própria programação com os personagens que mais gosta, e assisti-los quando, onde e quantas vezes quiser.',
				ammount: '9,90',
				itens: [
					'20 episódios novos todos os meses;',
					'Converse com outros fãs no nosso fórum. Fãs de Ben 10, As Meninas Superpoderosas, Laboratório de Dexter, Johhny Bravo e vários se divertem por aqui;',
					'Disponíveis também episódios que não são mais transmitidos na TV;',
					'Acesso ilimitado aos desenhos disponíveis.'
				],
				icoTick: 'assets/img/ico-tick.png',
				imagens: {
					'descricao': 'assets/img/cartoon.png',
					'vantagens': 'assets/img/cartoon-menor.png'
				}
			}
		}
	},

	initialize: function (categoria, pagina) {
		this.template = IMOI.utils.loadTemplate( this.src_template );
		this.tpl_item_destaque_interna = IMOI.utils.loadTemplate( this.src_template_item_destaque_interna );
		this.tpl_principais_vantagens = IMOI.utils.loadTemplate( this.src_template_principais_vantagens );
		//this.tpl_banner_conheca_tambem = IMOI.utils.loadTemplate( this.src_template_banner_conheca_tambem );

		var item = this.itens[categoria][pagina];
		this.render(item);
	},

	render: function (item) {
		var content_global = _.template(this.template);
		var content_item_destaque_interna = _.template(this.tpl_item_destaque_interna);
		var content_principais_vantagens = _.template(this.tpl_principais_vantagens);
		//var content_banner_conheca_tambem = _.template(this.tpl_banner_conheca_tambem);

		var destaqueInternas = content_item_destaque_interna(item);
		var principaisVantagens = content_principais_vantagens(item);
		//var bannerConhecaTambem = content_banner_conheca_tambem(item);

		var renderedHtml = content_global({
			'destaqueInternas': destaqueInternas,
			'principaisVantagens': principaisVantagens,
			//'bannerConhecaTambem': bannerConhecaTambem
		});
		this.$el.html( renderedHtml );

		// SubView: Carrinho
		this.carrinho = new IMOI.Views.Carrinho({title: ''});
	}

});

Cocktail.mixin( IMOI.Views.SolucoesInterna, IMOI.Mixins.common );
