var cv;
var ctx;

//canvas de textura
var cv2;
var ctx2;

//textura
var img;

var janela = [0, 800, 0, 600];

var Mprojecao; 
var texture;

Algorithms = {
	CIRC : 0,
	ELIPSE : 1,
	FFill : 2,
	BFill : 3,
	Polig : 4
}

var algorithm = Algorithms.CIRC;

var COR = [0, 0, 0, 255];

//pontos VP
var pontos = [];
//pontos janela
var pontosJ = [];

//poligonos originais
var poligonosJ = [];

//poligonos VP
var poligonosVP = [];

function fechaEPinta(){
			scanLine(pontos);closePol();pontos = [];
		}

function radian(grau){
	return grau/57.2958;
}

function multM(m1, m2){
	var soma = 0;
	var mResult = [];

	for (var i = 0; i < m1.length; i++) {
		mResult.push([]);
		for (var j = 0; j < m2[0].length; j++) {
			for (var k = 0; k < m2.length; k++) {
				soma += m1[i][k] * m2[k][j];
			}
			mResult[i].push(soma);
			soma = 0;
		}
	}

	return mResult;
}

function abrirArquivo(objarq){
	if(objarq.files && objarq.files[0]){
		var leitor = new FileReader();
		leitor.onload = function(e){				
			img.src = e.target.result;	
		}
		leitor.readAsDataURL(objarq.files[0]);
	}
}

function calcJ(v1){

	for(var i = 0; i < v1.length; i++){

		var ponto = v1[i];

		var xj = (janela[1] - janela[0]) * (ponto[0] - 0 /*xiVP*/) / cv.width + janela[0];
		var yj = janela[3] - (janela[3] - janela[2]) * (ponto[1] - 0/*yiVP*/) / cv.height;

		var pontoJanela = [ xj, yj, ponto[2] ];
		pontosJ.push(pontoJanela);
	}

	var pj = pontosJ;

	closePol();
	return pj;
}

function calcProjecao(){
	var lj = janela[1] - janela[0];
	var aj = janela[3] - janela[2];
	Mprojecao = [
		[cv.width / lj, 0, (-cv.width * janela[0]) / lj], 
		[0, -cv.height / aj, ((cv.height * janela[2]) / aj) + cv.height ], 
		[0, 0, 1]
	];
}

function poligN(pCentro, r, n, cor){

	var teta = 360/n;

	var p1 = [ [pCentro[0]], [pCentro[1]-r], [1] ];
	var pi = [ pCentro[0], pCentro[1]-r, cor ];

	var v = [];
	var vr = [];

	v.push(p1);
	vr.push(pi);

	for (var i = 0; i < n; i++) {
		var pAtual = v[i];
		var mRot = rotacao(radian(teta));
		var Mtrans1 = translacao(-pCentro[0], -pCentro[1]);
		var Mtrans2 = translacao(pCentro[0], pCentro[1]);

		pAtual = multM(multM(multM(Mtrans2, mRot), Mtrans1), pAtual);
		var pvAtual = [ pAtual[0][0], pAtual[1][0], cor ];

		v.push(pAtual);
		vr.push(pvAtual);
	}
	return vr;
}

function criaRelogio(){

	var R = poligN( [400, 300], 150, 50, [0, 0, 0, 255]);
	calcJ(R);

	var h = [ [395, 308, [255, 0, 0, 255]], [405, 308, [255, 0, 0, 255]], [400, 230, [0, 0, 255, 255]] ];
	var m = [ [397, 308, [255, 0, 0, 255]], [403, 308, [255, 0, 0, 255]], [400, 200, [0, 255, 0, 255]] ];
	var s = [ [399, 308, [255, 0, 0, 255]], [401, 308, [255, 0, 0, 255]], [400, 200, [255, 0, 0, 255]] ];

	var d = new Date();
	var sAtual = d.getSeconds();
	var mAtual = d.getMinutes();
	var hAtual = d.getHours() % 12;

	s = rotaciona(s, 6 * sAtual);
	m = rotaciona(m, 6 * mAtual);
	m = rotaciona(m, 6/60 * sAtual);
	h = rotaciona(h, 30 * hAtual);
	h = rotaciona(h, 30/60 * mAtual);

	calcJ(h);
	calcJ(m);
	calcJ(s);
	
	R = poligonosJ[0];
	h = poligonosJ[1];
	m = poligonosJ[2];
	s = poligonosJ[3];
	
	desenhaRelogio(R, h, m, s);
	textTime();

	setInterval( function (){
		limpaCanvas();
		s = rotaciona(s, 360 - 6); 
		m = rotaciona(m, 360 - (6/60)); 
		h = rotaciona(h, 360 - (30/3600));
		
		desenhaRelogio(R, h, m, s);
		textTime();
	}, 1000);
}

