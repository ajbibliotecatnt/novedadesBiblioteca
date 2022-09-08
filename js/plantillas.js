import { mostrarResultados, mostrarMaterias, mostrarTodo, volver, inicio} from './utiles.js';
const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
// https://covers.openlibrary.org/b/lccn/
// https://images-na.ssl-images-amazon.com/images/P/
const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'
import { materias, novedades} from '../app.js';
var htmlContent = "";
var htmlNMat = "";
var htmlCamino = "";

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
	}
	else {
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
	
function TemplateMenuMateria (materias, mat) {
	masMaterias.innerHTML = '';
	return (
	
	`<ul class="menu">
  	<li class="dropdown">
    	<a href="javascript:void(0)" class="dropbtn" onclick="drop()">Materias</a>
    		<div class="dropdown-content" id="myDropdown">`
    		+ materias.map(materia =>
    		`<a id="${materia.nu}" name="${materia.no}" data-tipo="menuD" href="#">${materia.no}</a>`).join('')+
    		`</div>
  		</li>
		</ul>`)
}

function plantillaMateria (listadoMaterias, campo) {
	resultados.innerHTML = '';
	masMaterias.innerHTML = '';
	camino.innerHTML = '';
	document.getElementById("myDropdown").classList.remove("show");
	if (listadoMaterias.sub) {
	
		return (
		 `<ul><p>Materias de ${listadoMaterias.no}:</p>`
		 
		 + listadoMaterias.sub.map (materia =>
		`<li class="article" id="${materia.nu}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
		 `</ul>` +
		 plantillaBotonMasMaterias(listadoMaterias.sub[0].nu));

		 } else
	{

		
		var fijo = `<ul><p>${listadoMaterias[0].campoB}:</p>`
		 + listadoMaterias.map (materia =>
		`<li class="article" id="${materia.no}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
		 `</ul>`;
		 	if (listadoMaterias[0].campoB == "materias") {
		 		fijo = fijo + plantillaBotonMenosMaterias(listadoMaterias[0].num);
		 }
		 return (fijo);
		 
	}

}

function plantillaBotonInicio (m) {
	masMaterias.innerHTML = '';
	htmlCamino =  '<button id="inicio" class="button" data-tipo="inicio" type="button">Inicio</button>'
	camino.insertAdjacentHTML('beforeend', htmlNMat);
  camino.addEventListener("click", inicio, false);
}

function plantillaBotonMasMaterias (m) {
	masMaterias.innerHTML = '';
	htmlNMat =  '<button id="'+m+'" class="button" data-tipo="mMaterias" type="button">+ Materias</button>'
	masMaterias.insertAdjacentHTML('beforeend', htmlNMat);
  	masMaterias.addEventListener("click", mostrarMaterias, false);
}

function plantillaBotonMenosMaterias (m) {
	masMaterias.innerHTML = '';
	htmlNMat =  '<button id="'+m+'" class="button" data-tipo="menuD" type="button">- Materias</button>'
	masMaterias.insertAdjacentHTML('beforeend', htmlNMat);
  	masMaterias.addEventListener("click", mostrarMaterias, false);
}

function plantillaBotonVolver (a, m) {
	camino.innerHTML = '';
	htmlCamino = `<button id="eso" class="button" type="button">Volver</button>`;
	camino.insertAdjacentHTML('beforeend', htmlCamino);
	var boton = document.getElementById("eso");
	boton.addEventListener("click", volver.bind(null, a, m), false);
}

function plantillaInicio (n) {
	return (
	`<div class="mensaje">${n.numero} nuevos documentos en el mes de ${n.mes}. Selecciona una materia del menú superior</div>
   	<button id="todo" class="button" name="boton" type="button">Ver todo</button>
    <button id="revistas" class="button" name="boton" type="button">Ver revistas</button>
    <button id="electronico" class="button" name="boton" type="button">Ver electrónico</button>`);
}

export { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaBotonMasMaterias, plantillaBotonVolver, plantillaInicio, plantillaBotonInicio};
