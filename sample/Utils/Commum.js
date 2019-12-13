var translation = {};
var userLang = navigator.language || navigator.userLanguage;

if (userLang != "zh-CHS")
    userLang = userLang.split("-")[0];

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "Translations/translations.xml",
        async: false,
        cache: false,
        dataType: "xml",
        success: function(xml){
            $(xml).find("langs").each(function(){
                var doc = $(this)[0].children;
                for(var i=0; i < doc.length; i++){
                    var options = {};
                    for(var j=0; j < doc[0].children.length; j++) {
                        options[doc[i].children[j].localName] = doc[i].children[j].textContent;
                    }
                    translation[doc[i].localName] = options;
                }
            })
        },
        crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
    }).done(function(){
        translation = translation;
    });

    if (translation[userLang] == null)
    userLang = "en";

    // Set Language!
    $("#welcomeLogin").append(translation[userLang].welcome);
    $("#btn-login").append(translation[userLang].login);
    $("#btn-forgot").append(translation[userLang].forgotPassword);
    $("#name").attr("placeholder", translation[userLang].enterUserName);
    $("#password").attr("placeholder", translation[userLang].enterPassword);
    $("#invalidCredentials").append(translation[userLang].invalidUser);

})

function setCookie(cname, cvalue) {
    var d = new Date();
    var time = d.getTime();
    time += 3600 * 1000;
    d.setTime(time);
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
    
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
        setCookie("username", user, 365);
        }
    }
}

function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}