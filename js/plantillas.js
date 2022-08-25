import { mostrarResultados, mostrarMaterias} from './utiles.js';
const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'

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
	console.log(materias);
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

function plantillaMateria (arra, res) {
	resultados.innerHTML = '';
	masMaterias.innerHTML = '';
	camino.innerHTML = '';
	document.getElementById("myDropdown").classList.remove("show");
	console.log(arra);
	console.log(res);
	if (arra[0].nu) {
		htmlContent =
		 `<ul>`
		 + arra.map (libro =>
		`<li class="article" id="${libro.nu}" name="cdu" data-tipo="menu" href="#">${libro.no}</li>
		      `).join('')+
		 `</ul>`
		 plantillaBotonMasMaterias(arra[0].nu);

		 } else
	{
		htmlContent = 
		`<ul>`
		 + arra.map (libro =>
		`<li class="article" id="${libro}" name="${res}" data-tipo="menu" href="#">${libro}</li>
		      `).join('')+
		 `</ul>`;
		 if (res == "materias") {
		 	//plantillaBotonCamino(arra, res);
		 }
		 
	}
	resultados.insertAdjacentHTML('beforeend', htmlContent);
  	resultados.addEventListener("click", mostrarResultados, false);
  	resultados.myParam = res;
  	resultados.arr = arra;
}

function plantillaBotonMasMaterias (m) {
	masMaterias.innerHTML = '';
	htmlNMat =  '<button id="'+m+'" name="prueba" data-tipo="mMaterias" type="button">+ Materias</button>'
	masMaterias.insertAdjacentHTML('beforeend', htmlNMat);
  	masMaterias.addEventListener("click", mostrarMaterias, false);
}

function plantillaBotonCamino (a, m) {
	console.log(a, m);
	camino.innerHTML = '';
	htmlCamino = `<button id="eso" name="boton" type="button">Volver</button>`;
	camino.insertAdjacentHTML('beforeend', htmlCamino);
	var boton = document.getElementById("eso");
	boton.addEventListener("click", plantillaMateria.bind(null, a, m), false);
	console.log(boton);
}

export { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaBotonMasMaterias, plantillaBotonCamino};
