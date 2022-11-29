import { mostrarResultados, mostrarMaterias, datosMaterias} from './controlador.js';
import { vistaMaterias, vistaInicio, vistaResultados, bMasMaterias, bMenosMaterias, vistaMensaje} from './vistas.js';
const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
const portadas2 = 'https://covers.openlibrary.org/b/isbn/'
const portadas3 = 'https://images-na.ssl-images-amazon.com/images/P/'
const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'

function plantillaLibro (libro) {

	if(libro.autor !== '') {
  	let autorU = encodeURI(libro.autor);
    libro.autorUrl = `<b>Autor: </b>${libro.autor} <a href=${autorP}${autorU}${autorF} target="_blank">(+)</a>`
  } else {libro.autorUrl= ''}
	
	if (libro.holding[0].mat != "Issue") {
		if (libro.isbn == '') {
    	libro.isbn = "9781111111111"
    }
		return (
		`<li class="article">
			<div class="portada"><img src="${portadas}${libro.isbn}"></div>
			<div class="registro"><h2><a href=${url}${libro.iep}${context} target="_blank">${libro.titulo}</a></h2>
			<p>${libro.autorUrl}</p>
			<p><b>Edición: </b>${libro.lugar} ${libro.editor}, ${libro.fecha}</p>
				<ul>`+ libro.holding.map(eje =>
				`<li><p><b>${eje.col}</b> | <b>${eje.sig}</b> | <b>${eje.des}</b></p></li>`).join('')+
				'</ul>'+'</li>');
	} else {
	 	return (
		`<li class="article">
			<div class="portada"><img src="./images/000/${libro.id}"></div>
			<div class="registro"><h2><a href=${url}${libro.iep}${context} target="_blank">${libro.titulo}</a></h2>
			<p>${libro.autorUrl}</p>
			<p><b>Edición: </b>${libro.lugar} ${libro.editor}, ${libro.fecha}</p>
				<ul>`+ libro.holding.map(eje =>
  			`<li><p><b>${eje.col}</b> | <b>${eje.sig}</b> | <b>${eje.des}</b></p></li>`).join('')+
			'</ul>'+'</li>');
	}
}  

function plantillaMenuMateria (materias, mat) {
	return (
	
	`<ul class="menu">
  	<li class="dropdown">
    	<a href="javascript:void(0)" class="dropbtn" onclick="drop()">Materias</a>
    		<div class="dropdown-content" id="myDropdown">`
    		+ materias.map((materia, index) => 
    			`<a id="${materia.nu}" name="${materia.no}" data-tipo="menuD" href="#">${materia.no}</a>`   			
    			).join('')+
    		`</div>
  		</li>
		</ul>`)
}

function plantillaMateria (listadoMaterias, campo) {
	resultados.innerHTML = '';
	document.getElementById("myDropdown").classList.remove("show");
	if (typeof listadoMaterias == "object" && listadoMaterias.length !== 0) {
		if (listadoMaterias.sub) {
			bMasMaterias.setAttribute("id",listadoMaterias.sub[0].nu);
			masMaterias.addEventListener("click", mostrarMaterias, false);
			return (
			 `<ul><p>${datosMaterias.titulo}:</p>`
		 			+ listadoMaterias.sub.map (materia =>
				`<li class="article" id="${materia.nu}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
			 `</ul>`);
			 } else {
			 	bMenosMaterias.setAttribute("id", listadoMaterias[0].num);
				return (
					`<ul><p>${datosMaterias.titulo}:</p>`
		 				+ listadoMaterias.map (materia =>
						`<li class="article" id="${materia.no}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		     	 `).join('')+
		 			`</ul>`);
			 }
		} else {     

    	return(`<p class="mensaje">No hay nada por ese criterio</p>`);
    }
}

function plantillaFiltro (f) {
	return (
		`<form id="FiltroTipos">`
				+ f.map((filtro, index) => 
    			`<label class="filtro">
        		<input class="check" type="checkbox" value="${filtro.va}"/>${filtro.la} (${filtro.num})</label>`
       		).join('')+
		`</form>`
	)
}

function plantillaInicio (n) {
	return (
	`<div class="mensaje">
			<p>${n.numeroL + n.numeroD + n.numeroR} nuevos títulos en el mes de ${n.mes}:</p>
			<div class="botoneria">
   			<button id="Book" class="button" name="boton" type="button">Ver ${n.numeroL} libros impresos</button>
    		<button id="Issue" class="button" name="boton" type="button">Ver ${n.numeroR} revistas</button>
    		<button id="Digital" class="button" name="boton" type="button">Ver ${n.numeroD} libros digitales</button>
    	</div>
    	<p>o selecciona una materia del menú superior</p>
    </div>`);
}

export { plantillaLibro, plantillaMenuMateria, plantillaMateria, plantillaInicio, plantillaFiltro};
