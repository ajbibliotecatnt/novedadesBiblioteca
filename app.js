import { plantillaLibro, TemplateMenuMateria, plantillaMateria } from './js/plantillas.js';
import { mostrarMaterias } from './js/utiles.js';
export const novedades = [];
export const materias = [];
(function () {
'use strict';

let htmlContent = '';
let htmlNav;
const resultados = document.querySelector('#resultados');

fetch("./datos/datos.json" , {cache: "no-store"})
	.then(response => response.json())
	.then(json => novedades.push(json))
	.then(addMenu)
	.catch(err => requestError(err));


function addMenu() {

	fetch("./datos/materias.json")
		.then(response => response.json())
  	.then(json => { materias.push(json)
  		htmlNav = TemplateMenuMateria(materias[0]);
		menu.insertAdjacentHTML('afterbegin', htmlNav);
  		menu.addEventListener("click", mostrarMaterias.bind(materias[0]), false);
  		})
  	.catch(err => requestError(err));
	
	console.log(novedades);

}

function requestError(e, part) {
    console.log(e);
    resultados.insertAdjacentHTML('beforeend', `<p class="network-warning">Uff, algo no ha ido bien.</p>`);
}

})();

