<html>
<script src="./pipes.js"></script>

<script>
    window.m_seek = {"s": 0};
    window.flags = false;
    window.media = {"m": null};

    var xy = {};

    function getm() {
        media["m"] = document.getElementById('video');
        media["m"].seekable = true;
        media["m"].currentTime = 1;
        media["m"].startTime = 1;
        media["m"].seekable = false;
    }

    function flag(media)    
    {
        //media["m"].play();
        if (flags)
        {
            unflag(media);
            return false;
        }
        flags = true;
        return true;//flags = false;
    }

    function unflag(media)
    {
        flags = false;
        media["m"].pause();
        return false;//flags = false;
    }
    
</script>

<script>    
    
     //{ right: false, left: false };
    //var media["m"].mp = document.getElementById('media["m"].mp-video');
    var t = { x: 0, y: 0};
    function callbackRight(media,m_seek)
    {

        media["m"].seekable = true;
        media["m"].currentTime += 2;
        media["m"].seekable = false;
    }

    function callbackLeft(media, m_seek)
    {
        media["m"].seekable = true;
        media["m"].currentTime -= 2;
        media["m"].seekable = false;
    }

    function easy (media, m_seek) {
        xy = media["m"].getBoundingClientRect();
        t = { x: getMousePos(media["m"].onmousemove).x, y: getMousePos(media["m"].onmousemove).y };

        console.log(media["m"].currentTime);
        if (3 < media["m"].currentTime && 0 < media["m"].currentTime && t.x > xy.left && t.x < xy.left + (xy.width / 2) && t.y > xy.top && t.y < xy.top + xy.height)
            callbackLeft(media,m_seek);
        else if (media["m"].duration > media["m"].currentTime && 0 < media["m"].currentTime && t.x > xy.left && t.x > xy.left + (xy.width / 2) && t.y > xy.top && t.y < xy.top + xy.height)
            callbackRight(media,m_seek);
        else if (Math.round(media['m'].duration) - 3 < Math.round(media['m'].currentTime))
        {
            media['m'].seekable = true;
            media['m'].currentTime = 1;
            media['m'].seekable = false;
        }
        else
        {
            media['m'].seekable = true;
            media['m'].currentTime = media['m'].duration - 3;
            media['m'].seekable = false;
        }
    }

    function getMousePos(e) {
        return {
            x: parseInt(event.pageX + document.body.scrollLeft),
            y: parseInt(event.pageY + document.body.scrollTop)
        };
    }
</script>

<body onload="getm();" onmousedown="">

    <?php require("vidiot.php") ?>

</body>
