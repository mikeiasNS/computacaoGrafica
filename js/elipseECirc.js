function circunferencia(xyc, r, cor){
			var x=0, y=r;
			var p = 1 - r;

			setPixel(x+xyc[0], y+xyc[1], cor); setPixel(-x+xyc[0],-y+xyc[1],cor);	setPixel(-x+xyc[0],y+xyc[1],cor); setPixel(x+xyc[0] ,-y+xyc[1],cor);
			setPixel(y+xyc[0] ,x+xyc[1] ,cor); setPixel(-y+xyc[0], -x+xyc[1],cor); setPixel(-y+xyc[0],x+xyc[1],cor);	setPixel(y+xyc[0],-x+xyc[1],cor);

			//for(var k=0; k<r*0.75;k++){
			while(x < y + 1){
				if(p > 0){
					y--;
					p -= 2 * y;
				}
				x++;
				p += 2 * x + 1;

				setPixel(x+xyc[0], y+xyc[1], cor); setPixel(-x+xyc[0],-y+xyc[1],cor); setPixel(-x+xyc[0],y+xyc[1],cor); setPixel(x+xyc[0] ,-y+xyc[1],cor);
				setPixel(y+xyc[0] ,x+xyc[1] ,cor); setPixel(-y+xyc[0], -x+xyc[1],cor); setPixel(-y+xyc[0],x+xyc[1],cor); setPixel(y+xyc[0],-x+xyc[1],cor);
			}
		}

		function elipse(ponto, r1, r2, cor){
			var x = 0, y = r2;
			var r1q = r1 * r1, r2q = r2 * r2;

			var p1 = r2q - r1q * r2 + r1q / 4;

			setPixel(ponto[0], ponto[1]+r2, cor);
			setPixel(ponto[0], ponto[1]-r2, cor);
			setPixel(ponto[0]+r1, ponto[1], cor);
			setPixel(ponto[0]-r1, ponto[1], cor);

			while(r1q * (y-1/2) > r2q * (x + 1)){

				if(p1 < 0){
					x++;
				} else{
					p1 += r1q * (-2 * y + 2);
					x++;
					y--;
				}
				p1 += r2q * (2 * x + 3);

				setPixel(ponto[0] + x, ponto[1] + y, cor);
				setPixel(ponto[0] + x, ponto[1] - y, cor);
				setPixel(ponto[0] - x, ponto[1] + y, cor);
				setPixel(ponto[0] - x, ponto[1] - y, cor);

			}

			var p2 = (r2q * (x + 1 / 2) * (x + 1 / 2) + r1q * (y - 1) * (y - 1) - r1q * r2q);

			while(y > 0){
				if(p2 < 0){
					p2 += r2q * (2 * x + 2);
					x++;
					y--;
				} else {
					y--;
				}
				p2 += r1q * (-2 * y + 3);

				setPixel(ponto[0] + x, ponto[1] + y, cor);
				setPixel(ponto[0] + x, ponto[1] - y, cor);
				setPixel(ponto[0] - x, ponto[1] + y, cor);
				setPixel(ponto[0] - x, ponto[1] - y, cor);
			}

		}