<html>
<head>
<title>
</title>

<script>

var cliX = 0;
var cliY = 0;
var widthX = 0;
var heightY = 0;

function printMousePos(event) {
    cliX = Math.round(event.x - event.x%28) + "px";
    cliY = Math.round(event.y - event.y%28) + "px";
}

function grow(evd) {
	evd.target.style.width = Math.round(evd.target.x - evd.target.x%28)
	evd.target.style.height = Math.round(evd.target.y - evd.target.y%28)
}

function mover(evd) {
	printMousePos(evd.target)
	evd.target.style.marginLeft = cliX
	evd.target.style.marginTop = cliY
}

function dragender(e)
{
	printMousePos(e)
	e.target.style.marginLeft = cliX
	e.target.style.marginTop = cliY
	document.body.appendChild(e.target)
	var bases = document.getElementsByTagName("div")
	
	bases.prototype.foreach((ev) => {
		document.body.appendChild(ev.cloneNode(false))
		printMousePos(ev)
		ev.style.marginLeft = cliX
		ev.style.marginTop = cliY
	});
}

document.addEventListener("dragover", mover);
document.addEventListener("dragend", dragender)
document.addEventListener("dblclick", (ev) => {
	const baseSquare = document.createElement("div");
	baseSquare.style.border = "1px dashed black";
	baseSquare.setAttribute("draggable",true)
	baseSquare.setAttribute("contenteditable",true)
	baseSquare.style.resize = "both"
	baseSquare.style.overflow = "auto"
	document.body.setAttribute("display","flex")
	baseSquare.style.position = "absolute"
	printMousePos(baseSquare);
	baseSquare.style.marginLeft = cliX;
	baseSquare.style.marginTop = cliY;
	baseSquare.style.width = 150
	baseSquare.style.height = 100
	//baseSquare.addEventListener("hover",grow);
	document.body.appendChild(baseSquare);
});

</script>

</head>
<?php

$square = 29;
 
$grid = @imagecreate($square, $square)
    or die("Cannot Initialize new GD image stream");//creates an image with the resolution of $square 

$background = imagecolorallocate($grid, 26, 143, 186);
$lines = imagecolorallocatealpha($grid, 0,0,0,0.5); //26, 143, 186);
//$background = imagecolorallocate($grid, 26, 143, 186);

imagesetthickness($grid, 2);
imageline($grid, 0, 0, 0, 1, $lines);

imageline($grid, 0, 0, 0, 1, $lines);

imagepng($grid, "./grid.png");

?>
<style>
body
{
	background-image: url("./grid.png") repeat;
}

</style>
<body style="background-image:url('./grid.png')">
</body>
</html>