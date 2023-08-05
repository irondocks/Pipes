
<html>


<script src="pipes.js"></script>

<script>
    window.m_seek = {"s": 0};
    window.flags = false;
    window.media = null;

    var xy = {};

    function getm() {
        window.media = document.getElementById('video');
        window.media.seekable = true;
        window.media.currentTime = 1;
        window.media.startTime = 1;
        window.media.seekable = false;
    }

    function flag(media)    
    {
        window.media.play();
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
        window.media.pause();
        return false;//flags = false;
    }
    
</script>

<script>    
    
     //{ right: false, left: false };
    //var window.media.mp = document.getElementById('window.media.mp-video');
    var t = { x: 0, y: 0};
    function callbackRight(media,m_seek)
    {

        window.media.seekable = true;
        window.media.currentTime += 2;
        window.media.seekable = false;
    }

    function callbackLeft(media, m_seek)
    {
        window.media.seekable = true;
        window.media.currentTime -= 2;
        window.media.seekable = false;
    }

    function easy (media, m_seek) {
        console.log(media);
        xy = window.media.getBoundingClientRect();
        t = { x: getMousePos(window.media.onmousemove).x, y: getMousePos(window.media.onmousemove).y };

        console.log(window.media.currentTime);
        if (3 < window.media.currentTime && 0 < window.media.currentTime && t.x > xy.left && t.x < xy.left + (xy.width / 2) && t.y > xy.top && t.y < xy.top + xy.height)
            callbackLeft(media,m_seek);
        else if (window.media.duration > window.media.currentTime && 0 < window.media.currentTime && t.x > xy.left && t.x > xy.left + (xy.width / 2) && t.y > xy.top && t.y < xy.top + xy.height)
            callbackRight(media,m_seek);
        else if (Math.round(window.media.duration) - 3 < Math.round(window.media.currentTime))
        {
            window.media.seekable = true;
            window.media.currentTime = 1;
            window.media.seekable = false;
        }
        else
        {
            window.media.seekable = true;
            window.media.currentTime = window.media.duration - 3;
            window.media.seekable = false;
        }
    }

    function getMousePos(e) {
        return {
            x: parseInt(event.pageX + document.body.scrollLeft),
            y: parseInt(event.pageY + document.body.scrollTop)
        };
    }
    

</script>

<body onmousedown="">
    <br><br><br>
    
<pipe ajax="./cache.php" insert="here" id="here"></pipe>
<pipe ajax="./preorder.php" insert="there" id="there"></pipe>

</body>