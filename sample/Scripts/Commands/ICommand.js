/**
* Classe abstrata na qual todos os comandos devem ser herdados
*
* @author Lincoln Kovalski Carasilo
* @class ICommand
*/
function ICommand() {

    /**
    * Se deve executar o comando dessa classe
    * 
    * @property executeCommand
    * @type {Boolean}
    * @default false
    */
    this.executeCommand = false;
}

/**
* Método que executa o comando
*
* @method execute
* @param {String} text Texto do chatter 
*/
ICommand.prototype.execute = function (text) {

}

/**
* Método que verifica se o comando pertence a essa classe
*
* @method isMyCommand
* @param {String} text Texto do chatter 
*/
ICommand.prototype.isMyCommand = function (text) {

}