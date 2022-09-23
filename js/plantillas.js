import { mostrarResultados, mostrarMaterias,} from './utiles.js';
import { vistaMaterias, vistaInicio, vistaResultados, bMasMaterias, bMenosMaterias} from './vistas.js';
const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
// https://covers.openlibrary.org/b/lccn/
// https://images-na.ssl-images-amazon.com/images/P/
const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'

function plantillaLibro (libro) {

	if (libro.holding[0].mat != "Issue") {
		return (
		`<li class="article">
			<img src="${portadas}${libro.isbn}" width="80" height="110">
			<h2><a href=${url}${libro.iep}${context} target="_blank">${libro.titulo}</a></h2>
			<p>${libro.autor}</p>
			<p><b>Edición: </b>${libro.lugar} ${libro.editor}, ${libro.fecha}</p>
				<ul>`+ libro.holding.map(eje =>
				`<li><p><b>${eje.col}</b> | <b>${eje.sig}</b> | <b>${eje.des}</b></p></li>`).join('')+
				'</ul>'+'</li>');
	} else {
	 	return (
		`<li class="article">
			<img src="../images/${libro.id}" width="80" height="110">
			<h2><a href=${url}${libro.iep}${context} target="_blank">${libro.titulo}</a></h2>
			<p>${libro.autor}</p>
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
	if (listadoMaterias.sub) {
		bMasMaterias.setAttribute("id",listadoMaterias.sub[0].nu);
		masMaterias.addEventListener("click", mostrarMaterias, false);
		
		return (
		 `<ul><p>Materias de ${listadoMaterias.no}:</p>`
		 
		 + listadoMaterias.sub.map (materia =>
		`<li class="article" id="${materia.nu}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
		 `</ul>`);

		 } else {
		 	bMenosMaterias.setAttribute("id",listadoMaterias[0].num);
		
			return (
				`<ul><p>${listadoMaterias[0].campoB}:</p>`
		 			+ listadoMaterias.map (materia =>
					`<li class="article" id="${materia.no}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
		 		`</ul>`);
		 }
}

function plantillaInicio (n) {
	return (
	`<div class="mensaje">${n.numero} nuevos documentos en el mes de ${n.mes}:</div>
		
   	<button id="Book" class="button" name="boton" type="button">Ver ${n.numero} libros</button>
    <button id="Issue" class="button" name="boton" type="button">Ver revistas</button>
    <button id="Digital" class="button" name="boton" type="button">Ver electrónico</button>
    <p>o selecciona una materia del menú superior</p>`);
}


export { plantillaLibro, plantillaMenuMateria, plantillaMateria, plantillaInicio};
