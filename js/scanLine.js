function scanLine(vertices, cor){
	console.log(vertices);

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
				intersecoes.push(xDaIntersecao);
			}
		}
		intersecoes = intersecoes.sort();
		// pinta a linha
		for (var k = 0; k < intersecoes.length - 1; k+=2) {
			var teste = intersecoes[k];
			bresenhan( [intersecoes[k], i], [intersecoes[k + 1], i], cor );
		}
	}
}