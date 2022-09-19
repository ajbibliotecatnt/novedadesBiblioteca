import { plantillaLibro, TemplateMenuMateria, plantillaMateria} from './js/plantillas.js';
import { mostrarMaterias, inicio} from './js/utiles.js';
export const novedades = [];
export const materias = [];

export const resultados = document.querySelector('#resultados');

(function () {
'use strict';

let htmlNav;


fetch("./datos/datos.json" , {cache: "no-store"})
	.then(response => response.json())
	.then(json => { inicio(json);
        				novedades.push(json)})
	.then(addMenu)
	.catch(err => requestError(err));


function addMenu() {

	fetch("./datos/materias.json", {cache: "no-store"})
		.then(response => response.json())
  	.then(json => { materias.push(json)
  		htmlNav = TemplateMenuMateria(materias[0]);
		menu.insertAdjacentHTML('afterbegin', htmlNav);
  		menu.addEventListener("click", mostrarMaterias, false);
  		})
  	.catch(err => requestError(err));
}

function requestError(e, part) {
    console.log(e);
    resultados.insertAdjacentHTML('beforeend', `<p class="network-warning">Uff, algo no ha ido bien.</p>`);
}

})();