function desenhaRelogio(R, h, m, s){
	poligonosJ[0] = R;
	poligonosJ[1] = h;
	poligonosJ[2] = m;
	poligonosJ[3] = s;
	updatePoligonos();
}

function textTime(){
	//ctx.fillStyle="#FF0000";
	ctx.font="20px Georgia";

	ctx.fillText("XII",385,180);
	ctx.fillText("VI",390,435);
	ctx.fillText("III",520,307);
	ctx.fillText("IX",255,307);
}

function desenhaPol(v){
	for (var i = 0; i < v.length-1; i++) {
		bresenhan([ v[i][0], v[i][1] ], [ v[i+1][0], v[i+1][1] ], [ 0, 0, 0, 255 ]);
	}
}

function rotaciona(v,teta){
	var novoV = [];
	for(var i = 0; i < v.length; i++){
		var cor = v[i][2];
		var ponto = [ [v[i][0]], [v[i][1]], [1] ];
		var pivo = [400, 300];

		var Mtrans1 = translacao(-pivo[0], -pivo[1]);
		var Mtrans2 = translacao(pivo[0], pivo[1]);
		var Mrot = rotacao(radian(teta));

		var novoPonto = multM(multM(multM(Mtrans2, Mrot), Mtrans1), ponto);

		novoPonto = [novoPonto[0][0], novoPonto[1][0], cor];
		novoV.push(novoPonto);
	}

	return novoV;
}

function rotaciona2(v,teta, pivo, tx, ty){
	var novoV = [];
	for(var i = 0; i < v.length; i++){
		var cor = v[i][2];
		var ponto = [ [v[i][0]], [v[i][1]], [1] ];

		var Mtrans1 = translacao(-pivo[0], -pivo[1]);
		var Mtrans2 = translacao(pivo[0] + tx, pivo[1] + ty);
		var Mrot = rotacao(radian(teta));

		var novoPonto = multM(multM(multM(Mtrans2, Mrot), Mtrans1), ponto);

		novoPonto = [novoPonto[0][0], novoPonto[1][0], cor];
		novoV.push(novoPonto);
	}

	return novoV;
}

function escalar(v, mEscala){
	var novoV = [];
	for(var i = 0; i < v.length; i++){
		var cor = v[i][2];
		var ponto = [ [v[i][0]], [v[i][1]], [1] ];

		var novoPonto = multM(mEscala, ponto);

		novoPonto = [novoPonto[0][0], novoPonto[1][0], cor];
		novoV.push(novoPonto);
	}

	return novoV;
}

function getPixel(x, y){
    var imgData = ctx.getImageData(x, y, 1, 1);
    return imgData.data;
}

function getPixel2(x, y){
    var c = 4*Math.round(x) + 4*cv2.width*Math.round(y);
    return [ texture.data[c], texture.data[c+1], texture.data[c+2], texture.data[c+3] ];
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.round(evt.clientX - rect.left),
		y: Math.round(evt.clientY - rect.top)
	};
}

function setPixel( x, y, cor ){
	var id = ctx.createImageData(1,1);
	var d  = id.data; 
	d[0]   = cor[0];
	d[1]   = cor[1];
	d[2]   = cor[2];
	d[3]   = cor[3];
	
	ctx.putImageData( id, Math.floor(x+0.5), Math.floor(y+0.5) );    
}

function setPixel2(mat, x, y, cor){
	index = 4*Math.round(x) + 4*cv.width*Math.round(y);
	mat[index + 0] = cor[0];
	mat[index + 1] = cor[1];
	mat[index + 2] = cor[2];
	mat[index + 3] = 255;
}

function limpaCanvas(){
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, cv.width, cv.height);
	pontos = [];
}

