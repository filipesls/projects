var _main,
    main_debug = true;

window.APP = window.APP || {};
window.APP.main = {

    o: {
        debug           : ((main_debug === undefined) || (main_debug !== true)) ? false : true,
        url             : window.location.href
    },

    init: function() {
        _main = this;
        _main.d('init');
        _main.initForm();
    },

    limpaFormulario: function () {
        var fields = $('#formCadastroNovoUsuario').data('bootstrapValidator').getOptions().fields,
            $parent, $icon;

        for (var field in fields) {
            $parent = $('[name="' + field + '"]').parents('.form-group');
            $icon   = $parent.find('.form-control-feedback[data-bv-icon-for="' + field + '"]');
            $icon.tooltip('destroy');
        }

        // Then reset the form
        $('#formCadastroNovoUsuario').data('bootstrapValidator').resetForm();
    },

    initForm: function(){

        $("#optionsFichaPF").on('click', function(e){
            // _main.limpaFormulario();
            $('#formCadastroNovoUsuario').data('bootstrapValidator').resetForm();
            $('.li_btn_pf').addClass('active');
            $("#compra-pf").show();
            $('.li_btn_pj').removeClass('active');
            $("#compra-pj").hide();
        });
        $("#optionsFichaPJ").on('click', function(e){
            // _main.limpaFormulario();
            $('#formCadastroNovoUsuario').data('bootstrapValidator').resetForm();
            $('.li_btn_pj').addClass('active');
            $("#compra-pj").show();
            $('.li_btn_pf').removeClass('active');
            $("#compra-pf").hide();
        });




        $("input[name='selecionarEmail']").on( "click", function() {
            var radioButton = $("input[name='selecionarEmail']:checked").val();
            if (radioButton === 'usarEmailPessoal') {
                $('#formCadastroNovoUsuario .group-email-pessoal').show();
                $('#formCadastroNovoUsuario .group-email-oi').hide();
            } else {
                $('#formCadastroNovoUsuario .group-email-pessoal').hide();
                $('#formCadastroNovoUsuario .group-email-oi').show();
            };
        });
        $("input[name='selecionarEmailPJ']").on( "click", function() {
            var radioButton = $("input[name='selecionarEmailPJ']:checked").val();
            if (radioButton === 'usarEmailPessoalPJ') {
                $('#formCadastroNovoUsuario .group-email-pessoal').show();
                $('#formCadastroNovoUsuario .group-email-oi').hide();
            } else {
                $('#formCadastroNovoUsuario .group-email-pessoal').hide();
                $('#formCadastroNovoUsuario .group-email-oi').show();
            };
        });



        // initializes floatLabel
        $('input.floatlabel').floatlabel();

        // uses http://mths.be/placeholder to add placeholder for my long time aquaintance mr. IE
        $('input').placeholder();

        $('body').on('click', '.btn-group button', function (e) {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });

        // add input masking
        $('#cpf').mask('000.000.000-00');
        $('#dataNascimento').mask('00/00/0000');
        $('#ddd').mask('99');
        $('#telefone').mask('#9999-9999', {
                reverse : true
            },
            {
                translation : {
                    '#' : {
                        pattern : /[0-9]/,
                        optional : true
                    }
                }
            }
        );
        $('#cep').mask('99999-999');



        $('#cnpj').mask('99.999.999/9999-99');
        $('#dddPJ').mask('99');
        $('#telefonePJ').mask('#9999-9999', {
                reverse : true
            }, {
                translation : {
                    '#' : {
                        pattern : /[0-9]/,
                        optional : true
                    }
                }
            }
        );
        $('#cep').mask('99999-999');

        $('[data-toggle="tooltip"]').tooltip({html:true});


        $('input[name="senha"]').focusin(function() {
            $('.tooltipSenha').tooltip('show');
        }).focusout(function() {
            $('.tooltipSenha').tooltip('hide');
        }).keypress(function() {
            $('.tooltipSenha').tooltip('hide');
        });


        // Formulário PF e PJ
        $('#formCadastroNovoUsuario')
        .bootstrapValidator({
            // message: "Menssagem 1",
            // excluded: [':disabled', ':hidden', ':not(:visible)', ':not(.selectpicker)'],
            trigger: 'blur',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                document: {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'cnpj': {
                    validators: {
                        callback: {
                            message: "Inválido",
                            callback: function(value, validator, $field) {
                                var b = [6,5,4,3,2,9,8,7,6,5,4,3,2], c = value;
                                if((c = c.replace(/[^\d]/g,"").split("")).length != 14) return false;
                                for(var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
                                if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
                                for(var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
                                if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
                                return true;
                            }
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'razaoSocial': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 50,
                            message: "Deve ter entre 2 e 50 caracteres"
                        }
                    }
                },
                'nomeFantasia': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 50,
                            message: "Deve ter entre 2 e 50 caracteres"
                        }
                    }
                },
                'nomeResponsavel': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sobrenomeResponsavel': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'nome': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sobrenome': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sexo': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione pelo menos uma opção"
                        }
                    }
                },
                'dataNascimento': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        callback: {
                            message: "Inválido",
                            callback: function(value, validator) {
                                if (value === '') {
                                    return true;
                                }

                                if (value.length < 10) {
                                    return false
                                } else {
                                    if ( moment(value, 'DD-MM-YYYY').isBefore('01-01-1910', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão velho"
                                        }
                                    } else if ( moment(value, 'DD-MM-YYYY').isAfter('01-01-2010', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão novo"
                                        }
                                    } else {
                                        return {
                                            valid: moment(value, 'DD-MM-YYYY').isValid(),
                                            message: "Inválido"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'cpf': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        callback: {
                            message: "CPF Inválido",
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                CPF = $('#cpf').cleanVal();
                                // CPF = value;
                                if(!CPF){ return false;}
                                erro     = new String;
                                cpfv     = CPF;
                                if(cpfv.length == 14 || cpfv.length == 11){
                                    cpfv = cpfv.replace('.', '');
                                    cpfv = cpfv.replace('.', '');
                                    cpfv = cpfv.replace('-', '');

                                    var nonNumbers = /\D/;

                                    if( nonNumbers.test(cpfv) ){
                                        erro = "CPF Inválido";
                                    }else{
                                        if (cpfv == "00000000000" ||
                                            cpfv == "11111111111" ||
                                            cpfv == "22222222222" ||
                                            cpfv == "33333333333" ||
                                            cpfv == "44444444444" ||
                                            cpfv == "55555555555" ||
                                            cpfv == "66666666666" ||
                                            cpfv == "77777777777" ||
                                            cpfv == "88888888888" ||
                                            cpfv == "99999999999") {

                                            erro = "CPF Inválido";
                                        }
                                        var a = [];
                                        var b = new Number;
                                        var c = 11;

                                        for(i=0; i<11; i++){
                                            a[i] = cpfv.charAt(i);
                                            if (i < 9) b += (a[i] * --c);
                                        }
                                        if((x = b % 11) < 2){
                                            a[9] = 0
                                        }else{
                                            a[9] = 11-x
                                        }
                                        b = 0;
                                        c = 11;
                                        for (y=0; y<10; y++) b += (a[y] * c--);

                                        if((x = b % 11) < 2){
                                            a[10] = 0;
                                        }else{
                                            a[10] = 11-x;
                                        }
                                        if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
                                            erro = "CPF Inválido";
                                        }
                                    }
                                }else{
                                    if(cpfv.length == 0){
                                        return false;
                                    }else{
                                        erro = "CPF Inválido";
                                    }
                                }
                                if (erro.length > 0){
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                },
                'tipoTelefonePF': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'tipoTelefonePJ': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'ddd': {
                    validators: {
                        stringLength: {
                            min: 2,
                            max: 2,
                            message: "Inválido"
                        },
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'telefone': {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 10,
                            message: "Inválido"
                        },
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cep': {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 9,
                            message: "O CEP deve estar no formato XXXXX-XXX"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.endereco': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.numero': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: "Deve conter apenas números"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.bairro': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cidade': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.estado': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'emailPessoal': {
                    onSuccess: function(e, data) {
                        email = $("#emailPessoalPF").val();
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        emailendereco: {
                            message: "Inválido"
                        }
                    }
                },
                'emailOi': {
                    onSuccess: function(e, data) {
                        email = $("#emailOiPF").val()+"@oi.com.br";
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        }
                    }
                },
                'senha': {
                    onSuccess: function(e, data) {
                        $('.containerPFConfirmarSenha').show();
                        $('[name="confirmacaoSenha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 8,
                            max: 12,
                            message: "Deve ter entre 8 e 12 caracteres"
                        },
                        callback: {
                            message: 'Senha inválida',
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toLowerCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra maiúscula'
                                    }
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toUpperCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra minúscula'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/[0-9]/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um dígito'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/^[a-zA-Z0-9]+$/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Não deve conter caracter especial'
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'confirmacaoSenha': {
                    onSuccess: function(e, data) {
                        $('[name="pergunta"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        identical: {
                            field: 'senha',
                            message: 'Essas senhas não coincidem. Tente novamente.'
                        }
                    }
                },
                'pergunta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'resposta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            _main.loader.show("Estamos enviando seus dados...");
        });

/*
        // Formulário PF
        $('#formCadastroNovoUsuario')
        .bootstrapValidator({
            // message: "Menssagem 1",
            // excluded: [':disabled', ':hidden', ':not(:visible)', ':not(.selectpicker)'],
            trigger: 'blur',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                document: {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'nome': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sobrenome': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sexo': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione pelo menos uma opção"
                        }
                    }
                },
                'dataNascimento': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        callback: {
                            message: "Inválido",
                            callback: function(value, validator) {
                                if (value === '') {
                                    return true;
                                }

                                if (value.length < 10) {
                                    return false
                                } else {
                                    if ( moment(value, 'DD-MM-YYYY').isBefore('01-01-1910', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão velho"
                                        }
                                    } else if ( moment(value, 'DD-MM-YYYY').isAfter('01-01-2010', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão novo"
                                        }
                                    } else {
                                        return {
                                            valid: moment(value, 'DD-MM-YYYY').isValid(),
                                            message: "Inválido"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'cpf': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        callback: {
                            message: "CPF Inválido",
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                CPF = $('#cpf').cleanVal();
                                // CPF = value;
                                if(!CPF){ return false;}
                                erro     = new String;
                                cpfv     = CPF;
                                if(cpfv.length == 14 || cpfv.length == 11){
                                    cpfv = cpfv.replace('.', '');
                                    cpfv = cpfv.replace('.', '');
                                    cpfv = cpfv.replace('-', '');

                                    var nonNumbers = /\D/;

                                    if( nonNumbers.test(cpfv) ){
                                        erro = "CPF Inválido";
                                    }else{
                                        if (cpfv == "00000000000" ||
                                            cpfv == "11111111111" ||
                                            cpfv == "22222222222" ||
                                            cpfv == "33333333333" ||
                                            cpfv == "44444444444" ||
                                            cpfv == "55555555555" ||
                                            cpfv == "66666666666" ||
                                            cpfv == "77777777777" ||
                                            cpfv == "88888888888" ||
                                            cpfv == "99999999999") {

                                            erro = "CPF Inválido";
                                        }
                                        var a = [];
                                        var b = new Number;
                                        var c = 11;

                                        for(i=0; i<11; i++){
                                            a[i] = cpfv.charAt(i);
                                            if (i < 9) b += (a[i] * --c);
                                        }
                                        if((x = b % 11) < 2){
                                            a[9] = 0
                                        }else{
                                            a[9] = 11-x
                                        }
                                        b = 0;
                                        c = 11;
                                        for (y=0; y<10; y++) b += (a[y] * c--);

                                        if((x = b % 11) < 2){
                                            a[10] = 0;
                                        }else{
                                            a[10] = 11-x;
                                        }
                                        if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])){
                                            erro = "CPF Inválido";
                                        }
                                    }
                                }else{
                                    if(cpfv.length == 0){
                                        return false;
                                    }else{
                                        erro = "CPF Inválido";
                                    }
                                }
                                if (erro.length > 0){
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                },
                'tipoTelefonePF': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'ddd': {
                    validators: {
                        stringLength: {
                            min: 2,
                            max: 2,
                            message: "Inválido"
                        },
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'telefone': {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 10,
                            message: "Inválido"
                        },
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cep': {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 9,
                            message: "O CEP deve estar no formato XXXXX-XXX"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.endereco': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.numero': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: "Deve conter apenas números"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.bairro': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cidade': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.estado': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'emailPessoal': {
                    onSuccess: function(e, data) {
                        email = $("#emailPessoalPF").val();
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        emailendereco: {
                            message: "Inválido"
                        }
                    }
                },
                'emailOi': {
                    onSuccess: function(e, data) {
                        email = $("#emailOiPF").val()+"@oi.com.br";
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        }
                    }
                },
                'senha': {
                    onSuccess: function(e, data) {
                        $('.containerPFConfirmarSenha').show();
                        $('[name="confirmacaoSenha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 8,
                            max: 12,
                            message: "Deve ter entre 8 e 12 caracteres"
                        },
                        callback: {
                            message: 'Senha inválida',
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toLowerCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra maiúscula'
                                    }
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toUpperCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra minúscula'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/[0-9]/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um dígito'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/^[a-zA-Z0-9]+$/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Não deve conter caracter especial'
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'confirmacaoSenha': {
                    onSuccess: function(e, data) {
                        $('[name="pergunta"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        identical: {
                            field: 'senha',
                            message: 'Essas senhas não coincidem. Tente novamente.'
                        }
                    }
                },
                'pergunta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'resposta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            _main.loader.show("Estamos enviando seus dados...");
        });


        // Formulário pj
        $('#formCadastroNovoUsuario')
        .bootstrapValidator({
            // container: 'tooltip',
            // message: "Menssagem 1",
            // excluded: [':disabled', ':hidden', ':not(:visible)', ':not(.selectpicker)'],
            trigger: 'blur',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                document: {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'cnpj': {
                    validators: {
                        callback: {
                            message: "Inválido",
                            callback: function(value, validator, $field) {
                                var b = [6,5,4,3,2,9,8,7,6,5,4,3,2], c = value;
                                if((c = c.replace(/[^\d]/g,"").split("")).length != 14) return false;
                                for(var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
                                if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
                                for(var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
                                if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n)) return false;
                                return true;
                            }
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'razaoSocial': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 50,
                            message: "Deve ter entre 2 e 50 caracteres"
                        }
                    }
                },
                'nomeFantasia': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 50,
                            message: "Deve ter entre 2 e 50 caracteres"
                        }
                    }
                },
                'nomeResponsavel': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sobrenomeResponsavel': {
                    message: "Inválido",
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]+$/,
                            message: "Deve conter apenas letras"
                        }
                    }
                },
                'sexo': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione pelo menos uma opção"
                        }
                    }
                },
                'dataNascimento': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        callback: {
                            message: "Inválido",
                            callback: function(value, validator) {
                                if (value.length < 10) {
                                    return false
                                } else {
                                    if ( moment(value, 'DD-MM-YYYY').isBefore('01-01-1910', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão velho"
                                        }
                                    } else if ( moment(value, 'DD-MM-YYYY').isAfter('01-01-2010', 'DD-MM-YYYY') ) {
                                        return {
                                            valid: false,
                                            message: "Impossível você ser tão novo"
                                        }
                                    } else {
                                        return {
                                            valid: moment(value, 'DD-MM-YYYY').isValid(),
                                            message: "Inválido"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'tipoTelefonePJ': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'ddd': {
                    validators: {
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'telefone': {
                    validators: {
                        stringLength: {
                            min: 9,
                            max: 10,
                            message: "Inválido"
                        },
                        callback: {
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cep': {
                    validators: {
                        stringLength: {
                            min: 4,
                            max: 9,
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.endereco': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.numero': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: "Inválido"
                        },
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.bairro': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.cidade': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'endereco.estado': {
                    trigger: 'change',
                    validators: {
                        notEmpty: {
                            message: "Selecione uma das opções"
                        }
                    }
                },
                'emailPessoal': {
                    onSuccess: function(e, data) {
                        email = $("#emailPessoalPJ").val();
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        emailendereco: {
                            message: "Inválido"
                        }
                    }
                },
                'emailOi': {
                    onSuccess: function(e, data) {
                        email = $("#emailOiPJ").val()+"@oi.com.br";
                        $("#login").attr("value", email);
                        $('[name="senha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 2,
                            max: 30,
                            message: "Deve ter entre 2 e 30 caracteres"
                        }
                    }
                },
                'senha': {
                    onSuccess: function(e, data) {
                        $('.containerPJConfirmarSenha').show();
                        $('[name="confirmacaoSenha"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        stringLength: {
                            min: 8,
                            max: 12,
                            message: "Deve ter entre 8 e 12 caracteres"
                        },
                        callback: {
                            message: 'Senha inválida',
                            callback: function(value, validator, $field) {
                                if (value === '') {
                                    return true;
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toLowerCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra maiúscula'
                                    }
                                }

                                // The password doesn't contain any uppercase character
                                if (value === value.toUpperCase()) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um caractere em letra minúscula'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/[0-9]/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Deve conter pelo menos um dígito'
                                    }
                                }

                                // The password doesn't contain any digit
                                if (value.search(/^[a-zA-Z0-9]+$/) < 0) {
                                    return {
                                        valid: false,
                                        message: 'Não deve conter caracter especial'
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'confirmacaoSenha': {
                    onSuccess: function(e, data) {
                        $('[name="pergunta"]').focus();
                    },
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        },
                        identical: {
                            field: 'senha',
                            message: 'Essas senhas não coincidem. Tente novamente.'
                        }
                    }
                },
                'pergunta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                },
                'resposta': {
                    validators: {
                        notEmpty: {
                            message: "Não pode estar vazio"
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            _main.loader.show("Estamos enviando seus dados...");
        });
*/

    },

    loader: {
        hide : function(){
            _main.d('loader.hide');
            $('.preloader .status').text("Obtendo dados do servidor...");
            $('.preloader').hide();
            window.preventTab = false;
        },
        show: function(message){
            _main.d('loader.show');

            //impedir tab durante a mensagem
            window.preventTab = true;
            $('body').on('keypress', function(e){
                if (e.keyCode === 9 && window.preventTab === true) {
                    e.preventDefault();
                }
            });

            $('.preloader .status').text(message);
            $('.preloader').show();
        }
    },

    isIE: function(){
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
            return true;
        }
    },

    d: function(c, msg) {
        msg = msg || ' ';
        if (_main.o.debug === true) {
            console.log(c, msg);
        }
    }

};

$(function() {

    // Avoids `console` errors in browsers that lack a console.
    // (function() {
    //     var method;
    //     var noop = function noop() {};
    //     var methods = [
    //         'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    //         'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    //         'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    //         'timeStamp', 'trace', 'warn'
    //     ];
    //     var length = methods.length;
    //     var console = (window.console = window.console || {});

    //     while (length--) {
    //         method = methods[length];

    //         // Only stub undefined methods.
    //         if (!console[method]) {
    //             console[method] = noop;
    //         }
    //     }
    // }());

    window.APP.main.init();

});