function FFill(ponto, corF, corI){
        if( corI == corF ){
        	return;
        }
        var pixels = [];
        pixels.push(ponto);

        while(pixels.length > 0){
        	var n = pixels[0];
        	pixels.splice(0, 1);

        	var corPixelAtual = getPixel(n[0], n[1]);
        	if(corPixelAtual[0] == corI[0] && corPixelAtual[1] == corI[1] && corPixelAtual[2] == corI[2]){
        		setPixel(n[0], n[1], corF);

        		var corPixelDireito = getPixel(n[0] + 1, n[1]);
        		if(corPixelDireito[0] == corI[0] && corPixelDireito[1] == corI[1] && corPixelDireito[2] == corI[2]){
        			pixels.push([n[0] + 1, n[1]]);
        		}
        		var corPixelEsquerdo = getPixel(n[0] - 1, n[1]);
        		if(corPixelEsquerdo[0] == corI[0] && corPixelEsquerdo[1] == corI[1] && corPixelEsquerdo[2] == corI[2]){
        			pixels.push([n[0] - 1, n[1]]);
        		}
        		var corPixelCima = getPixel(n[0], n[1] - 1);
        		if(corPixelCima[0] == corI[0] && corPixelCima[1] == corI[1] && corPixelCima[2] == corI[2]){
        			pixels.push([n[0], n[1] - 1]);
        		}
        		var corPixelBaixo = getPixel(n[0], n[1] + 1);
        		if(corPixelBaixo[0] == corI[0] && corPixelBaixo[1] == corI[1] && corPixelBaixo[2] == corI[2]){
        			pixels.push([n[0], n[1] + 1]);
        		}

        	}
        }
}