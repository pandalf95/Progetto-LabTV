let step

$(function() {

   let video;
  

   $(document).scroll(function() {

      if ($(document).scrollTop() > 100) {
         $("nav").css("background", "#0f0c29");
         
      }
      else {
         $("nav").css("background", "linear-gradient(to right, #24243e, #302b63, #0f0c29)");
      }

   });

   $(".box").click(function(){
      video = document.querySelector("#copertinaCliccata video");

      $("#copertinaCliccata").fadeIn();
      video.volume = 0;

      $("body").css("overflow-y", "hidden");

      $("#copertinaCliccata h1").html($(this).find(".titolo").html()); //Titolo
      $("#copertinaCliccata .sinossi").html($(this).find(".sinossi").html()); //Sinossi
      $("#copertinaCliccata video").attr("src", $(this).attr("data-src")); //Trailer
      $("#copertinaCliccata ul").html($(this).find("ul").html()); //Episodi

      $("#copertinaCliccata #chiudi").click(function(){
         $("#copertinaCliccata").fadeOut();
         video.pause();
         $("body").css("overflow-y", "auto");
      })
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
   });

   posizionaBox($("#serie .box"));
   posizionaBox($("#film .box"));
   posizionaBox($("#anime .box"));

   $(window).resize(function() {
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
         $(this).attr("data-left", 20*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }
   else if($(window).width() <= 1200 && $(window).width() > 800) {
      box.each(function(i) {
         $(this).attr("data-left", 25*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }

   else if ($(window).width() <= 800 && $(window).width() > 600) {
      box.each(function(i) {
         $(this).attr("data-left", 33*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }
   else {
      box.each(function(i) {
         $(this).attr("data-left", 50*i);
         $(this).css("left", $(this).attr("data-left") + "%" );
      });
   }

}

function slider (destra, sinistra, box, primo, ultimo) {

   let left;
   step = parseInt($(".contenitore .primo").next().attr("data-left"));

   $(window).resize(function() {
      step = parseInt($(".contenitore .primo").next().attr("data-left"));
   });

   destra.click(function() {

      ultimoData = parseInt(ultimo.attr("data-left")) + step;

      if (ultimoData == 100 || ultimoData == 99) {

         box.each(function(i) {
            left = parseInt($(this).attr("data-left"));
            /*$(this).animate({"left": left - step/3 + "%",}, 250 );
            $(this).animate({"left": left + "%",}, 250 );*/

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