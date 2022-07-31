/*
    Tags in script:
        pipe        = name of id
        ajax        = calls and returns this file's ouput
        file-order  = ajax to these files, iterating [0,1,2,3]%array.length
        index       = counter of which index to use with file-order to go with ajax
        redirect    = "follow" to go where the ajax says
        data-pipe   = name of class for multi-tag data (augment with pipe)
        multiple    = states that this object has two or more key/value pairs
        remove      = remove element in tag
        display     = toggle visible and invisible
        replace     = target ajax callback return in this id
        target      = same as replace
        json        = returning a JSON
        !!! ALL HEADERS FOR AJAX are available. They will use defaults to
        !!! go on if there is no input to replace them.
*/

function display(elem)
{
            // Toggle visibility of CSS display style of object
    if (elem.hasOwnProperty("display"))
    {
        var toggle = elem.getAttribute("display");
        doc_set = document.getElementById(toggle);
        if (document.getElementById(toggle) && doc_set.style.display !== "none"){
            doc_set.style.display = "none";
        }
        else if (document.getElementById(toggle) && doc_set.style.display === "none")
        {
            doc_set.style.display = "block";
        }
    }
}

function remove(elem)
{
    // Remove Object
    if (elem.hasOwnProperty("remove"))
    {
        var rem = elem.getAttribute("remove");
        if (document.getElementById(rem)) {
            doc_set = document.getElementById(rem);
            doc_set.remove();
        }
        doc_set.parentNode.removeChild(doc_set);
            
    }
}

function carousel(el)
{


}

