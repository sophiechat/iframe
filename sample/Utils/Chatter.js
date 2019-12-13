/* Variables */
var sessionId = getCookie("sessionId");
var userName = getCookie("userName");

if(!sessionId){
    window.location.href = "index.html";
}

var chatter = 
{
    "sessionId":sessionId,"systemName":"Sophie","userLanguage":"pt","botText":null,"userText":null,
    "userInfo":{"customerId":null,"email":null,"tpUser":null,"userName":userName,"password":null},
    "uploadFileParameters" : new UploadFileConfig()
}

var printer = new MessagePrinter("#pnlHistory");
var controller = new ChatterController(chatter,printer);
var idleTime = 600000;
var intervalId;
var receiveTimeout;
    
    $(document).ready(function () {
        receiveTimeout = function () {
            $.ajax({
                url: requestPath + "/GetAnswer?id=" + sessionId,
                success: function (data) {
                    if (data == "END") {
                        $('#txtQuestion').prop("disabled", false);
                        $('#txtQuestion').focus();
                        clearInterval(intervalId);
                    }
                    else if (data != "") {
                        controller.receiveMessage(data);
                    }
                }
            });
        };

        setInterval(receiveTimeout, 500)

        $("#btnSend").click(function () {
            var sendQuestion = $('#txtQuestion').val();
            sendQuestion = sendQuestion.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            controller.sendMessage(sendQuestion, sendQuestion,true);

            $('#txtQuestion').val('');
                return false;
        });

        $(".btnLogoff").click(function(){
            delete_cookie("sessionId");
            delete_cookie("userName");
            window.location.href = "index.html";
        });

        controller.sendMessage('startup', 'startup', false);
    });

    $(document).ajaxError(function (event, request, settings) {
        debugger;
        if (request.status === 401) {
            window.location.replace("./");
        }
    });

    //Handle idle event
    $(document).bind("idle.idleTimer", function () {
        controller.timeoutCall();
    });

    $(document).idleTimer(idleTime);


	document.addEventListener("keydown", VerifyEnter);	
     function VerifyEnter(event) {
        if (event.keyCode == 13 &&  event.shiftKey) {
            var content = this.value;
            var caret = getCaret(this);

            if (content)
                this.value = content.substring(0, caret) + "\n" + content.substring(caret, content.length - 1);

            event.stopPropagation();
        } else if (event.keyCode == 8) {
            autoDecrease(event.target);
        }
        else if (event.keyCode == 13) {
            event.preventDefault();

            var sendQuestion = $('#txtQuestion').val();
            sendQuestion = sendQuestion.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            controller.sendMessage(sendQuestion, sendQuestion,true);

            $('#txtQuestion').removeAttr("style");            
            $('#txtQuestion').val('');
            return false;
        }
    };
	
	function getCaret(el) {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = el.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    }

	 var autoExpand = function (field) {
        // Reset field height
        field.style.height = 'inherit';
        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);
        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';
    };

    var autoDecrease = function (field) {
        field.style.height = 'inherit';
        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);
        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            - parseInt(computed.getPropertyValue('padding-top'), 10)
            - field.scrollHeight
            - parseInt(computed.getPropertyValue('padding-bottom'), 10)
            - parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';
    }

    function ToggleSuggestionBox(button) {
        $(button).children("i").toggleClass("fa-caret-up");
        $(button).children("i").toggleClass("fa-caret-down");
        $(button).parent().toggleClass('closed');
    }
	
	document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
            autoExpand(event.target);
    }, false);

    function RemovePlaceHolder() {
        $('#txtQuestion').removeAttr('placeholder');
    };

    document.addEventListener("focusout", AddPlaceHolder);
    function AddPlaceHolder() {
        $('#txtQuestion').attr('placeholder', 'Type a message');
    }
	
	function updateUsersConnected(){
        $.ajax({
            url: rootDir + '/GetActiveClientsCount', //?sessionId=' + this.chatter.sessionId + '&question=' + question,
            method: "GET",
            success: function (data, status) {
                $('#usersConnected').text(translation[controller.currentLanguage]['usersConnected'] + ' ' + data);
            }
        });
    }
	
	 //Altera tabamho da DIV
    function AlteraTamanho() {
        var Altura = document.getElementById('chatterDiv').style.minHeight;
        document.getElementById('chatterDiv').style.height = Altura - document.getElementById('Panel2').sty.height;

    }