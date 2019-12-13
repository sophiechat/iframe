var filesUpload = [];
var lastUploadsControls = 0;
var defaultHeight = 0;
var multiple = false;
var attempt = 1;
var iTimer = 0;


function UploadCommand(controller) {
    ICommand.call(this);

    this.responseText = [];

    this.controller = controller;
}

//Herda a classe abstrata ICommand
UploadCommand.prototype = new ICommand();

//Acerta o construtor pois agora está apontando para ICommand
UploadCommand.prototype.constructor = UploadCommand;

UploadCommand.prototype.execute = function () {    
    this.originalResponseText = this.controller.chatter.botText;
    var result = this.originalResponseText;
    for (var i = 0; i < this.responseText.length; i++) {

        var element = this.responseText[i];
        var htmlUpload = "";   

        // reseting
        multiple = false;
        attempt = (attempt > controller.chatter.uploadFileParameters.fileMaxAttempt ? 1 : attempt); // somente reinicia se ultrapassou numero de tentativas        

        if (element.indexOf('multiple=true') != -1)
            multiple = true;
               

        filesUpload = new Array(); // zera o array que contem os arquivos
        lastUploadsControls++ // variavel para controle dos elementos        

        // ultima mensagem enviada
        lastCommand = this.responseText[i]; // para caso o usuário clique não enviar e seja obrigatório

        // trava interacao com o usuario
        $('#txtQuestion').prop("disabled", true);
        $('#btnSend').prop("disabled", true);        

        htmlUpload += '<br />';
        
        if (attempt > 1)
            htmlUpload += '<span style=\"color:red;\">' + controller.chatter.uploadFileParameters.fileAttemptAlert + '</span>';

        htmlUpload += '<br /><div id=\"filesToUpload' + lastUploadsControls + '\" style=\"height: 0px;overflow-y:auto;\"></div>';

        htmlUpload += '<input class=\"btn btn-info mr10 mb10\" type=\"button\" id=\"btSelectFiles' + lastUploadsControls + '\" ' + (multiple ? 'value=\"' + translation[controller.currentLanguage]['selectFiles'] + '\"' : 'value=\"' + translation[controller.currentLanguage]['selectFile'] + '\"') + '\" onclick=\"javascript:if(checkActualControl(' + lastUploadsControls + ')) userFile' + lastUploadsControls + '.click(); \" >'
        htmlUpload += '<input class=\"btn btn-info mr10 mb10\" style="display:none" id=\"userFile' + lastUploadsControls + '\" name=\"userFile' + lastUploadsControls + '\" onchange=\"changeFileList(' + lastUploadsControls + '); \" type=\"file\"  ' + (multiple ? 'multiple=\"multiple\"' : '') + ' "/>'

        htmlUpload += '<input class=\"btn btn-info mr10 mb10\" id=\"formsubmit' + lastUploadsControls + '\" type=\"submit\" onclick=\"uploadFiles(' + lastUploadsControls + '); return false;\"' + (multiple ? 'value=\"' + translation[controller.currentLanguage]['sendFiles'] + '\"' : 'value=\"' + translation[controller.currentLanguage]['sendFile'] + '\"') + ' />';
        //htmlUpload += '<input class=\"input-margin\" id=\"btClearFiles' + lastUploadsControls + '\" type=\"button\" onclick=\"clearFiles(' + lastUploadsControls + ');\"' + (multiple ? 'value=\"Limpar Arquivos\"' : 'value=\"Limpar Arquivo\"') + '/>';

        htmlUpload += '<input class=\"btn btn-danger mr10 mb10\" id=\"btNotSend' + lastUploadsControls + '\" type=\"button\" onclick=\"notSend(' + lastUploadsControls + ');\" value=\"' + translation[controller.currentLanguage]['cancel'] + '\" />';

        htmlUpload += '<br />'
        htmlUpload += '<div id=\"error' + lastUploadsControls + '\" style=\"color:red;display:none;\"></div>'
        htmlUpload += '<br />';
        //htmlUpload += '<div style=\"width:20%; margin:0;\"><div class=\"w3-light-grey w3-round\" id=\"progressbar' + lastUploadsControls + '\" style=\"display:none;width:100%;\"><span id=\"spanProgress' + lastUploadsControls + '\"></span><nobr><div id=\"intProgressBar' + lastUploadsControls + '\" class=\"w3-container w3-round w3-green\" style=\"width:0%;\"></div></nobr></div></div>';

        htmlUpload += '<div style=\"width:20%; margin:0;\"><div class="progress" id=\"progressbar' + lastUploadsControls + '\" style=\"display:none;width:100%;\"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:0%">0%</div></div></div>'

        result = result.replace(element, htmlUpload);
    }

    this.controller.chatter.botText = result;
}

