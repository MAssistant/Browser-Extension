console.log("executed")

chrome.contextMenus.create({
	id: "some-command",
    title: "MAssistant"
});

var subContent;

chrome.contextMenus.onClicked.addListener(function(info, tab){
	if(info.menuItemId == "some-command"){
		chrome.tabs.create({url: 'https://kg.bnu.edu.cn:443/'});
	}
})

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript( {file: "d3-v4-contextmenu.js"});
  chrome.tabs.executeScript( {file: "d3.v5.min.js" });
  chrome.tabs.executeScript( {file: "popup.js" });
  chrome.tabs.executeScript( {file: "content_script.js"});
});

chrome.runtime.onMessage.addListener( function(message, _, sendResponse){
    var data = message.data;
    $.ajax({
        url: 'https://kg.bnu.edu.cn:443/proSubtitle',
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        dataType: "text",
    }).then(function(data){
        // 将正确信息返回content_script
        sendResponse({'status': 200});
        subContent = data;
        console.log(subContent);
    }, function(){
        // 将错误信息返回content_script
        sendResponse({'status': 500});
    });
});

function get_subContent(){
    return subContent;
}