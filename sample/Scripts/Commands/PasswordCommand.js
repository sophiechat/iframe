function PasswordCommand(controller) {
    ICommand.call(this);

    this.controller = controller;
}

PasswordCommand.prototype = new ICommand();

PasswordCommand.prototype.constructor = PasswordCommand;

PasswordCommand.prototype.execute = function () {
    this.controller.chatter.botText = this.controller.chatter.botText.replace("[c:password]", "");
    controller.pw = true;
}

PasswordCommand.prototype.changediv = function (pw) {    

    switch (pw) {
        case true: document.getElementById('txtQuestion').type = "password"; break;
        case false: document.getElementById('txtQuestion').type = ""; break;
        case undefined: document.getElementById('txtQuestion').type = ""; break;
    }
}

PasswordCommand.prototype.changetext = function (text) {    
    var i = 0;
    var senha = "";
    for (i = 0; i < text.length; i++)
        senha += "*";

    return senha;
}

PasswordCommand.prototype.isMyCommand = function () {    

    if (this.controller.chatter.botText != undefined)
    {
        if (this.controller.chatter.botText.indexOf("[c:password]") != -1) {
            return true;
        }
    }
    return false;
}