import { vistaMaterias, vistaInicio, vistaResultados} from './vistas.js';
import { materias, novedades} from '../app.js';

let datosMaterias = {};
let datosLibros = {};

function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  	let tit = e.target.getAttribute('data-tipo');
  	let mat = e.target.id;
  	let resultado = materias[0].find( m => m.nu === mat );
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		datosMaterias.lMaterias = buscarMaterias(datosLibros.lLibros, "materias", mat);
  		datosMaterias.tipo = "materias";
  		datosMaterias.botones ="menos";		
		  	} else {
  		if (resultado.sub) {
  			datosMaterias.lMaterias = resultado;
  			datosMaterias.tipo = resultado.sub[0].campoB
  			datosMaterias.botones = "mas";
  		} else {
  			datosMaterias.lMaterias = buscarMaterias(novedades[0].libros, mat, "0");
  			datosMaterias.tipo = resultado.campoB;
  			datosMaterias.botones = "ninguno"
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
	/* Ordena alfabéticamente el listado de materias */
  nMateria  = nMateria.sort((a, b) => a.no.localeCompare(b.no));
  return nMateria;
}

function mostrarResultados(e) {
	if (e.target.id == "Book" || e.target.id == "Issue" || e.target.id == "Digital") {
	let documentos = [];
	novedades[0].libros.map(n => {
		if (n.holding[0].mat == e.target.id) {
			documentos.push(n)
		}
	});
	datosLibros.lLibros = documentos;
	vistaResultados("listado");
	}
  if (e.target !== e.currentTarget && e.target.id !=='') {
  let mat = e.target.id;
  datosLibros.lLibros = buscarLibros(mat, datosMaterias.tipo);
	vistaResultados("busqueda");     
  }
   e.stopPropagation();
}

function buscarLibros (cri, fil) {

	let busqueda = []
	/* "Escapa" los paréntesis de las palabras de las búsquedas con letras para que funcionen correctamente*/
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
			}
		}
	}
	/* Elimina los registros que se han recuperado más de una vez en la búsqueda */
	busqueda = busqueda.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id
  ))
)
	datosLibros.lLibros = busqueda;
	return busqueda
}

export { mostrarMaterias, mostrarResultados, datosMaterias, datosLibros};
