<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
        function didSomething(r)
        {
                console.log("HELLO!");
        }
</script>
<span id="hed" style="width:100%"></span><br>
Modals Demonstration - <dyn class="redirect" ajax="http://www.github.com/wise-penny/pipes"><u>GitHub</u></dyn> +
<dyn id="donate" class="redirect" ajax="https://paypal.me/thexiv"><u>Donate (I collect $1 donations. It's a hobby!)</u></dyn>
<b id="timer1" delay="3000" ajax="./img_src.php" class="timed modal-json modal-single-line" insert="hed"></b>
</body>

<?php $mod = file_get_contents("./modals.json"); ?>
<script>
    var value = <?= $mod ?>;
	insertJSONElem(value, document.body);
</script>