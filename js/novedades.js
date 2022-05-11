(function () {
    
    const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
    const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
    const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
    const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
    const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'
    const resultados = document.querySelector('#resultados');
    const menu = document.querySelector('#prueba');

    //var htmlContent = '';
    //resultados.insertAdjacentHTML('beforeend', htmlContent);

    fetch('./datos/materias.json')
    .then(response => response.json())
    .then(materias => {
        htmlNav = ""
        htmlNav = '<div class="topnav" id="myTopnav">' + materias.map(materia => 
                    `<div class="dropdown"><button class="dropbtn">${materia.no}<i class="fa fa-caret-down"></i></button>
                        <div class="dropdown-content">` + materia.sub.map(sub =>
                            `<a id="${sub.nu}" name="${sub.co}" href="#">${sub.no}</a>`).join('')+
                        '</div></div>'
                    ).join('')+'<a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a></div>';
		getDatos()
        menu.insertAdjacentHTML('afterbegin', htmlNav);
        menu.addEventListener("click", mostrarResultados, false);

    });


	
	function getDatos () {
	    fetch("./datos/datos.json" , {cache: "no-store"})
        .then(response => response.json())
        .then(json => {mes= json.mes; 
        				numero = json.numero; 
        				var htmlContent = '';
            			htmlContent = `<div class="mensaje">${numero} nuevos documentos en el mes de ${mes}. Selecciona una materia del menú superior</div>`;
            			resultados.insertAdjacentHTML('beforeend', htmlContent);
        				novedades = Object.entries(json.libros)});
	}
	
	function buscarLibros (cri, novedades) {
		var busqueda = []
		console.log(cri)
		let re = new RegExp(cri);
		for (n in novedades) {
			for (c in novedades[n][1].cdu){
				if (re.test(novedades[n][1].cdu[c])) {
					busqueda.push(novedades[n][1])
					break
				}
			}
		}
	return busqueda	
	}

	
    function mostrarResultados(e) {
    if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {

		menu.innerHTML = '';
		menu.insertAdjacentHTML('afterbegin', htmlNav);
        let mat = e.target.id;
        let co = e.target.name;
        resultados.innerHTML = '';
		const libros = buscarLibros(mat, novedades)
		console.log(libros)
 
        if(typeof libros !== 'undefined' && libros.length > 0) {
            var htmlContent = '';
            htmlContent = '<ul>' + libros.map(libro => 
                            `<li class="article">
                                <img src="${portadas}${libro.isbn}" width="80" height="110">
                                  <h2>
                                    <a href=${url}${libro.iep}${context} target="_blank">${libro.titulo}</a></h2>
                                    <p>${libro.autor}</p>
                                    <p><b>Edición: </b>${libro.lugar} ${libro.editor}, ${libro.fecha}</p>
                                        <ul>`+ libro.holding.map(eje =>
                                        `<li><p><b>${eje.col}</b> | <b>${eje.sig}</b> | <b>${eje.des}</b></p></li>`).join('')+
                                        '</ul>'+'</li>').join('')+'</ul>';
        } else {
            var htmlContent = '';
            htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes</div>';
        }
        resultados.insertAdjacentHTML('beforeend', htmlContent);       
        }
     e.stopPropagation();
    }
})();
