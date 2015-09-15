function World(){

	//tamanho da janela (xi, xf, yi, yf)
	this.windows = [0, 800, 0, 600];
	//poligonos com coordenadas do canvas
	this.CVPoligns = [];
	//poligonos com coordenadas de janela
	this.WPoligns = [];

	//dados 
	this.larguraVP = 0;
	this.alturaVP = 0;
	this.XInicialVP = 0;
	this.YInicialVP = 0;
	this.XFinalVP = 0;
	this.YFinalVP = 0;

	this.init = function(LVP, AVP, XIVP, XFVP, YIVP, YFVP) {
		this.larguraVP = LVP;
		this.alturaVP = AVP;
		this.XInicialVP = XIVP;
		this.XFinalVP = XFVP;
		this.YInicialVP = YIVP;
		this.YFinalVP = YFVP;
	}

	//vertices = array[ [p1],[p2]...[cor] ]
	this.addPolign = function(vertices){
		this.CVPoligns.push(vertices);
	}

	this.updateWindow = function(){
		for(var i = 0; i < this.CVPoligns.length; i++){
			var poligonoAtual = [];
			for(var j = 0; j < this.CVPoligns[i].length; j++){
				var verticeAtual = [];

				var Xj = (this.windows[1] - this.windows[0]) * (this.CVPoligns[i][j][0] - this.XInicialVP)/this.larguraVP + this.windows[0];
				var yj = this.windows[3] + ( (this.windows[3] - this.windows[2]) * (this.CVPoligns[i][j][1] - this.YInicialVP) )/this.alturaVP;

				verticeAtual.push(xj); verticeAtual.push(yj); verticeAtual.push(this.CVPoligns[i][j][2]);

				poligonoAtual.push(verticeAtual);
			}
		}
	}

	this.updateViewPort = function(cv, ctx){
		for(var i = 0; i < this.WPoligns.length; i++){
			for(var j = 0; j < this.WPoligns[i].length; j++){
				
			}		
		}
	}
}