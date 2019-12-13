/**
* Classe que comanda toda a rotina de criar mensagens para exibir na tela
*
* @author Lincoln Kovalski Carasilo
* @class MessagePrinter
* @constructor
*/
function MessagePrinter(div, user) {

    /**
    * "Foto" do sistema no chat
    * 
    * @property robotIcon
    * @type {String}
    * @default "face-robot.png"
    */
    this.robotIcon = "face-robot.png";

    /**
    * "Foto" do usuário
    * 
    * @property userIcon
    * @type {String}
    * @default "default-user-icon-profile.png"
    */
    this.userIcon = "default-user-icon-profile.png";

    /**
    * Alinhamento das mensagens do usuário
    * 
    * @property userMessageAlign
    * @type {String}
    * @default "right"
    */
    this.userMessageAlign = "right";

    /**
    * Alinhamento das mensagens do usuário
    * 
    * @property robotMessageAlign
    * @type {String}
    * @default "left"
    */
    this.robotMessageAlign = "left";

    /**
    * Div que receberá o conteúdo das mensagens
    * 
    * @property div
    * @type {div}
    */
    this.div = div;

}

// Create Element.remove() function if not exist  IE compatibility
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

/**
* Método que verifica se o comando pertence a essa classe
*
* @method createDivMessage
* @param {String} systemName Nome do bot
* @param {String} who Autor da mensagem
* @param {String} text Mensagem
* @param {bool} text Sinaliza se a próxima mensagem será uma senha
*/
MessagePrinter.prototype.createDivMessage = function (systemName, who, text, pw) {
    
    // Remove a dive com o "..."
    this.removeWritingDiv();

    // Close all suggestion boxes
    $('.suggestions-box:not(.closed)').each(function () {
        ToggleSuggestionBox($(this).children('.suggestion-button')[0]);
    })

    var reSuggestions = new RegExp('<a href=\"javascript:;\"[\\s\\S]*<\/a>');
    var reRemoveBr = new RegExp('^<br/>');

    var suggestions = ''

    if (reSuggestions.test(text)) {
        suggestions = reSuggestions.exec(text)[0];
        text = text.replace(suggestions, '');
        suggestions = suggestions.replace(reRemoveBr, '');
    }

    var currentdate = new Date();
    var time = currentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var align = '';
    var image = '';
    if (who == "bot") {
        align = this.robotMessageAlign;
        image = this.robotIcon;
        who = systemName;
    }
    else {
        align = this.userMessageAlign;
        image = this.userIcon;
        text = text.replace(/\[s:useful ruleId=[0-9]+ opinion=[0-9]\]/gi, '');
    }

    if (this.flagpw == true) {
        text = (new PasswordCommand).changetext(text);
    }

	var messageBox = this.createMessageBox(align, image, who, systemName, text, suggestions, time);

    $(this.div)[0].appendChild(messageBox);

    eval($(messageBox).find("script").text());
    $('#chatterDiv').animate({ scrollTop: $('#chatterDiv').prop("scrollHeight") }, '0');

    (new PasswordCommand).changediv(pw);

    this.flagpw = pw;
	
	/*
    var html =
            "<div class='row "+ align + "' style='margin-right: 0px;'>" +
            "<div class='col-xs-11'>" +
            "<div class='bubble-"+ align + "' >" +
            "<div style='display: inline-block; width: 80%;'>" +
            "<p " + (who == systemName ? "class='bot-name'" : "class='user-name'") + ">"+ who +"</p>" +
            "<p>"+ text.replace('language', '') +"</p>"
    if(align == 'left'){
            html += "<p class='text-left txt-data'>"+ time +"</p></div>"
        } else {
            html += "<p class='text-left txt-data-r'>"+ time +"</p></div>"
        }
    if(align == 'right') {
        html += "<div style='width: 20%; float: right;'>" +
        "<img class='img-responsive center-block' src='content/images/avatar01.png' alt='User' style='max-height: 65px; padding-bottom: 5px;'></div>"
    }

    if (suggestions != '') {
        html += "</div><div class='area-resposta'>"+ suggestions +"</div>";
    }

    html += "</div>" +
            "</div>" +
            "</div>";
    $(this.div).html($(this.div).html() + html);
	
	
    
    eval($(messageBox).find("script").text());
    $('#chatterDiv').animate({ scrollTop: $('#chatterDiv').prop("scrollHeight") }, '0');

    var positivo = $(".fa-smile-o");
    positivo.click(function() {
        $( this ).toggleClass( "navy" );
        negativo.removeClass("navy");
      });

    var negativo = $(".fa-meh-o");
    negativo.click( function(){
        $(this).toggleClass("navy");
        positivo.removeClass("navy");
    });

    (new PasswordCommand).changediv(pw);

    this.flagpw = pw; */
};