function hip(points){
	return Math.sqrt(Math.pow((points[1][1] - points[0][1]), 2) + Math.pow((points[1][0] - points[0][0]), 2));
}

function closePol(){
	if(pontos.length > 2){
		bresenhan(pontos[ pontos.length-1 ], pontos[0], [0, 0, 0, 255]);
	}
	poligonosJ.push(pontosJ);
	pontosJ = [];
}

function translacao(tx, ty){
	var Mtranslacao = [ [1, 0, tx], [0, 1, ty], [0, 0, 1] ];
	return Mtranslacao;
}

function escala(sx, sy){
	var Mescala = [ [sx, 0, 0], [0, sy, 0], [0, 0, 1] ];
	return Mescala;
}

function rotacao(teta){
	var MRotacao = [ [Math.cos(teta), -Math.sin(teta), 0], [Math.sin(teta), Math.cos(teta), 0], [0, 0, 1] ];
	return MRotacao;
}

function updatePoligonos(){

	for (var i = 0; i < poligonosJ.length; i++) {
		var poligonoAtual = [];
		for(var j = 0; j < poligonosJ[i].length; j++){

			var  xj = poligonosJ[i][j][0], yj = poligonosJ[i][j][1], corP = poligonosJ[i][j][2];

			/*//Calcular x e y da viewport
			var xvp = cv.width * (xj - janela[0]) / (janela[1] - janela[0]) + 0/*xiVP*/;
			//var yvp = cv.height - cv.height * (yj - janela[2]) / (janela[3] - janela[2]);
			
			var pontoJanela = [ [xj], [yj], [1] ];
			
			var pontoVP = multM(Mprojecao, pontoJanela);
			//console.log()
			
			pontoVP = [ pontoVP[0][0], pontoVP[1][0], corP ];

			//var verticeAtual = [xvp, yvp, corP];
			poligonoAtual.push(pontoVP);
		}
		scanLine(poligonoAtual);
	}
}

function updatePoligonosTexture(){

	for (var i = 0; i < poligonosJ.length; i++) {
		var poligonoAtual = [];
		for(var j = 0; j < poligonosJ[i].length; j++){

			var  xj = poligonosJ[i][j][0], yj = poligonosJ[i][j][1], corP = poligonosJ[i][j][2];
			
			var pontoJanela = [ [xj], [yj], [1] ];
			
			var pontoVP = multM(Mprojecao, pontoJanela);
			//console.log()
			
			pontoVP = [ pontoVP[0][0], pontoVP[1][0], corP ];

			//var verticeAtual = [xvp, yvp, corP];
			poligonoAtual.push(pontoVP);
		}
		scanLineTexture(poligonoAtual);
	}
}

function atualizaJanela(){
	var xij = parseInt(document.getElementById("xiJ").value);
	var xfj = parseInt(document.getElementById("xfJ").value);
	var yij = parseInt(document.getElementById("yiJ").value);
	var yfj = parseInt(document.getElementById("yfJ").value);

	janela = [xij, xfj, yij, yfj];
	limpaCanvas();
	calcProjecao();
	updatePoligonos();
}

function atualizaJanelaTexture(){
	var xij = parseInt(document.getElementById("xiJ").value);
	var xfj = parseInt(document.getElementById("xfJ").value);
	var yij = parseInt(document.getElementById("yiJ").value);
	var yfj = parseInt(document.getElementById("yfJ").value);

	janela = [xij, xfj, yij, yfj];
	limpaCanvas();
	calcProjecao();
	updatePoligonosTexture();
}

function desenha(pontoClicado){
	switch(algorithm){
		case Algorithms.CIRC:
			circunferencia(pontos[0], hip(pontos), [0, 0, 0, 255]);
			pontos = [];
			break;
		case Algorithms.ELIPSE:
			elipse(pontos[0], Math.abs(pontos[1][0] - pontos[0][0]), Math.abs(pontos[1][1] - pontos[0][1]), [0, 0, 0, 255]);
			pontos = [];
			break;
		case Algorithms.FFill:
			FFill(pontoClicado, COR, getPixel(pontoClicado[0], pontoClicado[1]));
			pontos = [];
			break;
		case Algorithms.BFill:
			BFill(pontoClicado, COR, [0, 0, 0, 255]);
			pontos = [];
			break;
	}
}