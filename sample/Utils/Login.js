
$(document).ready(function(){

    /// Send Login
    $.fn.myFunction = function(){ 

        var formData = $("#formLogin").serialize();
        requestPath += tenant;
        $.ajax({
            url: requestPath + '/Login/ClientLogin', 
            data: formData,
            method: "POST",
            success: function (data) {
                if(data){
                    setCookie("userName",$("#name").val());
                    setCookie("sessionId",data);
                    window.location.href = "Chatter.html";
                }
                else{
                    $("#cvNome").show();
                }
            },
            error: function (error, error1, error2) {
                debugger;
                console.log(error);
                console.log(error1);
                console.log(error2);
            }
        });
    }

    /// Check if exists userAccountName parameter
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("userAccountName")){
        var name = urlParams.get("userAccountName");
        $("#name").val(name);
     
        $.fn.myFunction();
    }

    $("#formLogin").on("submit", function(e){
        
        $.fn.myFunction();
        e.preventDefault();

        $("#btn-entrar").hide();
        $("#btn-loading").fadeIn();
    });

});