/**
* Método que cria uma div temporária indicando que o bot está escrevendo
*
* @method createWritingDiv
*/
MessagePrinter.prototype.createWritingDiv = function (){
    var align = '';
    var image = '';

    this.removeWritingDiv();

    align = this.robotMessageAlign;
    image = this.robotIcon;
	
	var element = document.createElement('div');
    element.setAttribute('id', 'writingDiv');
    element.setAttribute('class', "row message-box");

    var child1 = document.createElement('div');
    child1.setAttribute('class','col-md-6 col-xs-11');

    var child2 = document.createElement('div');
    child2.setAttribute('class', 'bubble-left');
    child2.innerHTML = "<p>Sophie</p>";

	var child3 = document.createElement('div');
	child3.setAttribute("class","typings");
	var messageSpan = document.createElement('span');
    messageSpan.setAttribute('class', 'typing1');
	var messageSpan2 = document.createElement('span');
    messageSpan2.setAttribute('class', 'typing2');
	var messageSpan3 = document.createElement('span');
    messageSpan3.setAttribute('class', 'typing3');
	
	child3.appendChild(messageSpan);
	child3.appendChild(messageSpan2);
	child3.appendChild(messageSpan3);
	
    child2.appendChild(child3);
	child1.appendChild(child2);
    element.appendChild(child1);
		
    $(this.div)[0].appendChild(element);

	$('#chatterDiv').animate({ scrollTop: $('#chatterDiv').prop("scrollHeight") }, '0');
}


/**
* Método que remove a div temporária indicando que o bot está escrevendo
*
* @method removeWritingDiv
*/
MessagePrinter.prototype.removeWritingDiv = function () {
    if (document.getElementById("writingDiv") != undefined) {
        document.getElementById("writingDiv").remove();
    }
    clearInterval(this.timeWritingDots);
}

MessagePrinter.prototype.createMessageBox = function (align, image, who, systemName, text, suggestions, time) {
    
	var element = document.createElement('div');
    element.setAttribute('class', "row " + align);
	element.setAttribute('style', "margin-right: 0px");
	
	var child1 = document.createElement('div');
	child1.setAttribute('class', "col-xs-11");
	
	var child2 = document.createElement('div');
	child2.setAttribute('class', "bubble-"+ align);

	child1.appendChild(child2);
	var child3 = document.createElement('div');
    child3.setAttribute('style', 'display: inline-block; width: 80%;');
    child3.innerHTML = "<p " + (who == systemName ? "class='bot-name'" : "class='user-name'") + ">" + who + "</p> <p>"+ text.replace('language', '') +"</p>";

	if(align == 'left'){
		child3.appendChild(this.createTimesStamp("txt-data", time));
	}
	else{
		child3.appendChild(this.createTimesStamp("txt-data-r", time));
		var child4 = document.createElement('div');
        child4.setAttribute("style","width: 20%; float: right;");
        //child4.appendChild(this.createPicture("avatar01.png")); not tested

        child2.appendChild(child4);
    }
	
	child2.appendChild(child3);
	child1.appendChild(child2);

    if (suggestions != '') {
        child1.appendChild(this.createSuggestion(suggestions));
    }
	
    element.appendChild(child1);

    return element;
}

MessagePrinter.prototype.createPicture = function (image) {
    var element = document.createElement('img');
    element.setAttribute('alt', 'User');
    element.setAttribute('style', 'max-height: 65px; padding-bottom: 5px;');
    element.setAttribute('src', contentDir + "Content/images/" + image);
    element.setAttribute('onerror', "\"this.src = 'Default.jpg'\"");

    return element;
}

MessagePrinter.prototype.createTitle = function (who, systemName) {
    var messageTitle = document.createElement('span');
    messageTitle.setAttribute('class', (who == systemName ? "bot-name" : "user-name"));
    messageTitle.innerText = who;

    return messageTitle;
}

MessagePrinter.prototype.createTimesStamp = function (classAlign, time) {
    var element = document.createElement('p');
    element.setAttribute('class', 'text-left ' + classAlign);
    element.innerText = time;

    return element;
}

MessagePrinter.prototype.createSuggestion = function (suggestions) {
    var element = document.createElement('div');
    element.setAttribute('class', 'area-resposta');
	element.innerHTML = suggestions;

    return element;
}