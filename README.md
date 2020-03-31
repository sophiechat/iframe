# Instalação
O **IFRAME** pode ser considerado uma pequena janela para mostrar o chat da Sophie em ambientes web. Seja uma área de usuários privada ou até mesmo seu site público.

Para instalar você deve seguir os seguintes passos: 

### 1. Copiar e colar o código abaixo na página onde deseja exibir chat:
```html
<div  class="container-fluid conteudo-tela">
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
</div>
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
```

### 2. Definir a URL do bot:
Em <NOMEDOSEUBOT> troque o valor para o nome do bot criado:
```javascript
var _chatterURL = 'https://assistant.sophie.chat/<NOMEDOSEUBOT>/ChatterWeb/index?login=visitante';
```
 **PRONTO**, se você seguiu os passos corretamente você será capaz de ver a tela abaixo:

![A janela da Sophie se abrirá no canto direto da sua página ](https://doc.sophie.chat/pt/wp-content/uploads/2019/12/iframe-sophie.jpg)

**OBS:** Na pasta **sample** existe um exemplo prático em HTML.

# Dependências

Dependência da biblioteca Javascript JQUERY versões 1.11 em diante.

**Se já existe** na página a ser implementada **não é necessária a sua importação**, caso necessite aponte para:

```html
<script src="https://cdnjs.com/libraries/jquery/1.11.2"></script>
```
# Wordpress

Para a instalação no Wordpress os passos são os mesmos, você precisará seguir os passos 1 e 2 da instalação no arquivo **footer.php**. Caso não tenha acesso a este arquivo você pode utilizar um plugin para modificá-lo. Lembrando que podem haver limitações de acordo com o template. Nesse teste utilizamos o plugin [Insert Headers and Footers](https://br.wordpress.org/plugins/insert-headers-and-footers/) e tivemos sucesso.
