function get_black_list() {
    var items = document.getElementsByClassName("item item-card");
    var results = [];

    for (pos = 0; pos < items.length; pos++) {
        a = items[pos].getElementsByClassName("body")[0].getElementsByTagName("a")[0]
        item = {
            "hashid": items[pos].getAttribute("data-id"),
            "avatar": items[pos].getElementsByTagName("img")[0].getAttribute("src"),
            "nicknm": a.innerHTML,
            "urltoken": a.getAttribute("href").substr(8)
        };
        results.push(item);
    }
    return results;
}


function get_myself() {
    var scripts = document.getElementsByTagName('script');

    for (pos = 0; pos < scripts.length; pos++){
        if ("current_user" != scripts[pos].getAttribute('data-name')){
            continue
        }
        var content = scripts[pos].innerHTML;
        break
    }
    return content.split(",")[3].trim().substring(1, 33);
}


function get_xsrf(){
    var inputs = document.getElementsByTagName('input');

    for (pos = 0; pos < inputs.length; pos++){
        if ("_xsrf" != inputs[pos].getAttribute('name') ||
            "hidden" != inputs[pos].getAttribute('type')){
            continue
        }
        return inputs[pos].getAttribute("value");
    }
}


chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        if (request.method == "get_black_list") {
            results = get_black_list();
            sendResponse({data: results, method: "get_black_list"});
        } else if (request.method == "get_myself") {
            me = get_myself();
            sendResponse({data: me, method: "get_myself"});
        } else if (request.method == 'get_xsrf') {
            sendResponse({data: get_xsrf(), method: "get_xsrf"});
        }
    }
);
