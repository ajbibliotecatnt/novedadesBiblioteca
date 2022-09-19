import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaInicio} from './plantillas.js';
import { vistaMaterias, vistaInicio, vistaResultados} from './vistas.js';
import { materias, novedades} from '../app.js';

var htmlContent = "";
var datosMaterias = {};
var datosLibros = {};

function inicio(n) {
	if (n.target) {n = novedades[0];};
	htmlContent = plantillaInicio(n);
	vistaInicio(htmlContent);
}


function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  	console.log(datosMaterias);
  	let tit = e.target.getAttribute('data-tipo');
  	let mat = e.target.id;
  	let resultado = materias[0].find( m => m.nu === mat );
  	console.log(mat, resultado);
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		datosMaterias.lMaterias = buscarMaterias(grupo, "materias", mat);
  		datosMaterias.tipo = "materias";		
		  	} else {
  		if (resultado.sub) {
  			datosMaterias.lMaterias = resultado;
  			datosMaterias.tipo = resultado.sub[0].campoB
  		} else {
  			datosMaterias.lMaterias = buscarMaterias(novedades[0].libros, mat, "0");
  			datosMaterias.tipo = resultado.campoB;
  		}
  	} 
		vistaMaterias();
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

	console.log(cri, fil);

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
	datosLibros.lLibros = busqueda;
return busqueda
}


function mostrarResultados(e) {

  if (e.target !== e.currentTarget && e.target.id !=='') {

  let mat = e.target.id;
  console.log(mat);
  console.log(datosMaterias);
  console.log(datosLibros);
	buscarLibros(mat, datosMaterias.tipo)
	vistaResultados(datosLibros.lLibros);     
      }
   e.stopPropagation();
}

/*
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
*/
export { mostrarMaterias, mostrarResultados, inicio, datosMaterias};
