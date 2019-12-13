
function LinkCommand(controller) {
    ICommand.call(this);

    this.responseText = [];

    this.controller = controller;
}

//Herda a classe abstrata ICommand
LinkCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
LinkCommand.prototype.constructor = LinkCommand;

function desativa() {
    var botaodesativado = $(".btn-info");
    botaodesativado.attr("disabled", true);
    botaodesativado.addClass("desativado");
};

function esconde() {
    var areacards = $(".area-resposta-cards");
    areacards.click(this).addClass("disabled");
};

function multiplaescolha() {

    var checkboxes = document.getElementsByName('escolhas');
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    document.getElementById("txtQuestion").value = checkboxesChecked;

}

LinkCommand.prototype.execute = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var result = this.originalResponseText;
    for (var i = 0; i < this.responseText.length; i++) {
        var element = this.responseText[i];
        var url = this.getParameterUrl(element);
        var target = this.getParameter('target', element);
        var valueSophieMessage = this.getParameter('value', element);
        valueSophieMessage = valueSophieMessage.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        var label = this.getParameter('label', element);
        var language = this.getParameter('language', element);

        if (language === '')
            language = this.controller.chatter.userLanguage;

        if (url == '') {
            if (label == '') {
                label = element.replace(/\[c:link /g, '').replace(']', '');
            }
			
			var escapeLabel = label.replace(/'/g, "\\'").replace(/"/g, "&quot;");

            if (valueSophieMessage === '')
                result = result.replace(element, '<a href="javascript:;" onclick="controller.sendMessage(\'' + escapeLabel + '\',\'' + escapeLabel + '\',true,\'' + language + '\'); desativa();" class="btn btn-info mr10 mb10">' + label + '</a>');
            else {
                result = result.replace(element, '<a href="javascript:;" onclick="controller.sendMessage(\'' + escapeLabel + '\',\'' + valueSophieMessage + '\',true,\'' + language + '\'); desativa();" class="btn btn-info mr10 mb10">' + label + '</a>');
            }
        }
        else {
            result = result.replace(element, '<a href="' + url + '" target="' + target + '">' + label + '<i class="fa fa-external-link"></i></a>');
        }
    }

    this.controller.chatter.botText = result;
}

LinkCommand.prototype.isMyCommand = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var regex = /(\[c\:link[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g;
    var results = [], result;
    while ((result = regex.exec(this.originalResponseText)) !== null) {
        var text = '';
        if (result != null && result.length > 1) {
            for (var i = 1; i < result.length; i++)
                if (result[i] != undefined)
                    text += result[i];
            results.push(text);
        }
    }
    this.executeCommand = results.length > 0;
    if (this.executeCommand)
        this.responseText = results;
    return this.executeCommand;
}

/**
* Método que obtém o valor de um parâmetro dentro do responseText
*
* @method getParameter
* @param {String} name Nome do parâmetro a se obter o valor
* @return {String} Retorna o valor do parâmetro
*/
LinkCommand.prototype.getParameter = function (name, responseText) {
    var regex = new RegExp(name + "=([^#=]*)[=|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/ language| label| url| target| value/g, '');
}

/**
* Método que obtém o valor da url dentro do responseText
*
* @method getParameter
* @param {String} name Nome do parâmetro a se obter o valor
* @return {String} Retorna o valor do parâmetro
*/
LinkCommand.prototype.getParameterUrl = function (responseText) {
    var regex = new RegExp('url' + "=([^\\s]*)[\\s|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/ language| label| url| target| value/g, '');
}