function setAJAXOpts(el)
{
    if (document.body.contains(el))
        elem = document.getElementById(el.id);

    // communicate properties of Fetch Request
    var method_thru = (opts["method"] !== undefined) ? opts["method"] : (!elem.hasAttribute("method")) ? "GET" : elem.getAttribute("method").toString();
    var mode_thru = (opts["mode"] !== undefined) ? opts["mode"]: (!elem.hasAttribute("mode")) ? "no-cors" : elem.getAttribute("mode").toString();
    var cache_thru = (opts["cache"] !== undefined) ? opts["cache"]: (!elem.hasAttribute("cred")) ? "no-cache" : elem.getAttribute("cache").toString();
    var cred_thru = (opts["cred"] !== undefined) ? opts["cred"]: (!elem.hasAttribute("cred")) ? "same-origin" : elem.getAttribute("cred").toString();
    // updated "headers" attribute to more friendly "content-type" attribute
    var content_thru = (opts["headers"] !== undefined) ? opts["headers"]: (elem.hasAttribute("headers")) ? '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}' : elem.getAttribute("headers").toString();
    var redirect_thru = (opts["redirect"] !== undefined) ? opts["redirect"]: (!elem.hasAttribute("redirect")) ? "manual" : elem.getAttribute("redirect").toString();
    var refer_thru = (opts["referrer"] !== undefined) ? opts["referrer"]: (!elem.hasAttribute("referrer")) ? "client" : elem.getAttribute("referrer").toString();
    opts = new Map();
    opts.set("method", method_thru); // *GET, POST, PUT, DELETE, etc.
    opts.set("mode", mode_thru); // no-cors, cors, *same-origin
    opts.set("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
    opts.set("credentials", cred_thru); // include, same-origin, *omit
    opts.set("content-type", content_thru); // content-type UPDATED**
    opts.set("redirect", redirect_thru); // manual, *follow, error
    opts.set("referrer", refer_thru); // no-referrer, *client
    opts.set('body', JSON.stringify(content_thru));
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;

    return opts;
}

function navigate(el) {

    if (!document.body.contains(el))
        return;

    elem = document.getElementById(el.id);
    
    if (elem.hasAttribute("link"))
    {
        window.location.replace = elem.getAttribute("link").toString();
    }
    else if (elem.hasAttribute("ajax") && elem.getAttribute("ajax"))
    {
        if (elem.hasAttribute("getOptions") && elem.getAttribute("getOptions"))
        {
            var fs=require('fs');
            var json = elem.getAttribute("opts").toString();
            var data=fs.readFileSync(json, 'utf8');
            var words=JSON.parse(data);
            return setAJAXOpts(words);
        }
        if (elem.hasAttribute("json") && elem.getAttribute("json"))
        {
            var fs=require('fs');
            var json = elem.getAttribute("json").toString();
            var data=fs.readFileSync(json, 'utf8');
            var words=JSON.parse(data);
            return words;
        }
        if (elem.hasAttribute("target") && elem.getAttribute("target"))
        {
            var url = collectURLData(el).toString();
            document.getElementById(el.getElementById("target").toString()).innerHTML = captureAJAXResponse(elem.getAttribute("ajax").toString());
        }
    }
// This is a quick if to make a downloadable link in an href
    else if (ev.target.classList == "download")
    {
        var text = ev.target.getAttribute("file");
        var element = document.createElement('a');
        var location = ev.target.getAttribute("directory");
        element.setAttribute('href', location + encodeURIComponent(text));

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        return;
    }
}

function pipe(ev)
{
        // This is a quick if to make a downloadable link in an href
        if (ev.hasAttribute("download"))
        {
            var text = ev.getAttribute("file");
            var element = document.createElement('a');
            var location = ev.getAttribute("directory");
            element.setAttribute('href', location + encodeURIComponent(text));
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            return;
        }
        const elem = ev;
        classToAJAX(elem);
}

function makeCarousel (file)
{
    // give the current elem a chance to figure its link
    var carousl = document.getElementById("carousel");
    
    if (carousl == undefined)
        return;
    
    var carousel = document.getElementById("carousel");

    carousel.innerHTML = '<table style="width:500;height:150;background-color:black;color:white;" id="carousel-table" ajax="' + file + '"><tr></tr></table>';
    return;
}

function captureAJAXResponse(elem, opts)
{

    f = 0;

    opts.forEach((e,f) => {
        let header_array = ["method","mode","cache","credentials","content-type","redirect","referrer"];

        opts.set(e, header_array[f]);
        
    });
   
    var opts_req = new Request(elem.getAttribute("ajax").toString());
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;

    fetch(opts_req, {
        signal
    });
    
    setTimeout(() => abort_ctrl.abort(), 10 * 1000);
    const __grab = async (opts_req, opts) => {
        return fetch(opts_req, opts)
            .then(function(response) {
                return response.text().then(function(text) {
                    if (response.status == 404)
                        return;
                    return text;
                });
            });
    }
    return __grab(opts_req, opts);
}

function notify(t)
{

    elem = document.getElementsByTagName(t)[0];

    if (!elem)
        return;
    opts = new Map();
    f = 0;

    ["method","mode","cache","credentials","content-type","redirect","referrer"].forEach((e,f) => {
        let header_array = ["POST","no-cors","no-cache"," ",'{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}', "manual", "client"];

        opts.set(e, header_array[f]);
        
    });

    content_thru = '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}';
    var opts_req = new Request(elem.getAttribute("ajax"));
    opts.set('body', JSON.stringify({"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}));
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;

    fetch(opts_req, {
        signal
    });

    target__ = "blinkbox";
    
    setTimeout(() => abort_ctrl.abort(), 10 * 1000);
    const __grab = async (opts_req, opts) => {
        return fetch(opts_req, opts)
            .then(function(response) {
                if (response.status == 404)
                        return;
                return response.text().then(function(text) {
                    
                        if (undefined == document.getElementsByTagName(t)[0]) {

                            ppr = document.createElement(t);
                            ppr.style.position = "absolute";
                            ppr.style.backgroundColor = "navy";
                            ppr.style.wordwrap = true;
                            ppr.style.width = window.innerWidth / 4;
                            ppr.style.zIndex = 3;
                            p.innerText = text;
                            p.style.position = "relative";
                            ppr.setAttribute("notify-ms",3000);
                            document.body.insertBefore(ppr,document.body.firstChild);
                        }
                        else {
                            ppr = document.getElementsByTagName(t)[0];
                        }

                        let p = document.createElement("p");
                        p.innerText = text;
                        p.style.position = "relative";
                        ppr.insertBefore(p,ppr.firstChild);
                        var xy = parseInt(elem.getAttribute("notify-ms"));
                        setTimeout(function(){
                        ppr.removeChild(ppr.lastChild);
                        }, xy);
                    return;
                });
            });
    }
    __grab(opts_req, opts);
}

function classToAJAX(elem) {

    
    if (!elem)
        return;

    opts = new Map();
    f = 0;

    let elem_qstring = elem.getAttribute("ajax") + "?" + elem.getAttribute("query");
    elem_qstring = encodeURI(elem_qstring);

    ["Referrer-Policy","Strict","GET","no-cors","no-cache"," ",'{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}', "manual", "client"]
    .forEach((e,f) => {
        let header_array =["strict-origin-when-cross-origin","SameSite","method","mode","cache","credentials","content-type","redirect","referrer"] ;

        opts.set(header_array[f], e);
        
    });

    content_thru = '{"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}';
    var opts_req = new Request(elem_qstring);
    opts.set('body', JSON.stringify({"Access-Control-Allow-Origin":"*","Content-Type":"text/html"}));
    const abort_ctrl = new AbortController();
    const signal = abort_ctrl.signal;
    
    fetch(opts_req, {
        signal
    });
    
    setTimeout(() => abort_ctrl.abort(), 10 * 1000);
    const __grab =  (opts_req, opts) => {
        return fetch(opts_req, opts)
            .then(function(response) {
                if (response.status == 404)
                    return;
                return response.text().then(function(text) {
                    {
                        let td = text;
                        document.getElementById(elem.getAttribute("target").toString()).innerHTML = td;
                    }
                    return;
                });
            });
    }
    __grab(opts_req, opts);
}

function rem(elem)
{
    elem.remove();
}

function carouselScrollLeft(elem,pixels) {

    elem.scrollX -= pixels;

}

function carouselScrollRight(elem,pixels) {

    elem.scrollX += pixels;

}

function carouselXPos(elem) {
    return elem.offsetLeft;
}
