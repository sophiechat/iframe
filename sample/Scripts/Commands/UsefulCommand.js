/**
* Classe para processar o comando de essa tag foi útil
*
* @author Lincoln Kovalski Carasilo
* @class UsefulCommand
* @constructor
*/
function UsefulCommand(responseText, receiveMessage, systemName) {
    ICommand.call(this);

    /**
    * Textos extraidos
    * 
    * @property responseText
    * @type {String}
    * @default ""
    */
    this.responseText = responseText;

    /**
    * Texto de resposta pertencente a classe
    * 
    * @property responseTextOld
    * @type {String}
    * @default ""
    */
    this.originalResponseText = this.responseText.replace(/\[c\:useful\]/gi, '<br />');

    /**
    * Lista de perguntas de satisfação
    * 
    * @property usefulQuestions
    * @type array
    * @default []
    */
    this.usefulQuestions = [];

    /**
    * Método de exibir a mensagem do HAW
    * 
    * @property receiveMessage
    * @type function
    * @default null
    */
    this.receiveMessage = receiveMessage;

    /**
    * Nome do sistema
    * 
    * @property systemName
    * @type {String}
    * @default ""
    */
    this.systemName = systemName;

    /**
    * Regex representando o comando
    * 
    * @property commandRegex
    * @type {Regex}
    * @default ""
    */
    this.commandRegex = /(\[c\:useful[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g;

    this.usefulQuestions.push('A resposta que você recebeu foi útil?');
    this.usefulQuestions.push('A sua dúvida foi esclarecida como esperava?');
    this.usefulQuestions.push('A sua pergunta foi bem respondida?');
    this.usefulQuestions.push('A resposta que recebeu ajudou você?');
}

//Herda a classe abstrata ICommand
UsefulCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
UsefulCommand.prototype.constructor = UsefulCommand;

/**
* Método que executa o comando
*
* @method execute
* @param {String} text Texto do chat
* @return {String} Mensagem de resposta do chat
*/
UsefulCommand.prototype.execute = function (text) {
    var message = this.usefulQuestions[Math.floor(Math.random() * this.usefulQuestions.length)];
    var printer = new MessagePrinter();
    var ruleId = this.getParameter('ruleId', this.originalResponseText);
    printer.createDivMessage(systemName, "bot", message + '<br/>' +
                                                '<a href="javascript:;" onclick="computeOpinion(\'sim [s:useful ruleId=' + ruleId + ' opinion=1]\')">Sim</a> ou ' +
                                                '<a href="javascript:;" onclick="computeOpinion(\'não [s:useful ruleId=' + ruleId + ' opinion=0]\')">Não</a>',
                                                $("#pnlHistory"));
    return text;
}

/**
* Método que verifica se o comando pertence a essa classe
*
* @method isMyCommand
* @param {String} text Texto do chat
* @return {Boolean} Retorna se é um comando dessa classe
*/
UsefulCommand.prototype.isMyCommand = function (text) {
    var regex = this.commandRegex;
    var results = [], result;
    while ((result = regex.exec(this.responseText)) !== null) {
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

/**
* Método que obtém o valor de um parâmetro dentro do responseText
*
* @method getParameter
* @param {String} name Nome do parâmetro a se obter o valor
* @return {String} Retorna o valor do parâmetro
*/
UsefulCommand.prototype.getParameter = function (name, responseText) {
    var regex = new RegExp(name + "=([^#=]*)[=|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/ruleId|opinion/g, '');
}