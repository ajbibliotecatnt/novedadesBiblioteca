import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaBotonMasMaterias, plantillaBotonVolver, plantillaInicio, plantillaBotonInicio} from './plantillas.js';
import { materias, novedades} from '../app.js';

var htmlContent = "";

function inicio(n) {

	resultados.innerHTML = '';
	masMaterias.innerHTML = '';
	htmlContent = plantillaInicio(n);
	resultados.insertAdjacentHTML('beforeend', htmlContent);
	document.getElementById("todo").addEventListener("click", mostrarTodo, false);
}

function volver (lMaterias, tipo) {
	htmlContent = plantillaMateria(lMaterias, tipo);
	  	resultados.insertAdjacentHTML('beforeend', htmlContent);
  	resultados.addEventListener("click", mostrarResultados, false);
  	resultados.myParam = tipo;
  	resultados.arr = lMaterias;
}

function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  
  	let tit = e.target.getAttribute('data-tipo');
  	let mat = e.target.id;
  	let resultado = materias[0].find( m => m.nu === mat );
  	let lMaterias = []
  	let tipo = '';
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		lMaterias = buscarMaterias(grupo, "materias", mat);
  		tipo = resultado.campoB
			htmlContent = plantillaMateria(lMaterias, tipo);
		  	} else {
  		if (resultado.sub) {
  			lMaterias = resultado;
  			tipo = resultado.sub[0].campoB
      		htmlContent = plantillaMateria(resultado, tipo);
  		} else {
  			lMaterias = buscarMaterias(novedades[0].libros, mat, "0");
  			tipo = resultado.campoB;
  			htmlContent = plantillaMateria(lMaterias, tipo);
  			htmlContent = htmlContent + plantillaBotonInicio(novedades[0]);
  		}
  	} 

  	resultados.insertAdjacentHTML('beforeend', htmlContent);
  	resultados.addEventListener("click", mostrarResultados, false);
  	resultados.myParam = tipo;
  	resultados.arr = lMaterias; 
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
  const tip = e.currentTarget.myParam 
  let co = e.target.attributes.name.value;
  resultados.innerHTML = '';
  masMaterias.innerHTML = '';
	const libros = buscarLibros(mat, co)

  if(typeof libros !== 'undefined' && libros.length > 0) {
    var htmlContent = '';
    var htmlCamino = '';
    
    htmlContent = '<p>'+libros.length+' libros sobre '+ mat +'</p><ul>' + libros.map(libro =>
			plantillaLibro(libro)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes ¿pocas novedades sobre esa materia?... cchs_adquisiciones.tnt<span class="correo">FrañldifaDF</span>@cchs.csic.es</div>';
      }
      plantillaBotonVolver (e.currentTarget.arr, tip);
      resultados.insertAdjacentHTML('beforeend', htmlContent);       
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

export { mostrarMaterias, mostrarResultados, mostrarTodo, inicio, volver};
