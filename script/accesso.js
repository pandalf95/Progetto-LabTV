$(function() {

    let accedi = $("#login form");
    let registrati = $("#signup form");
    let nome, cognome,mail, password, password2;
    let campiVuoti = false;
    

    accedi.submit( function (e) {

        e.preventDefault();

        mail = $("#login #email");
        password = $("#login #password");

        if (!controllaLunghezza(mail)) {
            mail.addClass("errore");
            mail.next().html("La mail è obbligatoria");
            campiVuoti = true;
        }
        else if (!controllaCampo(mail)) {
            mail.addClass("errore");
            mail.next().html("La mail inserita non è valida");
        }
        else {
            mail.removeClass("errore");
        }

        if (!controllaLunghezza(password)) {
            password.addClass("errore");
            password.next().html("La password è obbligatoria");
            campiVuoti = true;
        }
        else if (password.val().length < 6) {
            password.addClass("errore");
            password.next().html("La password non è valida");
        }
        else {
            password.removeClass("errore");
        }

        if($(".errore").length == 0 && campiVuoti == false) {
            open("../index.html", "_self");
        }

    });

    let registratiOra = $("h4 a");

    registratiOra.click(function() {

        $("head title").html("Registrati | LabTv");
        $("#login").fadeOut(0);
        $("#signup").fadeIn(0);

    });


    registrati.submit(function(e) {

        e.preventDefault();

        nome = $("#signup #nome");
        cognome = $("#signup #cognome");
        mail = $("#signup #emailReg");
        password = $("#signup #passwordReg");
        password2 = $("signup #passwordReg2");


        $("#signup input").each(function(i) {

            if (!controllaLunghezza($(this))) {
                $(this).addClass("errore");
                $(this).next().html("Questo campo è obbligatorio");
            }
            else if (!controllaCampo($(this)), i) {
                $(this).addClass("errore");
                $(this).next().html("Il valore inserito non è valido");
            }
            else {
                $(this).removeClass("errore");
            }

        }) 



    });
});

function controllaCampo(x, y) { 
    if (y == 0 || y == 1) {
        return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(x.val());
    }
    else if (y == 2) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(x.val());
    }
    else {
        return x == y;
    }

    

} //Controllo se la mail inserita abbia un formato valido e restituisco true o false

function controllaLunghezza (x) {
    if (x.val().length == 0) {
        return false;
    }
    else {
        return true;
    }
}
