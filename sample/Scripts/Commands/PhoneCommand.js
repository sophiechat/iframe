
function PhoneCommand(controller) {
    ICommand.call(this);

    this.responseText = [];

    this.controller = controller;
}

//Herda a classe abstrata ICommand
PhoneCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
PhoneCommand.prototype.constructor = PhoneCommand;

PhoneCommand.prototype.execute = function () {
    this.originalResponseText = controller.chatter.botText;
    var result = this.originalResponseText;

    if (result.includes("[c:phone]"))
        result = result.split('[c:phone]')[0];

    //result = result.replace(/\[c\:newline\]/gi, '<br />');

    this.controller.chatter.botText = result
}

PhoneCommand.prototype.isMyCommand = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var regex = /(\[c\:phone\]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/gi;
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