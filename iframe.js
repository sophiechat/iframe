  $(document).ready( function() {

            //$( ".janela" ).load( "Chattermodal.html?sessionId=63679615894351484655386207");
        

            $(".fa-comment").click(function(){
                var janela = $(".janela-modal");
                janela.stop(true,false).fadeIn();
                $(".fa-comment").stop(true,false).fadeOut();
                $(".fa-times-circle").stop(true,false).fadeIn();
                $(".bubble-ola").hide();
            });
            $(".fa-times-circle").click(function(){
                var janela = $(".janela-modal");
                janela.stop(true,false).fadeOut();
                $(".fa-comment").stop(true,false).fadeIn();
                $(".fa-times-circle").stop(true,false).fadeOut();
                /* $(".bubble-nps").show(); retirado as carinhas */
            });

            $(".bubble-ola").delay(1000).stop(true,false).fadeIn(500);
            $(".bubble-ola").click(function(){
                var ola = $(".bubble-ola");
                ola.delay(500).stop(true,false).fadeOut(1000);
            });
            $(".btn-icon").one("click", function(){
                var nps = $(".bubble-nps");
                var obrigado = $(".bubble-obrigado");
                nps.remove();
                obrigado.show();
                obrigado.delay(3000).fadeOut();
            });


        });