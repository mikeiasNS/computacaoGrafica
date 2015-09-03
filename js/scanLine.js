function sortNumber(a,b) {
    return a[0] - b[0];
}

function scanLine(vertices, cor){
	var maiorY = vertices[0][1];
	var menorY = vertices[0][1];
	for(var i = 1; i < vertices.length; i++){
		if(vertices[i][1] > maiorY){
			maiorY = vertices[i][1];
		}
		if(vertices[i][1] < menorY){
			menorY = vertices[i][1];
		}
	}
	//inicio do poligono, até fim do poligono no eixo y 
	for(var i = menorY; i < maiorY; i++){
		var intersecoes = [];
		//percorre os vertices para calcular os t`s
		for(var j = 0; j < vertices.length; j++){
			// achar o y0, yf, x0 e xf da aresta
			var y0a, yfa, ta, x0a, xfa;
			if(j == vertices.length-1){
				// compare com o primeiro
				if(vertices[j][1] > vertices[0][1]){
					y0a = vertices[0][1];
					yfa = vertices[j][1];
					x0a = vertices[0][0];
					xfa = vertices[j][0];
				} else{
					yfa = vertices[0][1];
					y0a = vertices[j][1];
					xfa = vertices[0][0];
					x0a = vertices[j][0];
				}
			}else{
				// compare com o proximo
				if(vertices[j][1] > vertices[j + 1][1]){
					y0a = vertices[j + 1][1];
					yfa = vertices[j][1];
					x0a = vertices[j + 1][0];
					xfa = vertices[j][0];
				} else{
					yfa = vertices[j + 1][1];
					y0a = vertices[j][1];
					xfa = vertices[j + 1][0];
					x0a = vertices[j][0];
				}
			}

			ta = (i - y0a)/(yfa - y0a);

			var xDaIntersecao;
			if(ta >= 0 && ta < 1){
				xDaIntersecao = x0a + ta * (xfa - x0a);
				intersecoes.push([xDaIntersecao, ta, j]);
			}
		}
		intersecoes.sort(sortNumber);
		// pinta a linha
		for (var k = 0; k < intersecoes.length - 1; k+=2) {
			for(var xDoFor = intersecoes[k][0]; xDoFor < intersecoes[k + 1][0]; xDoFor++){
				var t = intersecoes[k][1];
				var v = intersecoes[k][2];

				var cor1 = [t * vertices[v][2][0], t * vertices[v][2][1], t * vertices[v][2][2]];
				if(v == vertices.length - 1){
					var cor2 = [(1 - t) * vertices[0][2][0], (1 - t) * vertices[0][2][1], (1 - t) * vertices[0][2][2]];
				} else{
					var cor2 = [(1 - t) * vertices[v + 1][2][0], (1 - t) * vertices[v + 1][2][1], (1 - t) * vertices[v + 1][2][2]];
				}
				var corFinal = [cor1[0] + cor2[0], cor1[1] + cor2[1], cor1[2] + cor2[2], 255];

				setPixel(xDoFor, i, corFinal);
			}
			// bresenhan( [intersecoes[k], i], [intersecoes[k + 1], i], cor );
		}
	}
}