function bresenhan(xy, xy2, cor){

	var dy = xy2[1] - xy[1];
	var dx = xy2[0] - xy[0];
	
	var x = xy[0], y = xy[1];

	var incX, incY;

	if( dx > 0 ){
		incX = 1;
	} else{
		incX = -1;
		dx = Math.abs(dx);
	}

	if( dy > 0 ){
		incY = 1;
	} else{
		incY = -1;
		dy = Math.abs(dy);
	}

	var dy2 = 2*dy, dx2 = 2*dx;

	if( dx > dy ){
		var p = dy2 - dx;

		for (var k = 0; k <= dx; k++) {
			setPixel(x, y, cor);
			if( p > 0 ){
				y += incY;
				p -= dx2;
			}
			x += incX;
			p += dy2;
		}
	} else{
		var p = dx2 - dy;

		for (var k = 0; k <= dy; k++) {
			setPixel(x, y, cor);
			if( p > 0 ){
				x += incX;
				p -= dy2;
			}
			y += incY;
			p += dx2;
		}
	}
}