function LoadSite(text, who, ask) {

    var splitted = text.split(' ');
    var Url = splitted[1].replace('url=', '');
    var indexElem = splitted[2].replace('index=', '');
    var Tag = splitted[3].replace('tag=', '');
    var encodingName = 'UTF-8';
    var limit = 3;
    if (text.indexOf('encoding') >= 0) {
        encodingName = splitted[4].replace('encoding=', '');
        limit = 4;
    }
	var Prop = '';
	
	var i = 0;
	splitted.forEach(function (item) {
		if(i <= limit)
			i++;
		else{
			Prop += ' ' + item;
			i++;
		}
	});
	
	Prop = Prop.replace(']', '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
	if (Prop.indexOf("Depuração") >= 0)
	    Prop = Prop.substring(0, Prop.indexOf("Depuração"));
	
	$.ajax({
	    url: decodeURIComponent(escape(Url)),
        type: "GET",
		async: false,
		crossDomain: true,
        dataType: "html",
		contentType: "text/html; charset=" + encodingName,
        mimeType: "text/html; charset=" +encodingName,
        success: function (result) {
			var regex = new XRegExp("<" + Tag + ".*?" + Prop.replace(/^\s+/,"").trim() + ".*?>([\\s\\S]*?)</" + Tag + ">");
			var response = "";
			
			i = 1;
			XRegExp.forEach(result.responseText,regex, function(item){
				if(i == indexElem){
					response = item[0];
				}
				i++;
			});
			
			response = response.replace(/<\/?[^>]+(>|$)/g, "");

			ReceiveMessage(response, who, ask);
        },
        error: function (xhr, ajaxOptions, thrownError) {
			console.log("Erro ao pesquisar no site.");
        }
    });
}