import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaNuevaMateria } from './plantillas.js';
import { novedades } from '../app.js';
var htmlNav = ""
var htmlContent = ""

function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
    let mat = e.target.id;
    console.log(mat);
    
    const resultado = this.find( m => m.nu === mat );
    console.log(resultado)
    if (resultado.sub) {
      htmlContent = '<ul>' + resultado.sub.map(libro =>
      plantillaMateria(libro)
      ).join('')+'</ul>';
    } else {
        let nMateria = [];
	      novedades[0].libros.map(libro => {
        libro[mat].map(dato => {
        console.log(dato);
        if (!nMateria.includes(dato)) {
          console.log(dato);
          console.log(nMateria);
          nMateria.push(dato)
        }
    })
  })
  console.log(nMateria);
  nMateria  = nMateria.sort();
  nMateriaSR = [... new Set(nMateria)];
  htmlContent = '<ul>' + nMateria.map(nm =>
      plantillaNuevaMateria(nm)
      ).join('')+'</ul>';
  }

  resultados.insertAdjacentHTML('beforeend', htmlContent);
  resultados.addEventListener("click", mostrarResultados, false);      
  }
e.stopPropagation();
}

function buscarLibros (cri) {

	var busqueda = []
	console.log(cri)
	console.log(novedades[0].libros)
	let re = new RegExp(cri);
	for (let n in novedades[0].libros) {
    let registro = novedades[0].libros[n];
    console.log(registro['lugares']);
		for (let c in registro['lugares']){
      console.log(registro.lugares[c]);
			if (re.test(registro.lugares[c])) {
				busqueda.push(registro)
				break
			}
		}
	}
return busqueda
}
	
function mostrarResultados(e) {

  if (e.target !== e.currentTarget && e.target.id !=='') {

	menu.insertAdjacentHTML('afterbegin', htmlNav);
  let mat = e.target.id;
  let co = e.target.name;
  resultados.innerHTML = '';
  console.log(mat);
	const libros = buscarLibros(mat)
	console.log(libros)

  if(typeof libros !== 'undefined' && libros.length > 0) {
    var htmlContent = '';
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
