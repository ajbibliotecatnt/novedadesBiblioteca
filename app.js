import { vistaMenu, vistaInicio, vistaMensaje} from './js/vistas.js';
export const novedades = [];
export const materias = [];

(function () {

fetch("./datos/datosPrueba.json" , {cache: "no-store"})
	.then(response => response.json())
	.then(json => { vistaInicio(json);
        				novedades.push(json)})
	.then(addMenu)
	.catch(err => requestError(err));

function addMenu() {

	fetch("./datos/materias.json", {cache: "no-store"})
		.then(response => response.json())
  	.then(json => { materias.push(json)
			vistaMenu();
  		})
  	.catch(err => requestError(err));
}

function requestError(e, part) {
    console.log(e);
    vistaMensaje('¡Uf!, algo no ha ido bien');
}

})();

