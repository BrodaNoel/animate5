/*
	Animate5
	Version 0.1

	Broda Noel
*/

var animate5 = {};

	animate5.peoples = {};
	animate5.ids = [];
	animate5.peoples.mans = [];
	animate5.peoples.womans = [];
	animate5.puntoDeInicio = { x : 0, y : 0};
	animate5.cantidadDeFrames = 25;
	animate5.tiempoEnHacerUnPaso = 500;
	animate5.debugear = false;

animate5.debug = function(){
	animate5.c.beginPath(); animate5.c.moveTo(10,450); animate5.c.lineTo(110,450); animate5.c.stroke();
}

animate5.init = function(attr){
	if(animate5.isUndefined(attr) || animate5.isUndefined(attr.canvas))
		animate5.canvas = document.getElementsByTagName('canvas')[0];
	else
		animate5.canvas = document.getElementById(attr.canvas);

	if(!animate5.canvas.getContext){
		alert('Su browser es asquerosamente viejo. Aquí no funciono yo');
		return false;
	}

	animate5.c = animate5.canvas.getContext('2d');
	animate5.w = animate5.canvas.width;
	animate5.h = animate5.canvas.height;
	animate5.p = animate5.isUndefined(attr) || !(+attr.piso) ? 0 : +attr.piso;

	animate5.puntoDeInicio.x = 10;//parseInt(animate5.w / 2);
	animate5.puntoDeInicio.y = animate5.h - animate5.p;

	setTimeout(animate5.borrar, 1000 / animate5.cantidadDeFrames);
}

animate5.borrar = function(){
	animate5.c.clearRect(0,0,animate5.w,animate5.h);
	animate5.dibujar();
}

animate5.actualizar = function(){
	//
}

