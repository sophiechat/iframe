
function ImgCommand(controller) {
    ICommand.call(this);

    this.responseText = [];

    this.controller = controller;
}

//Herda a classe abstrata ICommand
ImgCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
ImgCommand.prototype.constructor = ImgCommand;

ImgCommand.prototype.execute = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var result = this.originalResponseText;
    for (var i = 0; i < this.responseText.length; i++) {
        var element = this.responseText[i];
        var url = this.getParameter('url', element);
        var width = this.getParameter('width', element);
        var height = this.getParameter('height', element);

        result = result.replace(element, '<div><div style="position: relative;"><a href="' + url + '" rel="lightbox" style="position: relative;" target="_blank"><img src="' + url + '" width="' + width + '" height="' + height + '" /></a><img src="../Content/images/lupa.png" height="20px" width="20px" style="position: absolute;right: 0px;bottom: 0px;"/></div></div>');   
    }
    this.controller.chatter.botText = result
}

ImgCommand.prototype.isMyCommand = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var regex = /(\[c\:img[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g;
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
ImgCommand.prototype.getParameter = function (name, responseText) {
    var regex = new RegExp(name + "=([^#=]*)[=|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/url|width|height/g, '');
}