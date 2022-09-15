import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaInicio, vistaMaterias, vistaInicio, vistaResultados} from './plantillas.js';
import { materias, novedades} from '../app.js';

var htmlContent = "";
var datosMaterias = {};

function inicio(n) {
	if (n.target) {n = novedades[0];};
	htmlContent = plantillaInicio(n);
	vistaInicio(htmlContent);
}

function volver () {
	bVolver.style.display = "none";
	htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
	resultados.insertAdjacentHTML('beforeend', htmlContent);
  resultados.addEventListener("click", mostrarResultados, false);
}

function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  
  	let tit = e.target.getAttribute('data-tipo');
  	let mat = e.target.id;
  	let resultado = materias[0].find( m => m.nu === mat );
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		datosMaterias.lMaterias = buscarMaterias(grupo, "materias", mat);
  		datosMaterias.tipo = "materias";

			htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
			
		  	} else {
  		if (resultado.sub) {
  			datosMaterias.lMaterias = resultado;
  			datosMaterias.tipo = resultado.sub[0].campoB
      	htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
  		} else {
  			datosMaterias.lMaterias = buscarMaterias(novedades[0].libros, mat, "0");
  			datosMaterias.tipo = resultado.campoB;
  			htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
  		}
  	} 
		vistaMaterias(htmlContent);
  }
e.stopPropagation();
}

function buscarMaterias (arr, mat, num) {
	let nMateria = [];
	let obj
	arr.map(libro => {
  	libro[mat].map(dato => {
      if (!nMateria.find(e => e.no === dato)) {
        nMateria.push({"no":dato, "campoB":mat, "num":num})
        }
    })
  })
  nMateria  = nMateria.sort((a, b) => a.no.localeCompare(b.no));
  return nMateria;
}

function buscarLibros (cri, fil) {

	var busqueda = []
	if (/\W/.test(cri)) {
		cri = cri.replace(/(?=[() ])/g, '\\');
	}
	if (/^\d/.test(cri)) {
		cri = `^${cri}|:${cri}`;
	}

	let reg = new RegExp(cri);
	for (let n in novedades[0].libros) {
		for (let c in novedades[0].libros[n][fil]){
			if (reg.test(novedades[0].libros[n][fil][c])) {
				busqueda.push(novedades[0].libros[n])
				break
			}
		}
	}
return busqueda
}


function mostrarResultados(e) {

  if (e.target !== e.currentTarget && e.target.id !=='') {

  let mat = e.target.id;

  console.log(datosMaterias);
	const libros = buscarLibros(mat, datosMaterias.tipo)

  if(typeof libros !== 'undefined' && libros.length > 0) {
    var htmlContent = '';
    
    htmlContent = '<p>'+libros.length+' libros sobre '+ mat +'</p><ul>' + libros.map(libro =>
			plantillaLibro(libro)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes ¿pocas novedades sobre esa materia?... cchs_adquisiciones.tnt<span class="correo">FrañldifaDF</span>@cchs.csic.es</div>';
      }
		vistaResultados(htmlContent);     
      }
   e.stopPropagation();
}


function mostrarTodo() {
	console.log(htmlContent);
	htmlContent = "";
  resultados.innerHTML = '';
  masMaterias.innerHTML = '';
	 htmlContent = '<p>Todo:</p><ul>' + novedades[0].libros.map(libro =>
	 		plantillaLibro(libro)
		).join('')+'</ul>';
		resultados.insertAdjacentHTML('beforeend', htmlContent); 
}

export { mostrarMaterias, mostrarResultados, mostrarTodo, inicio, volver, datosMaterias};