animate5.dibujar = function(){
	var gente = animate5.peoples.mans.concat(
												animate5.peoples.womas
											);

	var dibujo = null;
	var punto = null;

	if(animate5.debugear)
		animate5.debug();

	for(var i in gente){
		var persona = gente[i];

		if(!persona)
			continue;

		persona.nextPosicion();

		//Pierna Izquierda
		//Es una linea
		dibujo = persona.partes['piernaIzquierda'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Pierna Derecha
		//Es una linea
		dibujo = persona.partes['piernaDerecha'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Torax
		//Es una linea
		dibujo = persona.partes['torax'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Brazo Izquierdo
		//Es una linea
		dibujo = persona.partes['brazoIzquierdo'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Brazo Derecho
		//Es una linea
		dibujo = persona.partes['brazoDerecho'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Ante Brazo Izquierdo
		//Es una linea
		dibujo = persona.partes['anteBrazoIzquierdo'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Ante Brazo Derecho
		//Es una linea
		dibujo = persona.partes['anteBrazoDerecho'].nextFrame();
		animate5.c.beginPath();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.moveTo(punto.x, punto.y);
		punto = animate5.calcularCoordenada(persona, dibujo.fin);
		animate5.c.lineTo(punto.x, punto.y);
		animate5.c.stroke();

		//Cabeza
		//Es un circulo
		dibujo = persona.partes['cabeza'].nextFrame();
		punto = animate5.calcularCoordenada(persona, dibujo.inicio);
		animate5.c.beginPath();
		animate5.c.arc(punto.x, punto.y, dibujo.radio, 0, Math.PI * 2, true);
		animate5.c.stroke();
	}

	setTimeout(animate5.borrar, 1000 / animate5.cantidadDeFrames);
}

animate5.getPeopleById = function(id){
	if(animate5.peoples.mans[id])
		return animate5.peoples.mans[id];
	else if(animate5.peoples.womans[id])
		return animate5.peoples.womans[id];
	else{
		alert('No existe una persona con ID: ' + id);
		return false;
	}
}

/**
			GENERAR PERSONA
*/

animate5.generarPersona = function(attr){
	var persona = {};
	persona.partes = [];
	persona.alma = {};
	persona.posicion = { x : animate5.puntoDeInicio.x, y : animate5.puntoDeInicio.y};
	persona.posicionPendientes = [];

	persona.nextPosicion = function(){
		if(persona.posicionPendientes.length > 0){
			persona.posicion = persona.posicionPendientes[0];
			persona.posicionPendientes[0] = null;
			persona.posicionPendientes = animate5.limpiarArray(persona.posicionPendientes);
		}
	}

	persona.getPosicion = function(){
		return persona.posicionPendientes.length > 0 ? persona.posicionPendientes[0] : persona.posicion;
	}

	//Generamos un ID para la persona.
	if(+attr.id > 0){
		//En base al ID que nos mandan
		var id = +attr.id;
		if(animate5.ids.indexOf(id) == -1)
			persona.id = id;
		else{
			alert('Ya existe una persona con ese ID');
			return false;
		}
	}else{
		//Generamos ID nuevo
		var id = 1;
		while(animate5.ids.indexOf(id) != -1){
			id++;
		}
		persona.id = id;
	}

	persona.partes['piernaIzquierda'] = animate5.generarPierna(true);
	persona.partes['piernaDerecha'] = animate5.generarPierna(false);
	persona.partes['torax'] = animate5.generarTorax(persona.partes['piernaDerecha'].dibujoBase.inicio);
	persona.partes['brazoIzquierdo'] = animate5.generarBrazo(true, persona.partes['torax'].dibujoBase.inicio);
	persona.partes['brazoDerecho'] = animate5.generarBrazo(false, persona.partes['torax'].dibujoBase.inicio);
	persona.partes['anteBrazoIzquierdo'] = animate5.generarAnteBrazo(true, persona.partes['brazoIzquierdo'].dibujoBase.fin);
	persona.partes['anteBrazoDerecho'] = animate5.generarAnteBrazo(false, persona.partes['brazoDerecho'].dibujoBase.fin);
	persona.partes['cabeza'] = animate5.generarCabeza(persona.partes['torax'].dibujoBase.inicio);

	//Acciones Publicas
	persona.walk = function(distancia){
		var largoDelPaso = animate5.calcularLargoDelPaso(persona.partes['piernaIzquierda'], persona.partes['piernaDerecha']);
		var cantidadDePasos = Math.floor(distancia / largoDelPaso);
		var framesADibujar = Math.floor(animate5.cantidadDeFrames / (1000 / animate5.tiempoEnHacerUnPaso));
		for(var i = 0; i < cantidadDePasos; i++){
			persona.partes['piernaIzquierda'].setPasos(animate5.generarMovimientoPierna(persona.partes['piernaIzquierda'], framesADibujar));
			persona.partes['piernaDerecha'].setPasos(animate5.generarMovimientoPierna(persona.partes['piernaDerecha'], framesADibujar));
		}

		var cantidadDePixelesADesplazarPorFrame = largoDelPaso / framesADibujar;
		var posicionInicial = persona.getPosicion().x;
		for(var i = 0; i < cantidadDePasos; i++){
			for(var j = 0; j < framesADibujar; j++){
				posicionInicial += cantidadDePixelesADesplazarPorFrame;
				persona.posicionPendientes.push({
													x : posicionInicial,
													y : persona.getPosicion().y
												});
			}
		}
	}
	
	if(attr.genero == 'W')
		animate5.peoples.womans[persona.id] = persona;
	else
		animate5.peoples.mans[persona.id] = persona;

	//Cortamos el flujo devolviendo el ID de la persona
	return persona.id;
}

animate5.generarPierna = function(esIzquierda){
	var pierna = {};
	pierna.movimientosPendientes = [];

	pierna.nextFrame = function(){
		if(pierna.movimientosPendientes.length > 0){
			var retorno = pierna.movimientosPendientes[0];
			pierna.movimientosPendientes[0] = null;
			pierna.movimientosPendientes = animate5.limpiarArray(pierna.movimientosPendientes);
			return retorno;
		}else{
			return pierna.dibujoBase;
		}
	}

	pierna.getFrame = function(){
		return pierna.movimientosPendientes.length > 0 ? pierna.movimientosPendientes[0] : pierna.dibujoBase;
	}

	pierna.setPasos = function(pasos){
		pierna.movimientosPendientes = pierna.movimientosPendientes.concat(pasos);
	}

	if(esIzquierda){
		pierna.dibujoBase =	{
								inicio:	{ x : 0, y : 40},
								fin: 	{ x : 10, y : 0}
							};
	}else{
		pierna.dibujoBase =	{
								inicio:	{ x : 0, y : 40},
								fin: 	{ x : -10, y : 0}
							};
	}

	return pierna;
}

animate5.generarTorax = function(inicio){
	var torax = {};
	torax.movimientosPendientes = [];

	torax.nextFrame = function(){
		if(torax.movimientosPendientes.length > 0){
			var retorno = torax.movimientosPendientes[0];
			torax.movimientosPendientes[0] = null;
			torax.movimientosPendientes = animate5.limpiarArray(torax.movimientosPendientes);
			return retorno;
		}else{
			return torax.dibujoBase;
		}
	}

	torax.getFrame = function(){
		return torax.movimientosPendientes.length > 0 ? torax.movimientosPendientes[0] : torax.dibujoBase;
	}

	torax.dibujoBase =	{
							inicio: { x : inicio.x, y : inicio.y + 30},
							fin:	inicio
						};

	return torax;
}

animate5.generarBrazo = function(esIzquierda, inicio){
	var brazo = {};
	brazo.movimientosPendientes = [];

	brazo.nextFrame = function(){
		if(brazo.movimientosPendientes.length > 0){
			var retorno = brazo.movimientosPendientes[0];
			brazo.movimientosPendientes[0] = null;
			brazo.movimientosPendientes = animate5.limpiarArray(brazo.movimientosPendientes);
			return retorno;
		}else{
			return brazo.dibujoBase;
		}
	}

	brazo.getFrame = function(){
		return brazo.movimientosPendientes.length > 0 ? brazo.movimientosPendientes[0] : brazo.dibujoBase;
	}

	if(esIzquierda){
		brazo.dibujoBase =	{
								inicio:	inicio,
								fin: 	{ x : inicio.x + 4, y : inicio.y - 18}
							};
	}else{
		brazo.dibujoBase =	{
								inicio:	inicio,
								fin: 	{ x : inicio.x - 4, y : inicio.y - 18}
							};
	}

	return brazo;
}

animate5.generarAnteBrazo = function(esIzquierda, inicio){
	var anteBrazo = {};
	anteBrazo.movimientosPendientes = [];

	anteBrazo.nextFrame = function(){
		if(anteBrazo.movimientosPendientes.length > 0){
			var retorno = anteBrazo.movimientosPendientes[0];
			anteBrazo.movimientosPendientes[0] = null;
			anteBrazo.movimientosPendientes = animate5.limpiarArray(anteBrazo.movimientosPendientes);
			return retorno;
		}else{
			return anteBrazo.dibujoBase;
		}
	}

	anteBrazo.getFrame = function(){
		return anteBrazo.movimientosPendientes.length > 0 ? anteBrazo.movimientosPendientes[0] : anteBrazo.dibujoBase;
	}

	if(esIzquierda){
		anteBrazo.dibujoBase =	{
								inicio:	inicio,
								fin: 	{ x : inicio.x, y : inicio.y - 17}
							};
	}else{
		anteBrazo.dibujoBase =	{
								inicio:	inicio,
								fin: 	{ x : inicio.x, y : inicio.y - 17}
							};
	}

	return anteBrazo;
}

animate5.generarCabeza = function(inicio){
	var cabeza = {};
	cabeza.movimientosPendientes = [];

	cabeza.nextFrame = function(){
		if(cabeza.movimientosPendientes.length > 0){
			var retorno = cabeza.movimientosPendientes[0];
			cabeza.movimientosPendientes[0] = null;
			cabeza.movimientosPendientes = animate5.limpiarArray(cabeza.movimientosPendientes);
			return retorno;
		}else{
			return cabeza.dibujoBase;
		}
	}

	cabeza.getFrame = function(){
		return cabeza.movimientosPendientes.length > 0 ? cabeza.movimientosPendientes[0] : cabeza.dibujoBase;
	}

	var radio = 7;
	cabeza.dibujoBase =	{
							inicio: { x : inicio.x, y : inicio.y + radio},
							radio:	radio
						};

	return cabeza;
}

/**
				CALCULOS
*/
animate5.calcularCoordenada = function(cuerpo, punto){
	return { x : cuerpo.getPosicion().x + punto.x, y : cuerpo.getPosicion().y - punto.y};
}

animate5.calcularLargoDelPaso = function(pierna1, pierna2){
	return Math.abs(pierna1.dibujoBase.fin.x - pierna2.dibujoBase.fin.x);
}

/**
				GENERAR
*/
animate5.generarMovimientoPierna = function(pierna, framesADibujar){
	var retorno = [];
	var frame = pierna.getFrame();
	var pixelesADesplazar = (frame.inicio.x - frame.fin.x) * 2;
	var pixelesADesplazarEnFinPorFrame = pixelesADesplazar / framesADibujar;
	
	var ultimaPosicionInicioX = frame.inicio.x;
	var ultimaPosicionFinX = frame.fin.x;
	for(var i = 0; i < framesADibujar; i++){
		ultimaPosicionInicioX = ultimaPosicionInicioX;
		ultimaPosicionFinX = ultimaPosicionFinX + pixelesADesplazarEnFinPorFrame;

		retorno.push(	{
							inicio:	{ x : ultimaPosicionInicioX, y : frame.inicio.y},
							fin: 	{ x : ultimaPosicionFinX, y : frame.fin.y},
						});
	}

	return retorno;
}

/**
				SOPORTE
*/
animate5.limpiarArray = function(array){
	var retorno = [];
	for(var index in array)
		if(array[index] != null && array[index] != undefined)
			retorno[retorno.length] = array[index];
	return retorno;
}

animate5.isUndefined = function(variable){
	return typeof variable == "undefined";
}