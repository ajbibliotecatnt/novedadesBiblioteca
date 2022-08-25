import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaBotonMasMaterias, plantillaBotonCamino } from './plantillas.js';
import { novedades } from '../app.js';
import { materias } from '../app.js';
var htmlNav = "";


function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  
  	let tit = e.target.getAttribute('data-tipo');
  	console.log(tit);
  	let mat = e.target.id;
  	console.log(mat);
  	let resultado = materias[0].find( m => m.nu === mat );
  	console.log(resultado);
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		console.log(grupo);
  		let arrMate = buscarMaterias(grupo, "materias");
		plantillaMateria(arrMate, "materias");
		  	} else {
  		if (resultado.sub) {
  				console.log(resultado.sub, resultado);
      		plantillaMateria(resultado.sub, "cdu");
      		//plantillaBotonMasMaterias(mat);
  		} else {
  			var nma = buscarMaterias(novedades[0].libros, mat);
  			console.log(nma, resultado.nu)
  			plantillaMateria(nma, resultado.nu);
  		}
  	}  
  }
e.stopPropagation();
}

function buscarMaterias (arr, mat) {
	let nMateria = [];
	arr.map(libro => {
  	libro[mat].map(dato => {
    	console.log(dato);
      if (!nMateria.includes(dato)) {
        nMateria.push(dato)
        }
    })
  })
	console.log(nMateria);
  nMateria  = nMateria.sort();
  return nMateria;
}

function buscarLibros (cri, fil) {

		var busqueda = []
		console.log(cri)
		console.log(novedades[0].libros)
		let re = new RegExp(cri);
		for (let n in novedades[0].libros) {
			for (let c in novedades[0].libros[n][fil]){
				if (re.test(novedades[0].libros[n][fil][c])) {
					busqueda.push(novedades[0].libros[n])
					break
				}
			}
		}
	return busqueda
}


function mostrarResultados(e) {

  if (e.target !== e.currentTarget && e.target.id !=='') {

	menu.insertAdjacentHTML('afterbegin', htmlNav);
	console.log(e);
  let mat = e.target.id;
  console.log(e.currentTarget.myParam);
  const tip = e.currentTarget.myParam 
  let co = e.target.attributes.name.value;
  console.log(mat);
  console.log(co);
  resultados.innerHTML = '';
  masMaterias.innerHTML = '';
  console.log(mat);
	const libros = buscarLibros(mat, co)
	console.log(libros)

  if(typeof libros !== 'undefined' && libros.length > 0) {
    var htmlContent = '';
    var htmlCamino = '';
    plantillaBotonCamino (e.currentTarget.arr, tip);
	console.log(e.currentTarget.arr);
    htmlContent = '<ul>' + libros.map(libro =>
			plantillaLibro(libro)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes</div>';
      }
      resultados.insertAdjacentHTML('beforeend', htmlContent);       
      }
   e.stopPropagation();
}

export { mostrarMaterias, mostrarResultados};
