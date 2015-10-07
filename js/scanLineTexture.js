function sortNumber(a,b) {
    return a[0] - b[0];
}

function apagaArestas(vertices){
	for(var i = 0; i < vertices.length; i++){
		if(i == vertices.length - 1){
			bresenhan(vertices[i], vertices[0], [255, 255, 255, 255]);
		} else{
			bresenhan(vertices[i], vertices[i + 1], [255, 255, 255, 255]);
		}
	}
}

function scanLineTexture(vertices){

	var dados = ctx.getImageData(0, 0, cv.width, cv.height);

	// apagaArestas(vertices);
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
			var y0j = true;
			var y0a, yfa, ta, x0a, xfa;
			if(j == vertices.length-1){
				// compare com o primeiro
				if(vertices[j][1] > vertices[0][1]){
					y0a = vertices[0][1];
					yfa = vertices[j][1];
					x0a = vertices[0][0];
					xfa = vertices[j][0];
				} else{
					y0j = false;
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
					y0j = false;
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

				var ps1;
				var ps2;
				var psf;
				if(!y0j){
					ps1 = [(1 - ta) * vertices[j][2][0], (1 - ta) * vertices[j][2][1], (1 - ta) * vertices[j][2][2]];
					if(j == vertices.length - 1){
						ps2 = [ta * vertices[0][2][0], ta * vertices[0][2][1]];
					} else{
						ps2 = [ta * vertices[j + 1][2][0], ta * vertices[j + 1][2][1]];
					}

					psf = [ps1[0] + ps2[0], ps1[1] + ps2[1], ps1[2] + ps2[2], 255];
				} else{
					ps1 = [ta * vertices[j][2][0], ta * vertices[j][2][1]];
					if(j == vertices.length - 1){
						ps2 = [(1 - ta) * vertices[0][2][0], (1 - ta) * vertices[0][2][1], (1 - ta) * vertices[0][2][2]];
					} else{
						ps2 = [(1 - ta) * vertices[j + 1][2][0], (1 - ta) * vertices[j + 1][2][1]];
					}

					psf = [ps1[0] + ps2[0], ps1[1] + ps2[1]];
				}

				intersecoes.push([xDaIntersecao, ta, psf]);
			}
		}
		intersecoes.sort(sortNumber);
		// pinta a linha
		for (var k = 0; k < intersecoes.length - 1; k+=2) {

			for(var x = intersecoes[k][0]; x <= intersecoes[k + 1][0]; x++){
				var t = (x - intersecoes[k][0]) / (intersecoes[k + 1][0] - intersecoes[k][0]);
				var xs = intersecoes[k][2][0];
				var ys = intersecoes[k][2][1];
				var xs2 = intersecoes[k + 1][2][0];
				var ys2 = intersecoes[k + 1][2][1];
				
				var ps1 = [(1 - t) * xs, (1 - t) * ys];
				var ps2 = [t * xs2, t * ys2];

				var psf = [ps1[0] + ps2[0], ps1[1] + ps2[1]];

				var xDoCV2 = psf[0] * cv2.width;
				var yDoCV2 = psf[1] * cv2.height;

				var corP = getPixel2(xDoCV2, yDoCV2);

				setPixel2(dados.data, x, i, corP);
			}
		}
	}
	ctx.putImageData(dados, 0, 0);
}