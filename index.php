<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
</script>
Modala Demonstration - 
<span id="hed-mod" style="width:100%"></span><br>
<br>
<br>
<pipe id="mod" class="modala" ajax="./modals.json" insert="hed-mod"></pipe>
<span id="hed" style="width:100%"></span><br>
<dyn id="mod" class="modala" ajax="./modal.json" insert="hed">Reload Top</dyn>
</body>

<pipe insert="txt" class="json" ajax="./modal.json" id="t"></pipe>
<textarea id="txt"> </textarea>
