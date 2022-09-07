let step;

$(function() {

   let video;
   let utente = localStorage.getItem("nome");

      /***********************************Comparsa barra di ricerca*********************************************** */


   $("#cerca").click(function() {

      if($(".comparsa").length == 0) {
         $("nav input[type=\"text\"]").addClass("comparsa").animate({"width": "10vw"}, 250);
      }
      else {
         $("nav input[type=\"text\"]").animate({"width": "0"}, 150).fadeOut(0).removeClass("comparsa");
      }
   });

   /***********************************Prendo il nome dalla registrazione e lo uso per scrivere Bevenuto/a + nome al posto di accedi*********************************************** */
   
   if (utente != null) {
      $("nav li span").html("Bevenuto/a " + utente);
      $("nav li span").next().html("(Esci)").addClass("esci");
   }
   
   $("nav li span").next().click(function(e) {
         
         localStorage.removeItem("nome");
         $("nav li span").next().removeClass("esci");
         open("index.html", "_self");
   });
  

  

   /***********************************Allo scorrere della pagina rendo la nav più scura e visibile*********************************************** */


   $(document).scroll(function() {

      if ($(document).scrollTop() > 50) {
         $("nav").css("background", "#0f0c29");
         $("nav input[type=\"text\"]").css("background-color", "#24243e");
      }
      else {
         $("nav").css("background", "linear-gradient(to right, #24243e, #302b63, #0f0c29)");
         $("nav input[type=\"text\"]").css("background-color", "#0f0c29");
      }

   });

   /*************************************SLIDER***********************************************************/

   $(".rslides").responsiveSlides({
      auto: true,             // Boolean: Animate automatically, true or false
      speed: 800,            // Integer: Speed of the transition, in milliseconds
      timeout: 5000,          // Integer: Time between slide transitions, in milliseconds
      pager: true,           // Boolean: Show pager, true or false
      nav: false,             // Boolean: Show navigation, true or false
      random: false,          // Boolean: Randomize the order of the slides, true or false
      pause: true,           // Boolean: Pause on hover, true or false
      pauseControls: true,    // Boolean: Pause when hovering controls, true or false
      prevText: "Previous",   // String: Text for the "previous" button
      nextText: "Next",       // String: Text for the "next" button
      maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
      navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
      manualControls: "",     // Selector: Declare custom pager navigation
      namespace: "rslides",   // String: Change the default namespace used
      before: function(){},   // Function: Before callback
      after: function(){}     // Function: After callback
    });

    if($(".rslides_tabs").length>0){
      $(".rslides_tabs a").text("");
  }

   /***********************************Faccio click su una copertina*********************************************** */


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
         video.setAttribute("poster", $(this).find("img").attr("src")); //Inietto il poster del video dalla copertina

         $("#copertinaCliccata video").css("display", "block");
         $("#copertinaCliccata #copertina").css("display", "none");
         $("#copertinaCliccata #muted").css("display", "block");
      }

      else {
         $("#copertinaCliccata video").css("display", "none");
         $("#copertinaCliccata #copertina").css("display", "block");
         $("#copertinaCliccata #muted").css("display", "none");
      } //Altrimenti nascondo il box video e il pulsante del volume e mostro solamente l'immagine di copertina cliccata

      video.addEventListener("ended", function() {
         let v = video.currentSrc;
         video.src="";
         video.src = v; 
         video.pause(); 
      })
   

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

   /*********************************Posiziono i box al caricamento della pagina e ogni volta che modifico la width della finestra******************************************** */


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

   /***********************************Richiamo la funzione slider per ogni categoria di copertine*********************************************** */


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

   /*********************************FORM CONTATTACI*************************************/

   let messaggio;

   $("footer a").click(function(e) {

      e.preventDefault();

   })
   
   $("#contattaci").click(function() {
      clearInterval(messaggio);
      
      $("#boxContattaci").fadeIn();
      $("#boxContattaci form").css("display", "block");
      
      $("#chiudiContatti").click(function() {
         $("#boxContattaci").fadeOut(0);
         $("#boxContattaci form input").removeClass("errore");
         $("#privacyContattaci").next().next().html("").css("display", "none");
         $("#boxContattaci form").trigger("reset");
         $("#messaggio").removeClass("errore");
      });
   });

   $("#boxContattaci form").submit(function(e) {

      e.preventDefault();

      controllaInputText($("#boxContattaci form li input[type=\"text\"]"));

      if (!$("#privacyContattaci").is(":checked")) {
         $("#privacyContattaci").next().next().html("Devi accettare le condizioni").css("display", "block");
      }

      else {
         $("#privacyContattaci").next().next().html("").css("display", "none");
      }

      if ($("#messaggio").val().trim().length < 10) {
         $("#messaggio").addClass("errore");
         $("#messaggio").next().html("Inserisci un messaggio di almeno 10 caratteri")
      }
      else {
         $("#messaggio").removeClass("errore");
      }
       

      if($(".errore").length == 0 && $("#privacyContattaci").is(":checked")) {
         $("#boxContattaci form").css("display", "none");
         $("#boxContattaci h3").fadeIn();
         messaggio = setInterval(function(){$("#boxContattaci").fadeOut();}, 2000);
         $("#boxContattaci form").trigger("reset");
      }

   });

}); //.ready

