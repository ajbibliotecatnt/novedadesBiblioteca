import { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaInicio} from './plantillas.js';
import { mostrarResultados, mostrarMaterias, inicio, datosMaterias} from './utiles.js';
import { materias, novedades} from '../app.js';

var htmlContent = "";

export let bMasMaterias = document.querySelector("div#masMateriasMas .button[name='mas']");
export let bMenosMaterias = document.querySelector("div#masMateriasMas .button[name='menos']");


function vistaInicio(htmlContent) {
	resultados.innerHTML = '';
	masMaterias.innerHTML = '';
	bInicio.style.display = "none";
	//bVolver.style.display = "none";
	//bMasMaterias.style.display = "none";
	//bMenosMaterias.style.display = "none";
	resultados.insertAdjacentHTML('beforeend', htmlContent);
	//document.getElementById("todo").addEventListener("click", mostrarTodo, false);
}

function vistaMaterias() {
		htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
  	resultados.insertAdjacentHTML('beforeend', htmlContent);
  	resultados.addEventListener("click", mostrarResultados, false);
  	document.documentElement.scrollTop = 0;
  	if (datosMaterias.tipo !== "cdu" || datosMaterias.tipo == "materias") {
  		bMasMaterias.style.display = "none";
  		bMenosMaterias.style.display = "none";
  	}
  	bInicio.style.display = "inline-block";
  	bInicio.addEventListener("click", inicio, false);
  	console.log(datosMaterias);
}

function vistaResultados(libros) {
  resultados.innerHTML = '';
  document.documentElement.scrollTop = 0;
  bMasMaterias.style.display = "none";
  bMenosMaterias.style.display = "none";
  bVolver.style.display = "inline-block";
  bVolver.addEventListener("click", volver, false);
    if(typeof libros !== 'undefined' && libros.length > 0) {
    var htmlContent = '';
    
    htmlContent = '<p>'+libros.length+' libros sobre '+  +'</p><ul>' + libros.map(libro =>
			plantillaLibro(libro)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes ¿pocas novedades sobre esa materia?... cchs_adquisiciones.tnt<span class="correo">FrañldifaDF</span>@cchs.csic.es</div>';
      }
  resultados.insertAdjacentHTML('beforeend', htmlContent); 
} 
function volver () {
	bVolver.style.display = "none";
	bMasMaterias.style.display = "none";
  bMenosMaterias.style.display = "none";
	htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
	resultados.insertAdjacentHTML('beforeend', htmlContent);
  resultados.addEventListener("click", mostrarResultados, false);
}

export { vistaMaterias, vistaInicio, vistaResultados};
