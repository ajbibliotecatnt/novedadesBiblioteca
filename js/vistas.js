import { plantillaLibro, plantillaMenuMateria, plantillaMateria, plantillaInicio} from './plantillas.js';
import { mostrarResultados, mostrarMaterias, datosMaterias, datosLibros} from './utiles.js';
import { materias, novedades} from '../app.js';

let htmlContent = "";
let htmlNav = "";

export let bMasMaterias = document.querySelector("div#masMaterias .button[name='mas']");
export let bMenosMaterias = document.querySelector("div#masMaterias .button[name='menos']");


function vistaInicio(n) {
	if (n.target) {n = novedades[0];};
	htmlContent = plantillaInicio(n);
	console.log(datosLibros);
	resultados.innerHTML = '';
	bInicio.style.display = "none";
	bVolver.style.display = "none";
	bMasMaterias.style.display = "none";
	bMenosMaterias.style.display = "none";
	resultados.insertAdjacentHTML('beforeend', htmlContent);
	let bTodoLibros = document.getElementById("Book");
	let bTodoRevistas = document.getElementById("Issue");
	let bTodoDigital = document.getElementById("Digital");
	const botones = [bTodoLibros, bTodoRevistas, bTodoDigital];
	botones.map(b => {
		b.style.display = "inline-block";
		b.addEventListener("click", mostrarResultados, false);
	});
}

function vistaMaterias() {
	
	document.documentElement.scrollTop = 0;
	htmlContent = plantillaMateria(datosMaterias.lMaterias, datosMaterias.tipo);
	resultados.insertAdjacentHTML('beforeend', htmlContent);
	resultados.addEventListener("click", mostrarResultados, false);

	if (datosMaterias.botones == "mas") {
		bMenosMaterias.style.display = "none"
		bMasMaterias.style.display = "inline-block";
	} else if (datosMaterias.botones == "menos") {
		bMasMaterias.style.display = "none"
		bMenosMaterias.style.display = "inline-block"
	} else {
	  bMasMaterias.style.display = "none"
		bMenosMaterias.style.display = "none"
	}
	
	bInicio.style.display = "inline-block";
	bInicio.addEventListener("click", vistaInicio, false);
}

function vistaResultados(t) {
  resultados.innerHTML = '';
  document.documentElement.scrollTop = 0;
  bMasMaterias.style.display = "none";
  bMenosMaterias.style.display = "none";
  if (t == "listado") {
  	bInicio.style.display = "inline-block";
		bInicio.addEventListener("click", vistaInicio, false);
  } else {
  	bVolver.style.display = "inline-block";
  	bVolver.addEventListener("click", vistaVolver, false);
  }
  let documentos = datosLibros.lLibros;
  if(typeof documentos !== 'undefined' && documentos.length > 0) {
    var htmlContent = '';
    
    htmlContent = '<p>'+documentos.length+' libros sobre '+  +'</p><ul>' + documentos.map(documento =>
			plantillaLibro(documento)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    vistaMensaje();
    //htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes ¿pocas novedades sobre esa materia?... cchs_adquisiciones.tnt<span class="correo">FrañldifaDF</span>@cchs.csic.es</div>';
      }
  resultados.insertAdjacentHTML('beforeend', htmlContent);
}

function vistaMenu (m) {
	  htmlNav = plantillaMenuMateria(materias[0]);
		menu.insertAdjacentHTML('afterbegin', htmlNav);
		const lineaMenu = document.createElement("hr");
		lineaMenu.setAttribute('id','linea');
		const menuList = document.getElementById('myDropdown');
		menuList.insertBefore(lineaMenu, menuList.children[9]);
		
  	menu.addEventListener("click", mostrarMaterias, false);

}

function vistaMensaje () {
	resultados.insertAdjacentHTML('beforeend', `<p class="network-warning">Uff, algo no ha ido bien.</p>`);
}
function vistaVolver () {
	bVolver.style.display = "none";
	vistaMaterias()
}

export { vistaMaterias, vistaInicio, vistaResultados, vistaMenu, vistaMensaje};
