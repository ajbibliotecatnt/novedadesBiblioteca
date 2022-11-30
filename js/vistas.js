import { plantillaLibro, plantillaMenuMateria, plantillaMateria, plantillaInicio, plantillaFiltro} from './plantillas.js';
import { mostrarResultados, mostrarMaterias, datosMaterias, datosLibros, filtroActivo, filtrar, limpiarFiltro} from './controlador.js';
import { materias, novedades} from '../app.js';

let htmlContent = "";
let htmlNav = "";

export let bMasMaterias = document.querySelector("div#masMaterias .button[name='mas']");
export let bMenosMaterias = document.querySelector("div#masMaterias .button[name='menos']");


function vistaInicio(n) {
	if (n.target) {n = novedades[0];};
	htmlContent = plantillaInicio(n);
	resultados.innerHTML = '';
	listaFiltro.innerHTML = '';
	contenedorFiltro.style.display = "none";
	if (typeof(bFiltro) !== 'undefined') {
		bFiltro.style.display = "none";
	}
	
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
	listaFiltro.innerHTML = '';
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

function vistaResultados(t, documentos=datosLibros.lLibros) {
	
  resultados.innerHTML = '';
  //listaFiltro.innerHTML = '';
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
  //let documentos = datosLibros.lLibros;
  let suf = 's';
  let encabezamiento = `${documentos.length} título${documentos.length !== 1 ? suf : ''} (${datosLibros.titulo}):`;
  if(typeof documentos !== 'undefined' && documentos.length > 0) {
    var htmlContent = '';
    if (t != "listado"){
  		bFiltro.style.display = "inline-block";
  		bFiltro.addEventListener("click", mostrarFiltro, false);
  		bFiltrar.addEventListener("click", filtrar, false);
    }
    htmlContent = '<p class="cabecera">'+ encabezamiento +'</p><ul>' + documentos.map(documento =>
			plantillaLibro(documento)
			).join('')+'</ul>';
  } else {
    var htmlContent = '';
    //bFiltro.style.display = "none";
    vistaMensaje(`Ningún documento adquirido sobre esa materia en este mes. ¿Pocas novedades sobre ${datosLibros.titulo}?... cchs_adquisiciones.tnt<code>@</code>cchs.csic.es`);  
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

function vistaMensaje (m) {
	resultados.insertAdjacentHTML('beforeend', `<p class="mensaje">${m}</p>`);
}

function vistaVolver () {
	bFiltro.style.display = "none";
	bVolver.style.display = "none";
	contenedorFiltro.style.display = "none";
	listaFiltro.innerHTML = '';
	//limpiarFiltro();
	vistaMaterias();
}

function mostrarFiltro () {
	
	//listaFiltro.innerHTML = '';
	document.documentElement.scrollTop = 0;
	let f;

	f = f || plantillaFiltro(filtroActivo);

	const listaFiltros = document.getElementById('FiltroTipos');
	if (listaFiltros === null) {
		listaFiltro.insertAdjacentHTML('beforeend', f);
	}
	
	if (contenedorFiltro.style.display !== "none") {
        contenedorFiltro.style.display = "none";
      } else {
        contenedorFiltro.style.display = "flex";
      };
  
}


export { vistaMaterias, vistaInicio, vistaResultados, vistaMenu, vistaMensaje};
