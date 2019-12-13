  jQuery(document).ready( function() {

            //jQuery( ".janela" ).load( "Chattermodal.html?sessionId=63679615894351484655386207");
        

            jQuery(".fa-comment").click(function(){
                var janela = jQuery(".janela-modal");
                janela.stop(true,false).fadeIn();
                jQuery(".fa-comment").stop(true,false).fadeOut();
                jQuery(".fa-times-circle").stop(true,false).fadeIn();
                jQuery(".bubble-ola").hide();
            });
            jQuery(".fa-times-circle").click(function(){
                var janela = jQuery(".janela-modal");
                janela.stop(true,false).fadeOut();
                jQuery(".fa-comment").stop(true,false).fadeIn();
                jQuery(".fa-times-circle").stop(true,false).fadeOut();
                /* jQuery(".bubble-nps").show(); retirado as carinhas */
            });

            jQuery(".bubble-ola").delay(1000).stop(true,false).fadeIn(500);
            jQuery(".bubble-ola").click(function(){
                var ola = jQuery(".bubble-ola");
                ola.delay(500).stop(true,false).fadeOut(1000);
            });
            jQuery(".btn-icon").one("click", function(){
                var nps = jQuery(".bubble-nps");
                var obrigado = jQuery(".bubble-obrigado");
                nps.remove();
                obrigado.show();
                obrigado.delay(3000).fadeOut();
            });


        });