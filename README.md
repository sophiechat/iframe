**IFRAME**

Neste guia vamos aprender a utilizar seu bot dentro de um site ou ambiente web. Para isso temos que primeiramente ter um chatbot criado com sua conta para depois inserir dentro de um elemento HTML chamado  **IFRAME**.

**Lembrando que para essa implementação é necessário um conhecimento básico de HTML.**

### Dependências

Os arquivos font-awesome.css, custom.css e jquery são essenciais.

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fontawesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://sophie.chat/iframe/custom.css">

Você pode copiar e editar esses arquivos de acordo com a estrutura do seu site. Lembrando que a dependência da biblioteca Javascript JQUERY versões 1.11 em diante é essecial.

**Se este arquivo do JQUERY já existe** na página a ser implementada **não é necessária a sua importação**, caso necessite aponte para:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.js" integrity="sha256-WMJwNbei5YnfOX5dfgVCS5C4waqvc+/0fV7W2uy3DyU=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js" integrity="sha256-1OxYPHYEAB+HIz0f4AdsvZCfFaX4xrTD9d2BtGLXnTI=" crossorigin="anonymous"></script>

### Instalação:

O **IFRAME** pode ser considerado uma pequena janela para mostrar o chat da Sophie em ambientes web. Seja uma área de usuários privada ou até mesmo seu site público.

Para instalar você deve seguir os seguintes passos:

### [](https://github.com/sophiechat/iframe#1-copiar-e-colar-o-c%C3%B3digo-abaixo-na-p%C3%A1gina-onde-deseja-exibir-chat)1. Copiar e colar o código abaixo na página onde deseja exibir chat:

    <div  class="janela-modal popup-box chat-popup"  
		  id="qnimate"
		  style="display: none;">
		<iframe  frameborder="0"  
				 width="100%"  
				 height="100%"  
				 style="overflow: hidden; 
						border-radius: 0.5em;">
		 </iframe>
	</div>

	<div  class="bubble-ola" style="display: none;">
		<p  class="text-center" style="margin-bottom: 0px;">
			Olá. Precisa de ajuda?
		</p>
	</div>

	<div  class="btn-modal">
		<p  class="text-center" 
			style="color: white; 
				   font-size: 14px; 
				   padding-top: 8px;">
			<i  class="fa fa-comment"
				aria-hidden="true"
				style="font-size: 25px; 
					   padding: 12px; 
					   background-color: navy; 
					   border-radius:50%">
			</i>
			<i  class="fa fa-times-circle"
				aria-hidden="true" 
				style="display: none; 
					   position: fixed; 
					   right: 32px; 
					   bottom: 570px;">
		   </i>
		</p>
	</div>

E o código JS deve ser colocado após todos os scripts da mesma página:

	   <script>
	     $(document).ready(function () {
		    //Chat URL
		    var _chatterURL = 'https://assistant.sophie.chat/<NOMEDOSEUBOT>/ChatterWeb/index?login=visitante';

		    //Open Modal
		    $(".fa-comment").click(function () {
		      $(".janela-modal iframe").attr("src", _chatterURL)
		      var janela =  $(".janela-modal");
		      janela.stop(true, false).fadeIn();
		      $(".fa-comment").stop(true, false).fadeOut();
		      $(".fa-times-circle").stop(true, false).fadeIn();
		      $(".bubble-ola").hide();
		    });
		    
		    //Close
		    $(".fa-times-circle").click(function () {
		      $(".janela-modal iframe").removeAttr("src");
		      var janela =  $(".janela-modal");
		      janela.stop(true, false).fadeOut();
		      $(".fa-comment").stop(true, false).fadeIn();
		      $(".fa-times-circle").stop(true, false).fadeOut();
		    });
		    
		    $(".bubble-ola").delay(1000).stop(true, false).fadeIn(500);

		    $(".bubble-ola").click(function () {
		      var ola =  $(".bubble-ola");
		      ola.delay(500).stop(true, false).fadeOut(1000);
		    });
		    
		    $(".btn-icon").one("click", function () {
		      var nps =  $(".bubble-nps");
		      var obrigado =  $(".bubble-obrigado");
		      nps.remove();
		      obrigado.show();
		      obrigado.delay(3000).fadeOut();
		    });
    });
    </script>
    
### 2. Definir a URL do bot:

Em seguida troque <NOMEDOBOT> o valor para o nome do bot criado:

    var _chatterURL = 'https://assistant.sophie.chat/<NOMEDOSEUBOT>/ChatterWeb/index?login=visitante';
