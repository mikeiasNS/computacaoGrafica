function BFill(ponto, corF, corB){
        var pixels = [];
	pixels.push(ponto);

	while(pixels.length > 0){
		var n = pixels[0];
		pixels.splice(0, 1);

		var corPixelAtual = getPixel(n[0], n[1]);
		if((corPixelAtual[0] != corB[0] || corPixelAtual[1] != corB[1] || corPixelAtual[2] != corB[2]) && (corPixelAtual[0] != corF[0] || corPixelAtual[1] != corF[1] || corPixelAtual[2] != corF[2])){
			setPixel(n[0], n[1], corF);

			var corPixelDireito = getPixel(n[0] + 1, n[1]);
			if((corPixelDireito[0] != corB[0] || corPixelDireito[1] != corB[1] || corPixelDireito[2] != corB[2]) && (corPixelDireito[0] != corF[0] || corPixelDireito[1] != corF[1] || corPixelDireito[2] != corF[2])){
				pixels.push([n[0] + 1, n[1]]);
			}
			var corPixelEsquerdo = getPixel(n[0] - 1, n[1]);
			if((corPixelEsquerdo[0] != corB[0] || corPixelEsquerdo[1] != corB[1] || corPixelEsquerdo[2] != corB[2]) && (corPixelEsquerdo[0] != corF[0] || corPixelEsquerdo[1] != corF[1] || corPixelEsquerdo[2] != corF[2])){
				pixels.push([n[0] - 1, n[1]]);
			}
			var corPixelCima = getPixel(n[0], n[1] - 1);
			if((corPixelCima[0] != corB[0] || corPixelCima[1] != corB[1] || corPixelCima[2] != corB[2]) && (corPixelCima[0] != corF[0] || corPixelCima[1] != corF[1] || corPixelCima[2] != corF[2])){
				pixels.push([n[0], n[1] - 1]);
			}
			var corPixelBaixo = getPixel(n[0], n[1] + 1);
			if((corPixelBaixo[0] != corB[0] || corPixelBaixo[1] != corB[1] || corPixelBaixo[2] != corB[2]) && (corPixelBaixo[0] != corF[0] || corPixelBaixo[1] != corF[1] || corPixelBaixo[2] != corF[2])){
				pixels.push([n[0], n[1] + 1]);
			}

		}
	}
        }