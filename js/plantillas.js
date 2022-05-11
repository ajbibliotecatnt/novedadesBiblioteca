const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
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
	
function TemplateMenu (menu, sub, bus) {
	
	return (
		`<div class="dropdown"><button class="dropbtn">${materia.no}<i class="fa fa-caret-down"></i></button>
   	<div class="dropdown-content">` + materia.sub.map(sub =>
    	`<a id="${sub.nu}" name="${sub.co}" href="#">${sub.no}</a>`).join('')+'</div></div>'
                .join('')+'<a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a></div>');	
}

function TemplateMenuMateria (materias) {
	console.log(materias);
	return (
	
	`<ul class="menu">
  	<li class="dropdown">
    	<a href="javascript:void(0)" class="dropbtn" onclick="drop()">Materias</a>
    		<div class="dropdown-content" id="myDropdown">`
    		+ materias.map(materia =>
    		`<a id="${materia.nu}" name="${materia.no}" href="#">${materia.no}</a>`).join('')+
    		`</div>
  		</li>
		</ul>`)
}

function plantillaMateria (materia) {
	console.log(materia.no);
	console.log(materia.nu);
	resultados.innerHTML = '';
	document.getElementById("myDropdown").classList.remove("show");
	return (
		`<li class="article" id="${materia.nu}">
		<name="${materia.no}" href="#">${materia.no}</li>`
	);
}

function plantillaNuevaMateria (nmateria) {
	resultados.innerHTML = '';
	document.getElementById("myDropdown").classList.remove("show");
	return (
		`<li class="article" id="${nmateria}">
		<name="${nmateria}" href="#">${nmateria}</li>`
	);
}

export { plantillaLibro, TemplateMenuMateria, plantillaMateria, plantillaNuevaMateria };
