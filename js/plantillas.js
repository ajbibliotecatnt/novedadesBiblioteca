import { mostrarResultados, mostrarMaterias, mostrarTodo, volver, inicio} from './utiles.js';
const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
// https://covers.openlibrary.org/b/lccn/
// https://images-na.ssl-images-amazon.com/images/P/
const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'
import { materias, novedades} from '../app.js';

export let bMasMaterias = document.querySelector("div#masMateriasMas .button[name='mas']");
export let bMenosMaterias = document.querySelector("div#masMateriasMas .button[name='menos']");


// Vistas

function vistaInicio(htmlContent) {
	resultados.innerHTML = '';
	masMaterias.innerHTML = '';
	bInicio.style.display = "none";
	bVolver.style.display = "none";
	bMasMaterias.style.display = "none";
	bMenosMaterias.style.display = "none";
	resultados.insertAdjacentHTML('beforeend', htmlContent);
	document.getElementById("todo").addEventListener("click", mostrarTodo, false);
}

function vistaMaterias(htmlContent) {
  	resultados.insertAdjacentHTML('beforeend', htmlContent);
  	resultados.addEventListener("click", mostrarResultados, false);
  	bInicio.style.display = "inline-block";
  	bInicio.addEventListener("click", inicio, false);
}

function vistaResultados(htmlContent) {
  resultados.innerHTML = '';
  bMasMaterias.style.display = "none";
  bMenosMaterias.style.display = "none";
  bVolver.style.display = "inline-block";
  bVolver.addEventListener("click", volver, false);
  resultados.insertAdjacentHTML('beforeend', htmlContent);  

}

// -----------------------

// Plantillas

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
	bMenosMaterias.style.display = "none";
	bMasMaterias.style.display = "none";
	document.getElementById("myDropdown").classList.remove("show");
	if (listadoMaterias.sub) {
		console.log('hola');
		bMasMaterias.style.display = "inline-block";
		bMasMaterias.setAttribute("id",listadoMaterias.sub[0].nu);
		masMateriasMas.addEventListener("click", mostrarMaterias, false);
		
		return (
		 `<ul><p>Materias de ${listadoMaterias.no}:</p>`
		 
		 + listadoMaterias.sub.map (materia =>
		`<li class="article" id="${materia.nu}" name="${materia.campoB}" data-tipo="menu" href="#">${materia.no}</li>
		      `).join('')+
		 `</ul>`);

		 } else
	{
		bMenosMaterias.style.display = "inline-block";
		bMenosMaterias.setAttribute("id",listadoMaterias[0].num);
		//masMateriasMas.addEventListener("click", mostrarMaterias, false);
		
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
	`<div class="mensaje">${n.numero} nuevos documentos en el mes de ${n.mes}. Selecciona una materia del menú superior</div>
   	<button id="todo" class="button" name="boton" type="button">Ver${n.numero} todo</button>
    <button id="revistas" class="button" name="boton" type="button">Ver revistas</button>
    <button id="electronico" class="button" name="boton" type="button">Ver electrónico</button>`);
}


export { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaInicio, vistaMaterias, vistaInicio, vistaResultados};
