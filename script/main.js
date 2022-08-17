let step;

$(function() {

   let video;
  

   $(document).scroll(function() {

      if ($(document).scrollTop() > 100) {
         $("nav").css("background", "#0f0c29");
         
      }
      else {
         $("nav").css("background", "linear-gradient(to right, #24243e, #302b63, #0f0c29)");
      }

   }); // Il menu cambia colore di sfondo allo scroll verso il basso

   $(".box").click(function(){

      $("#copertinaCliccata").fadeIn(); //Compare il box in sovraimpressione

      $("body").css("overflow-y", "hidden"); //Tolgo la possibilità al body di scrollare

      $("#copertinaCliccata h1").html($(this).find(".titolo").html()); //Inietto il titolo della copertina Cliccata nel box in sovraimpressione

      $("#copertinaCliccata .sinossi").html($(this).find(".sinossi").html()); //Inietto la sinossi della copertina Cliccata nel box in sovraimpressione 

      $("#copertinaCliccata #copertina").attr("src", $(this).find("img").attr("src")); //Inietto l'immagine della copertina Cliccata nel box in sovraimpressione

      if($(this).closest("section").is("#film")) {
         $("#copertinaCliccata ul").css("display", "none");
         $("#copertinaCliccata #playButton").css("display", "block");
      } //Se ho cliccato su una copertina della sezione film nascondo la lista episodi e mostro un pulsante play sulla copertina del film

      else {
         $("#copertinaCliccata ul").css("display", "block");
         $("#copertinaCliccata #playButton").css("display", "none");
      } //Altrimenti nel caso di serie tv o anime mostro la lista episodi e nascondo il pulsante play



      //CASO TRAILER*****************************************************************************************************

      video = document.querySelector("#copertinaCliccata video");
      video.volume = 0;

      if ($(this).is("[data-src]")) {  //Nel caso clicco il box che contiene un data-src con valore il percorso di un video

         video.setAttribute("src", $(this).attr("data-src")); //Inietto il video nel box in sovraimpressione

         $("#copertinaCliccata video").css("display", "block");
         $("#copertinaCliccata #copertina").css("display", "none");
         $("#copertinaCliccata #muted").css("display", "block");
      }

      else {
         $("#copertinaCliccata video").css("display", "none");
         $("#copertinaCliccata #copertina").css("display", "block");
         $("#copertinaCliccata #muted").css("display", "none");
      } //Altrimenti nascondo il box video e il pulsante del volume e mostro solamente l'immagine di copertina cliccata

      $("#copertinaCliccata #chiudi").click(function(){
         $("#copertinaCliccata").fadeOut();
         video.pause();
         $("body").css("overflow-y", "auto");
      }) //Cliccando sul pulsante chiudi il video va in pausa, il box in sovraimpressione scompare e posso di nuovo scrollare il body
   });


   $(".boxCliccato #muted").click(function() {

      if (video.volume == 0) {
         $(this).css(
            {
            "background-image": "url(immagini/volume-button.png)"
            }
         );
         video.volume = 1;
      }
      else {
         $(this).css(
            {
            "background-image": "url(immagini/mute.png)"
            }
         );
         video.volume = 0;
      }
   });  //Gestisco il pulsante del volume nel caso trailer

   //FINE CASO TRAILER****************************************************************************************************************************************


   posizionaBox($("#serie .box"));
   posizionaBox($("#film .box"));
   posizionaBox($("#anime .box"));

   $(window).resize(function() {
      //step = parseInt($(".contenitore .primo").next().attr("data-left") - $(".contenitore .primo").attr("data-left") );
      posizionaBox($("#serie .box"));
      posizionaBox($("#film .box"));
      posizionaBox($("#anime .box"));
      $(".swipeLeft").fadeOut();
   });

   slider($("#serie .swipeRight"),
         $("#serie .swipeLeft"),
         $("#serie .box"),
         $("#serie .primo"),
         $("#serie .ultimo"),
         );

   slider($("#film .swipeRight"),
         $("#film .swipeLeft"),
         $("#film .box"),
         $("#film .primo"),
         $("#film .ultimo"),
         );

   slider($("#anime .swipeRight"),
         $("#anime .swipeLeft"),
         $("#anime .box"),
         $("#anime .primo"),
         $("#anime .ultimo"),
         );

}); //.ready

function posizionaBox (box) {

   if($(window).width() > 1200) {
      box.each(function(i) {
         step = 20;
         $(this).attr("data-left", step*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }
   else if($(window).width() <= 1200 && $(window).width() > 800) {
      box.each(function(i) {
         step = 25;
         $(this).attr("data-left", step*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }

   else if ($(window).width() <= 800 && $(window).width() > 600) {
      box.each(function(i) {
         step = 33;
         $(this).attr("data-left", step*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }
   else {
      box.each(function(i) {
         step = 50;
         $(this).attr("data-left", step*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }

}

function slider (destra, sinistra, box, primo, ultimo) {

   let left;

   destra.click(function() {

      ultimoData = parseInt(ultimo.attr("data-left")) + step;

      if (ultimoData == 100 || ultimoData == 99) {

         box.each(function(i) {
            left = parseInt($(this).attr("data-left"));

            $(this).attr("data-left", step*i);
            $(this).stop().animate({"left": $(this).attr("data-left") + "%"}, 800 );
         });
         
      }
      else {

         box.each(function(i) {

               left = parseInt($(this).attr("data-left"));

               $(this).attr("data-left", left - step );

               $(this).stop().animate({"left": $(this).attr("data-left") + "%"}, 800 );
               
            });
         } //each

      if (primo.attr("data-left") != "0") {
         sinistra.fadeIn();
      }
      else {
         sinistra.fadeOut();
      }

   }); // right.click

   sinistra.click(function() {

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