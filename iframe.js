  $(document).ready( function() {

             var _chatterURL = 'https://assistant.sophie.chat/NOMEDOSEUBOT/ChatterWeb/index?login=visitante';

            //Open
            $(".fa-comment").click(function () {
                $(".janela-modal iframe").attr("src", _chatterURL)
                var janela = $(".janela-modal");
                janela.stop(true, false).fadeIn();
                $(".fa-comment").stop(true, false).fadeOut();
                $(".fa-times-circle").stop(true, false).fadeIn();
                $(".bubble-ola").hide();
            });

            //Close
            $(".fa-times-circle").click(function () {
                $(".janela-modal iframe").removeAttr("src");
                var janela = $(".janela-modal");
                janela.stop(true, false).fadeOut();
                $(".fa-comment").stop(true, false).fadeIn();
                $(".fa-times-circle").stop(true, false).fadeOut();
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
