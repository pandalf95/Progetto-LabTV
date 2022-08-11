$(function() {

    let accedi = $("#login form");
    let mail, password;

    accedi.submit( function (e) {

        e.preventDefault();

        mail = $("#login #email");
        password = $("#login #password");

        if (mail.value.length == 0) {
            mail.addClass("errore");
            mail.nextElementSibling.innerHTML = "La mail è obbligatoria";
        }
        else if (!controllaMail(mail)) {
            mail.classList.add("errore");
            mail.nextElementSibling.innerHTML = "La mail inserita non è valida";
        }
        else {
            mail.classList.remove("errore");
        }

        if (password.value.length == 0) {
            password.classList.add("errore");
            password.nextElementSibling.innerHTML = "La password è obbligatoria";
        }
        else if (password.value.length < 6) {
            password.classList.add("errore");
            password.nextElementSibling.innerHTML = "La password non è valida";
        }
        else {
            password.classList.remove("errore");
        }

    });

    let registratiOra = document.querySelector("h4 a");

    registratiOra.onclick = function() {

        signup.style.display = "block";
        login.style.display = "none";

        document.querySelector("head title").innerHTML = "Registrati | LabTv"
    }

    let registrati = document.querySelector("#signup form");

    registrati.onsubmit = function (e) {

        e.preventDefault();

        mail = document.querySelector("#signup #email");
        password = document.querySelector("#signup #password");

        

    }
})