UploadCommand.prototype.isMyCommand = function () {
    this.originalResponseText = this.controller.chatter.botText;
    var regex = /(\[c\:upload[^\[\]]*)+(\s*\[[^\[\]]*\]\s*)*([^\[\]]*\])*/g;
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
UploadCommand.prototype.getParameter = function (name, responseText) {
    var regex = new RegExp(name + "=([^#=]*)[=|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/label|url|target/g, '');
}

/**
* Método que obtém o valor da url dentro do responseText
*
* @method getParameter
* @param {String} name Nome do parâmetro a se obter o valor
* @return {String} Retorna o valor do parâmetro
*/
UploadCommand.prototype.getParameterUrl = function (responseText) {
    var regex = new RegExp('url' + "=([^#\\s]*)[\\s|\\]]"), results = regex.exec(responseText);
    return results === null ? "" : results[1].replace(/label|url|target/g, '');
}

function printFileNames(lastIdControl) {

    if (lastIdControl == lastUploadsControls) {

        if (filesUpload.length <= controller.chatter.uploadFileParameters.fileMaxQty) {

            $('#error' + lastIdControl).html("");
            $('#error' + lastIdControl).hide();
        }

        // initial values
        $('#userFile' + lastIdControl).parent().parent().height(defaultHeight);
        $("#filesToUpload" + lastIdControl).empty();
        $('#filesToUpload' + lastIdControl).height(0);

        for (var index = 0; index < filesUpload.length; index++) {

            if (window.FormData != undefined)
                $("#filesToUpload" + lastIdControl).append("<a class=\"bt-close\" id=\"linkFile" + lastIdControl + "_" + index + "\" href=\"javascript:removeFile(" + index + "," + lastIdControl + ");\"><i class=\"fa fa-times-circle btn-cancelUp\" aria-hidden=\"true\" /></a><span style=\"font-weight:normal!important;" + (filesUpload[index].size > controller.chatter.uploadFileParameters.fileMaxSize ? "color:red;" : "") + "\">" + filesUpload[index].name + "</span><br />");
            else
                $("#filesToUpload" + lastIdControl).append("<a class=\"bt-close\" id=\"linkFile" + lastIdControl + "_" + index + "\" href=\"javascript:removeFile(" + index + "," + lastIdControl + ");\"><i class=\"fa fa-times-circle btn-cancelUp\" aria-hidden=\"true\" /></a><span style=\"font-weight:normal!important;" + (filesUpload[index].size > controller.chatter.uploadFileParameters.fileMaxSize ? "color:red;" : "") + "\">" + filesUpload[index] + "</span><br />");

            if (index < controller.chatter.uploadFileParameters.filesWithoutScroll) {
                $('#filesToUpload' + lastIdControl).height($('#filesToUpload' + lastIdControl).height() + 17);
                $('#userFile' + lastIdControl).parent().parent().height($('#userFile' + lastIdControl).parent().parent().height() + 17);
            }
        }

        window.scrollTo(0, document.body.scrollHeight);
    }
}

function changeFileList(lastIdControl) {

    if (lastIdControl == lastUploadsControls) {

        var userFile = document.getElementById("userFile" + lastIdControl);

        // no final dessa funcao, o controle é limpo, o que causa a chamada em cascata
        if (userFile.value == '')
            return;

        if (filesUpload != null && filesUpload.length == 0)
            defaultHeight = $('#userFile' + lastIdControl).parent().parent().height();

        // validando qtde de arquivos
        if ($('#userFile' + lastIdControl)[0].multiple && filesUpload != null && filesUpload.length > 0) {

            if ($('#userFile' + lastIdControl)[0].files.length + filesUpload.length > controller.chatter.uploadFileParameters.fileMaxQty) {

                $('#userFile' + lastIdControl).parent().parent().height($('#userFile' + lastIdControl).parent().parent().height() + 10);
                $('#error' + lastIdControl).html(controller.chatter.uploadFileParameters.fileMaxQtyError + (controller.chatter.uploadFileParameters.fileMaxQty));
                $('#error' + lastIdControl).show();

                userFile.value = '';
                userFile.type = '';
                userFile.type = 'file';

                return;
            }
        }

        // senao tiver multiplos arquivos, sempre zerar o array
        if (!$('#userFile' + lastIdControl)[0].multiple)
            filesUpload = [];

        if ('files' in userFile) {

            for (var index = 0; index < userFile.files.length; index++) {
                filesUpload.push(userFile.files[index]);
            }

        }
        else {
            filesUpload.push($('#userFile' + lastIdControl).val());
        }

        printFileNames(lastIdControl);

        if (window.FormData != undefined) {

            userFile.value = '';
            userFile.type = '';
            userFile.type = 'file';

        }

    }


}

function uploadFiles(lastIdControl) {

    if (lastIdControl == lastUploadsControls) {

        var exceedFileSize = false;

        if (window.FormData == undefined) {

            if ($('#userFile' + lastIdControl).val() != '' && (filesUpload != null && filesUpload.length > 0)) {

                $('#userFile' + lastIdControl).parent().parent().height($('#userFile' + lastIdControl).parent().parent().height() + 10);
                $('#progressbar' + lastIdControl).show();

                timeFileUpload = window.setInterval(function () { loadMsg(lastIdControl) }, 500);

                var iframe = null;

                if (document.getElementById("postIframe" + lastIdControl) == null) {
                    iframe = $('<iframe name="postIframe' + lastIdControl + '" id="postIframe' + lastIdControl + '" style="display: none"></iframe>');
                    $("body").append(iframe);
                }

                iframe = document.getElementById("postIframe" + lastIdControl);

                $("body").append(iframe);

                var form = $('#form2');

                form.attr("action", contentDir + "../api/UploadFile/UploadFile?sessionId=" + controller.chatter.sessionId + "&controlId=" + lastIdControl); 
                form.attr("method", "post");

                form.attr("encoding", "multipart/form-data");
                form.attr("enctype", "multipart/form-data");

                form.attr("target", "postIframe" + lastIdControl);
                form.attr("file", $('#userFile' + lastIdControl).val());
                form.submit();

                $("#postIframe" + lastIdControl).load(function () {

                    iframeContents = this.contentWindow.document.body.innerHTML;
                    eventsAfterUpload(iframeContents, lastIdControl);

                });
            }
        }
        else {

            if (filesUpload != null && filesUpload.length > 0) {

                exceedFileSize = false;
                for (var index = 0; index < filesUpload.length; index++) {
                    if (filesUpload[index].size > controller.chatter.uploadFileParameters.fileMaxSize)
                        exceedFileSize = true;
                }

                if (exceedFileSize) {

                    $('#userFile' + lastIdControl).parent().parent().height($('#userFile' + lastIdControl).parent().parent().height() + 10);
                    $('#error' + lastIdControl).html(controller.chatter.uploadFileParameters.fileMaxSizeError + ((controller.chatter.uploadFileParameters.fileMaxSize / 1024) / 1024) + "MB");
                    $('#error' + lastIdControl).show();
                    return;

                }
                else {

                    $('#userFile' + lastIdControl).parent().parent().height($('#userFile' + lastIdControl).parent().parent().height() + 10);
                    $('#progressbar' + lastIdControl).show();
                    $('#error' + lastIdControl).hide();

                    timeFileUpload = window.setInterval(function () { loadMsg(lastIdControl) }, 500);

                    var formData = new FormData();

                    for (var index = 0; index < filesUpload.length; index++) {
                        formData.append("file", filesUpload[index]);
                    }

                    

                    $.ajax({
                        url: contentDir + '../api/UploadFile/UploadFile?sessionId=' + controller.chatter.sessionId, // + "&controlId=" + lastIdControl, // + "&socketId=" + controller.service.proxy.connection.id,
                        crossDomain: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: formData,
                        method: 'post',
                        xhr: function () {
                            var xhr = $.ajaxSettings.xhr();
                            xhr.upload.onprogress = function (e) {
                                if (e.lengthComputable) {
                                    percentage = (e.loaded / e.total * 100).toFixed(0);

                                    //var x = document.getElementById('spanProgress' + lastIdControl);
                                    //var txt = document.createTextNode("");
                                    //x.innerText = txt.textContent;

                                    clearInterval(timeFileUpload);

                                    //$('#progressbar' + lastIdControl).css('text-align', 'center');
                                    $('#progressbar' + lastIdControl).children().first().css('width', percentage + '%');

                                    $('#progressbar' + lastIdControl).children().first().text(percentage + '%');
                                }
                            };
                            return xhr;
                        },
                    }).
                    done(function (response) {

                        eventsAfterUpload(response, lastIdControl);

                    }).
                    fail(function () {

                        // validacao é feita no servidor
                        controller.sendMessage(controller.chatter.uploadFileParameters.msgUploadSucess, controller.chatter.uploadFileParameters.msgUploadSucess, false);

                        /*
                        controller.service.proxy.invoke('SetContextValue', 'filesUploaded', '', controller.service.userInfo.sessionId).done(function () {
                            controller.service.sendMessage(msgUploadSucess, false);
                        });
                        */

                    });
                }
            }
        }
    }
}

function removeFile(subscript, lastIdControl) {

    if (lastIdControl == lastUploadsControls) {

        if (!$('#btSelectFiles' + lastIdControl).prop("disabled")) {

            if (filesUpload != null) {
                if (filesUpload.length >= (subscript + 1))
                    filesUpload.splice(subscript, 1);
            }

            printFileNames(lastIdControl);
        }
    }

}

function clearFiles(lastIdControl) {

    if (lastIdControl == lastUploadsControls) {
        var userFile = document.getElementById("userFile" + lastIdControl);
        userFile.value = '';
        userFile.type = '';
        userFile.type = 'file';
        $("#filesToUpload" + lastIdControl).empty();
        filesUpload = [];
        $('#userFile' + lastIdControl).parent().parent().height(defaultHeight);
        $('#error' + lastIdControl).hide();
        $('#filesToUpload' + lastIdControl).height(0);
    }
}

function checkActualControl(lastIdControl) {

    if (lastIdControl != lastUploadsControls)
        return false;
    else
        return true;

}

function notSend(lastIdControl) {
    if (lastIdControl == lastUploadsControls) {

        $('#txtQuestion').prop("disabled", false);
        $('#btnSend').prop("disabled", false);

        $('#filesToUpload' + lastIdControl + ' a').click(function (e) {
            e.preventDefault();
        });
        $('#userFile' + lastIdControl).prop("disabled", true);
        //$('#btClearFiles' + lastIdControl).prop("disabled", true);
        $('#formsubmit' + lastIdControl).prop("disabled", true);
        $('#btSelectFiles' + lastIdControl).prop("disabled", true);
        $('#btNotSend' + lastIdControl).prop("disabled", true);

        controller.sendMessage(controller.chatter.uploadFileParameters.msgFileNotSent, controller.chatter.uploadFileParameters.msgFileNotSent, false);

        clearInterval(timeFileUpload);

    }

}

function eventsAfterUpload(responseCode, lastIdControl) {

    // garantindo o pause
    clearInterval(timeFileUpload);

    var responseToBotter = '';

    $('#filesToUpload' + lastIdControl + ' a').click(function (e) {
        e.preventDefault();
    });
    $('#userFile' + lastIdControl).prop("disabled", true);
    //$('#btClearFiles' + lastIdControl).prop("disabled", true);
    $('#formsubmit' + lastIdControl).prop("disabled", true);
    $('#btSelectFiles' + lastIdControl).prop("disabled", true);
    $('#btNotSend' + lastIdControl).prop("disabled", true);

    $('#txtQuestion').prop("disabled", false);
    $('#btnSend').prop("disabled", false);

    if (responseCode == 200) {
        responseToBotter = controller.chatter.uploadFileParameters.msgUploadSucess;
    }
    else {

        $('#progressbar' + lastIdControl).hide();
        $('#progressbar' + lastIdControl).children().first().css('width', '0%');

        responseToBotter = controller.chatter.uploadFileParameters.msgUploadSucess;
    }

    controller.sendMessage(responseToBotter, responseToBotter, false);

    //window.scrollTo(0, document.body.scrollHeight);

}

function loadMsg(lastIdControl) {

    var x = document.getElementById('spanProgress' + lastIdControl);

    var text = translation[controller.currentLanguage]['sendingFiles'];
    iTimer++;

    if (iTimer == 1)
        text = text + '.';
    else if (iTimer == 2)
        text = text + '..';
    else if (iTimer == 3) {
        text = text + '...';
        iTimer = 0;
    }

    var txt = document.createTextNode(text);
    x.innerText = txt.textContent;

}