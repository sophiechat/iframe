function ChatterController(chatter, printer) {
    this.chatter = chatter;
    this.printer = printer;
    this.currentLanguage = chatter.userLanguage;
    this.liveAgent = false;
}

ChatterController.prototype.sendMessage = function (label, question, display, language) {

    if (question != '') {
        //$('#txtQuestion').prop("disabled", true);

        if (display) {
            this.printer.createDivMessage(this.chatter.systemName, this.chatter.userInfo.userName, label);
        }

        if (this.liveAgent === false)
            this.statusConversation("writing");

        this.chatter.userText = question;
        this.chatter.botText = "";
        this.chatter.userLanguage = language;

        var formData = new FormData();

        $.ajax({
            url: requestPath + 'GetConversation',
            cache: false,
            data: this.chatter,
            method: "POST",
            context: this,
            success: function () {
                //clearInterval(intervalId);
                //intervalId = setInterval(receiveTimeout, 500);
            },
            error: function (error) {
                this.statusConversation("offline");
                console.log("Error getting answer of the question. Error: " + error);
            }
        });
    }
};

ChatterController.prototype.receiveMessage = function (data) {

    this.chatter.botText = data.botText;
    this.chatter.userLanguage = data.userLanguage;
    this.liveAgent = (/true/i).test(data.liveAgent);
    this.pw = false;

    if (controller.chatter.botText != '') {

        //text = this.chatter.botText;
        var commands = [];

        commands.push(new PhoneCommand(controller));
        commands.push(new LinkCommand(this));
        commands.push(new NewLineCommand(this));
        commands.push(new ImgCommand(this));
        commands.push(new PasswordCommand(this));
        commands.push(new UploadCommand(this));
        commands.push(new MultiSelectCommand(controller));

        var poscommands = [];

        //comandos antes da resposta
        for (var i = 0; i < commands.length; i++)
            if (commands[i].isMyCommand())
                commands[i].execute();
    }

    this.chatter.botText.split("[c:newdialog]").forEach(function (item) {

        //if (item.includes("[@user@]")) {
        if (item.indexOf("[@user@]") > 0) {

            //if (!item.includes("[@user@]startup")) {
            if (item.indexOf("[@user@]startup") == -1) {

                var userResp = item.replace("[@user@]", "");
                controller.printer.createDivMessage(controller.chatter.systemName, "user", userResp, controller.pw);
            }

        } else {

            if (item.trim() != "")
                controller.printer.createDivMessage(controller.chatter.systemName, "bot", item, controller.pw);
        }
    });

    if (this.chatter.userLanguage !== this.currentLanguage) {
        this.refreshLanguage();
    }

    this.statusConversation("online");
}

ChatterController.prototype.statusConversation = function (text) {
    if (text == "writing") {
        this.printer.createWritingDiv();
        this.updateStatusView(this.chatter.systemName + translation[this.currentLanguage]['isWriting']);
    }
    else if (text == "online") {
        this.printer.removeWritingDiv();
        this.updateStatusView(translation[this.currentLanguage]['pleaseType']);
    }
    else if (text == "sending") {
        this.printer.removeWritingDiv();
        this.updateStatusView(translation[this.currentLanguage]['sending']);
    }
    else {
        this.printer.removeWritingDiv();
        this.updateStatusView(translation[this.currentLanguage]['isOffline']);
    }
}

ChatterController.prototype.updateStatusView = function (status) {
    $('div[data-chatter="bot-status"]').text(status);
}

ChatterController.prototype.timeoutCall = function () {
    this.sendMessage('timeoutcall', 'timeoutcall', false);
}

ChatterController.prototype.refreshLanguage = function () {
    this.currentLanguage = this.chatter.userLanguage;

    if (this.currentLanguage in translation) {
        $('#headerTitle').text(translation[this.currentLanguage]['title']);
        $('#btnSend').text(translation[this.currentLanguage]['send']);
        $('#txtQuestion').attr("placeholder", translation[this.currentLanguage]['questionPlaceHolder']);
        $('#h6Logoff').html(translation[chatter.userLanguage]['logoff']);
        $('#h6TitleChatter').html(translation[chatter.userLanguage]['title']);
    }
    else
        this.currentLanguage = 'en';
    
}