function controllaCampo(x, y) { 
    if (y == 0 || y == 1) {
         return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(x.val());
    }
    else if (y==2) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(x.val());
    }
    else {
        return /^3[0-9]{8,9}$/.test(x.val());
    }

} //Controllo se la mail e i nomi inseriti abbiano un formato valido e restituisco true o false

function controllaLunghezza (x) {
    if (x.val().length == 0) {
        return false;
    }
    else {
        return true;
    }
}

function match(x, y) {

    if (x == y) {
        return true;
    }
    else {
        return false;
    }
}

function controllaInputText (array) {

   array.each(function(i) {

      if(!controllaLunghezza($(this))) {
         $(this).addClass("errore");
         $(this).next().html("Questo campo è obbligatorio");
      }
      else if (!controllaCampo($(this), i)) {
         $(this).addClass("errore");
         $(this).next().html("Il valore inserito non è valido");
      }
      else {
         $(this).removeClass("errore");
      }

   });

}

function posizionaBox (box) {

    /*******In base alla width della pagina uso uno step diverso che mi posiziona le copertine e me lo salvo in data-left per poter usare lo slider************ */


 if($(window).width() > 1200) {

    box.each(function(i) {
       step = 20;
       $(this).attr("data-left", step*i).css("left", $(this).attr("data-left") + "%" );
    });

 }

 else if($(window).width() <= 1200 && $(window).width() > 800) {

    box.each(function(i) {
       step = 25;
       $(this).attr("data-left", step*i).css("left", $(this).attr("data-left") + "%" );
    });

 }

 else if ($(window).width() <= 800 && $(window).width() > 600) {

    box.each(function(i) {
       step = 33;
       $(this).attr("data-left", step*i).css("left", $(this).attr("data-left") + "%" );
    });

 }

 else {

    box.each(function(i) {
       step = 50;
       $(this).attr("data-left", step*i).css("left", $(this).attr("data-left") + "%" );
    });

 }

}

function slider (destra, sinistra, box, primo, ultimo) {

 let left;

 destra.click(function() {

    ultimoData = parseInt(ultimo.attr("data-left")) + step; //Rendo int il data-left dell'ultima copertina e aggiungo lo step

    if (ultimoData == 100 || ultimoData == 99) {  //Se la somma è 100 o 99 sono alla fine e ripristino i posizionamenti originali

       box.each(function(i) {
          left = parseInt($(this).attr("data-left"));

          $(this).attr("data-left", step*i);
          $(this).stop().animate({"left": $(this).attr("data-left") + "%"}, 800 );
       });
       
    }

    else { //Altrimenti scorro le copertine sottraendo a ciascuna lo step e quindi mandandole a sinistra di un posto per ogni click

       box.each(function() {

             left = parseInt($(this).attr("data-left"));

             $(this).attr("data-left", left - step );

             $(this).stop().animate({"left": $(this).attr("data-left") + "%"}, 800 );
             
          });
       } //each

    if (primo.attr("data-left") != "0") {  //Per il pulsante a sinistra ho deciso di nasconderlo se il primo elemento è in prima posizione
       sinistra.fadeIn();
    }
    else {
       sinistra.fadeOut();
    }

 }); // right.click

 sinistra.click(function() {  //Questa volta, per scorrere al contrario lo step lo aggiungo

    box.each(function() {

       left = parseInt($(this).attr("data-left"));

       $(this).attr("data-left", (left + step));

       $(this).stop().animate({"left": $(this).attr("data-left") + "%"}, 800 );


    }); //each

    if (primo.attr("data-left") != "0") {
       sinistra.fadeIn();
    }
    else {
       sinistra.fadeOut();
    }

 }); // left.click

}
