var fetchEventTd;
var time = 0;

function startFetchSubtitle(){
	fetchEventId = setInterval("dlSubtitle()", 4000);
};

function dlSubtitle(){
	var a_list = document.getElementsByTagName('a');
	var VUrl = window.location.href;
	var dl_url = '';
    var course = document.getElementsByClassName('breadcrumb-title')[0].textContent;
	for(var i = 0;i < a_list.length;i++){
		if(a_list[i].download == 'subtitles-en.vtt'){
			dl_url = a_list[i].href;
	    }
    }
	if(dl_url == ''){
    }
	else {
		time = time + 1;
		var video = document.getElementsByClassName('video-name')[0].textContent;
		if(time <= 1){
			window.clearInterval(fetchEventId);
			var data = {'dl_url': dl_url, 'course': course, 'video': video, 'VUrl':VUrl};
			chrome.extension.sendMessage({'data': data}, function(d){
			    console.log(d);
            });
		}
	}
};

window.onload=function(){
    startFetchSubtitle();
}
