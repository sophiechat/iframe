/**
* Classe para processar o comando de estatística
*
* @author Lincoln Kovalski Carasilo
* @class StatisticCommand
* @constructor
*/
function StatisticCommand(controller) {
   ICommand.call(this);

   this.controller = controller

   this.originalResponseText = controller.chatter.botText.replace(/\[c\:newline\]/gi, '<br />');

    
}

//Herda a classe abstrata ICommand
StatisticCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
StatisticCommand.prototype.constructor = StatisticCommand;

/**
* Método que executa o comando
*
* @method execute
* @param {String} text Texto do chatter 
* @return {String} Resposta com o link substituído
*/
StatisticCommand.prototype.execute = function () {
    this.originalResponseText = this.controller.chatter.botText;
    this.proxy.invoke('CreateStatistic', this.responseText.replace('[c:statistic:', '').replace(']', ''), this.username, this.originalResponseText);
    return this.originalResponseText.replace(/(\[c\:statistic[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g, '');
}

/**
* Método que verifica se o comando pertence a essa classe
*
* @method isMyCommand
* @param {String} text Texto do chatter 
* @return {Boolean} Retorna se é um comando dessa classe
*/
StatisticCommand.prototype.isMyCommand = function (text) {
    this.originalResponseText = text;
    var regex = /(\[c\:statistic[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g;
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