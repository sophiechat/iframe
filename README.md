O **IFRAME** pode ser considerado uma pequena janela para mostrar o chat da Sophie em ambientes web. Seja uma área de usuários privada ou até mesmo seu site público.

Na pasta sample existe um exemplo prático em HTML.

Lembrando que para essa implementação é necessário um conhecimento básico de HTML.

Necessário importar os arquivos **CSS via https**

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    
    <link rel="stylesheet" href="https://sophie.chat/iframe/custom.css">

Dependência da biblioteca Javascript JQUERY versões 1.11 em diante.
Se já existe na página a ser implementada não é necessária a sua importação, case necessite aponte para:
https://cdnjs.com/libraries/jquery/1.11.2

**Importação obrigatória de JS**
<script src="https://sophie.chat/iframe/iframe.js"></script>

Ou para ambientes em Wordpress (limitações de acordo com o template, recomendamos o plugin INSERT HEADERS AND FOOTERS)
<script src="https://sophie.chat/iframe/iframe-wp.js"></script>

Inserir o HTML no footer ou dentro da tag body e dentro da tag iframe colocar o nome do seu bot

    <div class="janela-modal popup-box chat-popup" id="qnimate" style="display: none;">
                   <iframe src="https://assistant.sophie.chat/NOMEDOSEUBOT/Login/GetLogin?login=visitante" frameborder="0" width="100%" height="100%" style="overflow: hidden; border-radius: 0.5em;"></iframe>
              </div>            

              <div class="bubble-ola" style="display: none;">
                  <p class="text-center" style="margin-bottom: 0px;">Olá. Precisa de ajuda?</p>
              </div>

              <div class="bubble-nps" style="display: none;">
                <p class="text-center" style="color: gray;">Avalie nessa escala quais as chances de você indicar nosso serviço para um amigo</p>
                <div class="btn-demo">
                    <button class="btn btn-danger btn-icon" title="1"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-danger btn-icon" title="2"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-danger btn-icon" title="3"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-primary btn-icon" title="4"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-primary btn-icon" title="5"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-primary btn-icon" title="6"><i class="fa fa-meh-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-success btn-icon" title="7"><i class="fa fa-smile-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-success btn-icon" title="8"><i class="fa fa-smile-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-success btn-icon" title="9"><i class="fa fa-smile-o" style="font-size: 19px;"></i></button>
                    <button class="btn btn-success btn-icon" title="10"><i class="fa fa-smile-o" style="font-size: 19px;"></i></button>
                </div>
             </div>

             <div class="bubble-obrigado" style="display: none;">
                <p class="text-center" style="color: gray; margin-bottom: 0px;">Obrigado pela sua avaliação. Estamos sempre buscando melhorar a sua experiência.</p>
             </div>

              <div class="btn-modal">
                <p class="text-center" style="color: white; font-size: 14px; padding-top: 8px;">
                    <i class="fa fa-comment" aria-hidden="true" style="font-size: 25px; padding: 12px; background-color: navy; border-radius:50%"></i>
                    <i class="fa fa-times-circle" aria-hidden="true" style="display: none; position: fixed; right: 32px; bottom: 570px;"></i>
                </p>
              </div>


Ok estamos prontos!
![A janela da Sophie se abrirá no canto direto da sua página ](https://doc.sophie.chat/pt/wp-content/uploads/2019/12/iframe-sophie.jpg)
