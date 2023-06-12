 /**
  *  only usage: onclick="pipes(this)"
  *  to begin using the PipesJS code.
  *  Usable DOM Attributes:
  *  Attribute   |   Use Case
  *  -------------------------------------------------------------
  *  query.......= default query string associated with url
  *  <pipe>......= Tag (initializes on DOMContentLoaded Event)
  *  <dyn>.......= Automatic eventListening tag for onclick="pipes(this)"
  *  <timed>.....= Timed result refreshing tags (Keep up-to-date handling on page) (same as any other Pipes tag)
  *  delay.......= delay between <timed> tag refreshes (required for <timed> tag)
  *  goto........= URI to go to
  *  ajax........= calls and returns the value file's output
  *  file-order..= ajax to these files, iterating [0,1,2,3]%array.length per call (delimited by ';')
  *  class-switch= iterate through class sets, iterating [0,1,2,3]%array.length per call (delimited by ';')
  *  file-index..= counter of which index to use with file-order to go with ajax
  *  incrIndex...= increment thru index of file-order (0 moves once) (default: 1)
  *  decrIndex...= decrement thru index of file-order (0 moves once) (default: 1)
  *  redirect....= "follow" the ajax call in POST or GET mode
  *  attribution.= select class to add new attributes to
  *  class-attr..= new attributes in CSS markup-style-attribution (REQUIRES attribution)
  *  mode........= "POST" or "GET" (default: "POST")
  *  data-pipe...= name of class for multi-tag data (augment with pipe)
  *  multiple....= states that this object has two or more key/value pairs
  *  remove......= remove element in tag
  *  display.....= toggle visible and invisible of anything in the value (delimited by ';') this attribute
  *  insert......= return ajax call to this id
  *  json........= returns a JSON file set as value
  *  callback....= calls function set as attribute value
  *  fs-opts.....= JSON headers for AJAX implementation
  *  headers.....= headers in CSS markup-style-attribute (delimited by '&')
  *  link........= class for operating tag as clickable link
  *  download....= class for downloading files
  *  file........= filename to download
  *  directory...= relative or full path of 'file'
  *  form-class..= class name of devoted form elements
  **** ALL HEADERS FOR AJAX are available. They will use defaults to
  **** go on if there is no input to replace them.
  */

    document.addEventListener("DOMContentLoaded", function (){
        doc_set = document.getElementsByTagName("pipe");
        Array.from(doc_set).forEach(function(elem) {
                setTimeout(pipes(elem),200);
        });
        setTimers();
        let elementsArray = document.getElementsByTagName("dyn");
        Array.from(elementsArray).forEach(function(elem) {
            console.log(elem);
            elem.addEventListener("click", function() {
                pipes(elem);
            });
        });
    });
    
    // modala(jsonObj,rootNode)
    function modala (value, tempTag, repeat, root)
    {
        if (tempTag instanceof String)
        {
            tempTag = document.getElementById(tempTag);
        }
        if (root === undefined)
            root = tempTag;
        var temp = document.createElement(value["tagname"]);
        console.log(value);
        Object.entries(value).forEach((nest) => {
            const [k, v] = nest;
            
            if (v instanceof Object)
                modala(v, temp, repeat, root);
            else if (!(k instanceof Number) && k.toLowerCase() != "tagname" && k.toLowerCase() != "textcontent" && k.toLowerCase() != "innerhtml" && k.toLowerCase() != "innertext")
            {
                temp.setAttribute(k,v);
            }
            else if (k != "tagname" && k.toLowerCase() == "textcontent" || k.toLowerCase() == "innerhtml" || k.toLowerCase() == "innertext")
            {
                (k.toLowerCase() == "textcontent") ? temp.textContent = v : (k.toLowerCase() == "innerhtml") ? temp.innerHTML = v : temp.innerText = v;
            }
        });
        tempTag.appendChild(temp);
    }

    function setTimers(temp)
    {
        let elem = document.getElementsByTagName("timed");
        for (i = 0 ; i < elem.length ; i++) {
            if (elem[i].hasAttribute("delay") == false)
            {
                console.log(elem[i].id + " has no delay. Required.");
            }
            else
            {
                console.log("p");
                target = document.getElementById(elem[i].id);
                var timers = parseInt(elem[i].getAttribute("delay"));
                setInterval(function() {
                    pipes(target);
                },timers);
            }
        }
    }

    function fileOrder(elem)
    {
        arr = elem.getAttribute("file-order").split(";");
        ppfc = document.getElementById(elem.getAttribute("insert").toString());
        if (!ppfc.hasAttribute("file-index"))
        ppfc.setAttribute("file-index", "0");
        index = parseInt(ppfc.getAttribute("file-index").toString());
        if (elem.hasAttribute("decrIndex"))
            index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) - 1;
        else
            index = Math.abs(parseInt(ppfc.getAttribute("file-index").toString())) + 1;
        if (index < 0)
            index = arr.length - 1;
        index = index%arr.length;
        ppfc.setAttribute("file-index",index.toString());
        
        console.log(ppfc);
        if (ppfc.hasAttribute("src"))
        {
            try {
                // <Source> tag's parentNode will need to be paused and resumed
                // to switch the video
                ppfc.parentNode.pause();
                ppfc.parentNode.setAttribute("src",arr[index].toString());
                ppfc.parentNode.load();
                ppfc.parentNode.play();
            }
            catch (e)
            {
                ppfc.setAttribute("src",arr[index].toString());
            }
        }
        else
        {
            elem.setAttribute("ajax",arr[index].toString());
            pipes(elem);
        }
    }

    function classOrder(elem)
    {
        arr = elem.getAttribute("class-switch").split(";");
        if (!elem.hasAttribute("class-index"))
        elem.setAttribute("class-index", "0");
        index = parseInt(elem.getAttribute("class-index").toString());
        if (elem.hasAttribute("incrIndex"))
            index = parseInt(elem.getAttribute("incrIndex").toString()) + 1;
        else if (elem.hasAttribute("decrIndex"))
            index = Math.abs(parseInt(elem.getAttribute("decrIndex").toString())) - 1;
        else
            index++;
        if (index < 0)
            index = 0;
        index = index%arr.length;
        elem.setAttribute("class-index",index.toString());
        elem.classList = arr[index];
    }

    function pipes(elem) {

        var query = "";
        var headers = new Map();
        var formclass = "";

        if (elem === undefined)
            return;
        if (elem.hasAttribute("class") && elem.classList.contains("redirect"))
        {
            window.location.href = elem.getAttribute("ajax") + ((elem.hasAttribute("query")) ? "?" + elem.getAttribute("query") : "");
        }
        if (elem.hasAttribute("display") && elem.getAttribute("display"))
        {
            var optsArray = elem.getAttribute("display").split(";");
            optsArray.forEach((e,f) => {
            var x = document.getElementById(e);
            if (x.style.display !== "none")
                x.style.display = "none";
            else
                x.style.display = "block";
            });
        }
        if (elem.hasAttribute("setAttr") && elem.getAttribute("setAttr") && !elem.classList.contains("class-attribute-change"))
        {
            var optsArray = elem.getAttribute("setAttr").split(";");
            optsArray.forEach((e,f) => {
                var g = e.split(":");
                var x = document.getElementById(e);
                var ins = elem.getAttribute("insert");
                document.getElementById(ins).setAttribute(g[0],g[1]);
            });
        }
        if (elem.hasAttribute("attribution") && elem.hasAttribute("class-attr") && elem.getAttribute("class-attr"))
        {
            var classAttr = document.getElementsByClassName(elem.getAttribute("attribution"));
            console.log(classAttr)
            //var optsArray = elem.getAttribute("class-attr").split(";");
            Array.from(classAttr).forEach((x,z) => {
                var optsArray = elem.getAttribute("class-attr").split(";");
                optsArray.forEach((e,f) => {
                    var g = e.split(":");
                    if (g[0] != '' && g[0] != undefined)
                    x.setAttribute(g[0],g[1]);
                });
            });
        }
        if (elem.hasAttribute("remove") && elem.getAttribute("remove"))
        {
            var optsArray = elem.getAttribute("remove").split(";");
            optsArray.forEach((e,f) => {
                var x = document.getElementById(e);
                x.remove();
            });
        }
        if (elem.classList.contains("link"))
        {
            window.location.href = elem.getAttribute("ajax");
            return;
        }
        if (elem.hasAttribute("query"))
        {
            var optsArray = elem.getAttribute("query").split(";");

            optsArray.forEach((e,f) => {
                var g = e.split(":");
                query = query + g[0] + "=" + g[1] + "&";
            });
        }
        if (elem.hasAttribute("headers"))
        {
            var optsArray = elem.getAttribute("headers").split("&");
            optsArray.forEach((e,f) => {
                var g = e.split(":");
                headers.set(g[0], g[1]);
            });
        }
        if (elem.hasAttribute("form-class"))
        {
            formclass = elem.getAttribute("form-class");
        }
        if (elem.hasAttribute("class-switch"))
        {
            classOrder(elem);
        }
        if (elem.hasAttribute("file-order"))
        {
            fileOrder(elem);
        }
        if (elem.hasAttribute("json") && elem.getAttribute("json"))
        {
            
            //return JSON.parse(data);
        }
        // This is a quick way to make a downloadable link in an href
    //     else
        if (elem.classList.contains == "download")
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
        navigate(elem, headers, query, formclass);
    }

    function setAJAXOpts(elem, opts)
    {
        // communicate properties of Fetch Request
        var method_thru = (opts["method"] !== undefined) ? opts["method"] : "GET";
        var mode_thru = (opts["mode"] !== undefined) ? opts["mode"]: "no-cors";
        var cache_thru = (opts["cache"] !== undefined) ? opts["cache"]: "no-cache";
        var cred_thru = (opts["cred"] !== undefined) ? opts["cred"]: '{"Access-Control-Allow-Origin":"*"}';
        // updated "headers" attribute to more friendly "content-type" attribute
        var content_thru = (opts["content-type"] !== undefined) ? opts["content-type"]: '{"Content-Type":"text/html"}';
        var redirect_thru = (opts["redirect"] !== undefined) ? opts["redirect"]: "manual";
        var refer_thru = (opts["referrer"] !== undefined) ? opts["referrer"]: "referrer";
        opts.set("method", method_thru); // *GET, POST, PUT, DELETE, etc.
        opts.set("mode", mode_thru); // no-cors, cors, *same-origin
        opts.set("cache", cache_thru); // *default, no-cache, reload, force-cache, only-if-cached
        opts.set("credentials", cred_thru); // include, same-origin, *omit
        opts.set("content-type", content_thru); // content-type UPDATED**
        opts.set("redirect", redirect_thru); // manual, *follow, error
        opts.set("referrer", refer_thru); // no-referrer, *client
        opts.set('body', JSON.stringify(content_thru));

        return opts;
    }

    function formAJAX(elem, classname)
    {
        var elem_qstring = "";

        // No, 'pipe' means it is generic. This means it is open season for all with this class
        for (var i = 0; i < document.getElementsByClassName(classname).length; i++)
        {
            var elem_value = document.getElementsByClassName(classname)[i];
            elem_qstring = elem_qstring + elem_value.name + "=" + elem_value.value + "&";
            // Multi-select box
            if (elem_value.hasOwnProperty("multiple"))
            {
                for (var o of elem_value.options) {
                    if (o.selected) {
                        elem_qstring = elem_qstring + "&" + elem_value.name + "=" + o.value;
                    }
                }
            }
        }
        if (elem.classList.contains("redirect"))
            window.location.href = elem.getAttribute("ajax") + ((elem_qstring.length > 0) ? "?" + elem_qstring : "");
        console.log(elem_qstring);
        return (elem_qstring);
    }

    function navigate(elem, opts = null, query = "", classname = "")
    {
        //formAJAX at the end of this line

        elem_qstring = query + ((document.getElementsByClassName(classname).length > 0) ? formAJAX(elem, classname) : "");
        elem_qstring = elem.getAttribute("ajax") + ((elem_qstring.length > 0) ? "?" + elem_qstring : "");
        elem_qstring = encodeURI(elem_qstring);
        opts = setAJAXOpts(elem, opts);
        var opts_req = new Request(elem_qstring);
        opts.set("mode",(opts["mode"] !== undefined) ? opts["mode"]: '"Access-Control-Allow-Origin":"*"');

        var rawFile = new XMLHttpRequest();
        rawFile.open(opts.get("method"), elem_qstring, true);
        if (elem.classList.contains("modala"))
        {
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    var allText = "";// JSON.parse(rawFile.responseText);
                    try {
                        allText = JSON.parse(rawFile.responseText);
                    }
                    catch (e)
                    {
                        allText = (rawFile.responseText);
                    }
                    modala(allText,elem.getAttribute("insert"),elem.classList.contains("modala-repeat"));
                }
            }
        }
        else if (!elem.hasAttribute("json") && !elem.hasAttribute("callback"))
        {
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    var allText = rawFile.responseText;
                    document.getElementById(elem.getAttribute("insert")).innerHTML = allText;
                }
            }
        }
        else
        {
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4)
                {
                    var allText = JSON.parse(rawFile.responseText);
                    var func = elem.getAttribute("callback");
                    window[func](allText);
                }
            }
        }
        rawFile.send();
    }