Salve as alterações desse arquivo HTML e recarregue a página.

**PRONTO**, se você seguiu os passos corretamente você será capaz de ver uma tela similar como na imagem abaixo:

![](https://doc.sophie.chat/pt/wp-content/uploads/2019/12/iframe-sophie-1.jpg)

### Nosso repositório de arquivos

Você pode clonar ou baixar os arquivos do nosso repositório no  [github](https://github.com/sophiechat/iframe)  para testar antes de subir em um ambiente de produção.

Na pasta sample existe um exemplo prático em HTML, o arquivo index.html e suas respectivas dependências nas pastas como demonstra a imagem abaixo.

![](https://doc.sophie.chat/pt/wp-content/uploads/2019/12/sample-github.png)

Repare que são chamadas as seguintes dependências na seção HEAD do arquivo:

    <link href="Content/css/opensans.css" rel="stylesheet"/>
	<link href="Content/css/fontawesome/css/font-awesome.css" rel="stylesheet"/>
	<link href="Content/css/quirk2.css" rel="stylesheet"/>
	<link rel="stylesheet" href="Content/css/custom.css">   
	<script src="Scripts/jquery-1.10.2.min.js"></script>

### Instalação no WordPress

Para a instalação no WordPress você precisa baixar um plugin para inserir código em certas seções do site. Lembrando que podem haver limitações de acordo com o template. Nesse teste utilizamos o plugin [Insert Headers and Footers](https://br.wordpress.org/plugins/insert-headers-and-footers/) e tivemos sucesso.

Insira as dependências na seção HEAD

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fontawesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://sophie.chat/iframe/custom.css">

E este código na seção FOOTER, modificando o NOMEDOSEUBOT pelo seu bot criado.

    <div  class="janela-modal popup-box chat-popup"  
		  id="qnimate"
		  style="display: none;">
		<iframe  frameborder="0"  
				 width="100%"  
				 height="100%"  
				 style="overflow: hidden; 
						border-radius: 0.5em;">
		 </iframe>
	</div>

	<div  class="bubble-ola" style="display: none;">
		<p  class="text-center" style="margin-bottom: 0px;">
			Olá. Precisa de ajuda?
		</p>
	</div>

	<div  class="btn-modal">
		<p  class="text-center" 
			style="color: white; 
				   font-size: 14px; 
				   padding-top: 8px;">
			<i  class="fa fa-comment"
				aria-hidden="true"
				style="font-size: 25px; 
					   padding: 12px; 
					   background-color: navy; 
					   border-radius:50%">
			</i>
			<i  class="fa fa-times-circle"
				aria-hidden="true" 
				style="display: none; 
					   position: fixed; 
					   right: 32px; 
					   bottom: 570px;">
		   </i>
		</p>
	</div>
	

    <script>
	  jQuery(document).ready(function () {
    //Chat URL
    var _chatterURL = 'https://assistant.sophie.chat/<NOMEDOSEUBOT>/ChatterWeb/index?login=visitante';

    //Open Modal
    jQuery(".fa-comment").click(function () {
      jQuery(".janela-modal iframe").attr("src", _chatterURL)
      var janela =  jQuery(".janela-modal");
      janela.stop(true, false).fadeIn();
      jQuery(".fa-comment").stop(true, false).fadeOut();
      jQuery(".fa-times-circle").stop(true, false).fadeIn();
      jQuery(".bubble-ola").hide();
    });
    
    //Close
    jQuery(".fa-times-circle").click(function () {
	      jQuery(".janela-modal iframe").removeAttr("src");
	      var janela =  jQuery(".janela-modal");
	      janela.stop(true, false).fadeOut();
	      jQuery(".fa-comment").stop(true, false).fadeIn();
	      jQuery(".fa-times-circle").stop(true, false).fadeOut();
	    });
	    
	    jQuery(".bubble-ola").delay(1000).stop(true, false).fadeIn(500);

	    jQuery(".bubble-ola").click(function () {
	      var ola =  jQuery(".bubble-ola");
	      ola.delay(500).stop(true, false).fadeOut(1000);
	    });
	    
	    jQuery(".btn-icon").one("click", function () {
	      var nps =  jQuery(".bubble-nps");
	      var obrigado =  jQuery(".bubble-obrigado");
	      nps.remove();
	      obrigado.show();
	      obrigado.delay(3000).fadeOut();
		    });
	    });
	    </script>

Nesse caso do WordPress se necessárias mais personalizações é preciso fazê-las diretamente nos estilos do template.
