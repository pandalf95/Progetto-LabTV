$(function() {

    let accedi = $("#login form");
    let registrati = $("#signup form");
    let nome, mail, password;
    

    accedi.submit( function (e) {

        e.preventDefault();

        mail = $("#login #email");
        password = $("#login #password");

        if (!controllaLunghezza(mail)) {
            mail.addClass("errore");
            mail.next().html("La mail è obbligatoria");
        }
        else if (!controllaCampo(mail, 2)) {
            mail.addClass("errore");
            mail.next().html("La mail inserita non è valida");
        }
        else {
            mail.removeClass("errore");
        }

        if (!controllaLunghezza(password)) {
            password.addClass("errore");
            password.next().html("La password è obbligatoria");
        }
        else if (password.val().length < 6) {
            password.addClass("errore");
            password.next().html("La password non è valida");
        }
        else {
            password.removeClass("errore");
        }

        if($(".errore").length == 0) {
            open("../index.html", "_self");
        }

    });

    let registratiOra = $("#login h4 a");

    registratiOra.click(function() {

        $("head title").html("Registrati | LabTv");
        $("#login").fadeOut(0);
        $("#signup").fadeIn(0);

    });


    registrati.submit(function(e) {

        e.preventDefault();

        controllaInputText($("#signup input[type =\"text\""));

        $("#signup input[type =\"password\"").each(function(i) {

            if (!controllaLunghezza($(this))) {
                $(this).addClass("errore");
                $(this).next().html("Questo campo è obbligatorio");
            }
            else if ($(this).val().length < 6) {
                $(this).addClass("errore");
                $(this).next().html("Il valore inserito non è valido");
            }
            else {
                $(this).removeClass("errore");

                if (i == 0) {
                    password = $("#signup #passwordReg").val();
                }

                if (i == 1) {
                    if (!match(password, $(this).val())) {
                        $(this).addClass("errore");
                        $(this).next().html("Il valore inserito non corrisponde");
                    }
                    else {
                        $(this).removeClass("errore");
                    }
                }
            }

        });

        if (!$("#privacy").is(":checked")) {
            $("#privacy").next().next().html("Devi accettare le condizioni").css("display", "block");
        }
        else {
            $("#privacy").next().next().html("").css("display", "none");
        }

        if($(".errore").length == 0 && $("#privacy").is(":checked")) {
            nome = $("#nome").val();
            localStorage.setItem("nome", nome);
            $("head title").html("Accedi | LabTv");
            $("#login").fadeIn(0);
            $("#signup").fadeOut(0);
            $("#login h2").fadeIn(0);
        }

    });

    let accediReg = $("#signup h4 a");

    accediReg.click(function() {
        $("head title").html("Accedi | LabTv");
        $("#login").fadeIn(0);
        $("#signup").fadeOut(0);
    })
});