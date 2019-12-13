function MultiSelectCommand(controller) {
    ICommand.call(this);

    this.responseText = [];

    this.controller = controller;
}

//Herda a classe abstrata ICommand
MultiSelectCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
MultiSelectCommand.prototype.constructor = MultiSelectCommand;

MultiSelectCommand.prototype.execute = function () {
    this.originalResponseText = controller.chatter.botText;
    var result = this.originalResponseText;

    var element = result;
    var htmlOptions = '<br />';
    var valueSophieMessage = this.getParameter('values', element);
    var answers = valueSophieMessage.toString();
    answers = answers.split(";");

    for (var i = 0; i < answers.length; i++) {
        var text = answers[i].trim();
         htmlOptions += 
                '<div class="checkbox">'+
                    '<label class="OptionsLabelTag">'+
                        '<input class="OptionsTag" onclick = "MultiSelect()" type = "checkbox" value = "' + text + '" >'+
                            '<span class="ckboxLabel">&ensp;' + text + '</span>'+
                        '</label>'+
                '</div>';
    }

    result = result.replace("[c:multiselect values=" + valueSophieMessage + "]", htmlOptions);

    this.controller.chatter.botText = result;
};

MultiSelectCommand.prototype.getParameter = function (name, responseText) {
    var regex = new RegExp(name + "=([^#=]*)[=|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/label|url|target|value/g, '');
};

MultiSelectCommand.prototype.isMyCommand = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var regex = /(\[c\:multiselect\]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/gi;
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
        this.responseText = results[0];
    return this.executeCommand;
}