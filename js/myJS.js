function selectAction(id){
	document.getElementById("dda").className = "bt";
	document.getElementById("brese").className = "bt";
	document.getElementById("circ").className = "bt";
	document.getElementById("eli").className = "bt";

	document.getElementById(id).className += " selecionado";
}

function selectColor(id){
	document.getElementById("preto").className = "cores";
	document.getElementById("vermelho").className = "cores";
	document.getElementById("verde").className = "cores";
	document.getElementById("azul").className = "cores";

	document.getElementById(id).className += " selectedColor";
}