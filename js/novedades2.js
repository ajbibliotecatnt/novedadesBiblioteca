(function () {
		'use strict';
    
    const url = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=34CSIC_ALMA_DS';
    const context = '&context=L&vid=34CSIC_VU1&search_scope=CAT_BIB_scope&tab=default_tab&lang=es_ES';
    const portadas = 'http://cobertes.csuc.cat/cobertes.php?institucio=CSIC&isbn='
    const autorP = 'https://csic-primo.hosted.exlibrisgroup.com/primo-explore/search?query=creator,exact,'
    const autorF = ',AND&tab=default_tab&search_scope=default_scope&sortby=rank&vid=34CSIC_VU1&lang=es_ES&mode=advanced&offset=0'
    const resultados = document.querySelector('#resultados');
    const menu = document.querySelector('#prueba');
    const filtro = document.querySelector('#filtro');
    var htmlNav = ""
    var novedades = ""
    var htmlFil = ""
    
    //Template **************************************
    
    function TemplateArticulo (libro) {

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
    //******************************************


    //var htmlContent = '';
    //resultados.insertAdjacentHTML('beforeend', htmlContent);

    fetch('./datos/materias.json')
    .then(response => response.json())
    .then(materias => {
        
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
        .then(json => {const mes= json.mes; 
        				const numero = json.numero; 
        				var htmlContent = '';
            			htmlContent = `<div class="mensaje">${numero} nuevos documentos en el mes de ${mes}. Selecciona una materia del menú superior</div>`;
            			resultados.insertAdjacentHTML('beforeend', htmlContent);
        				  novedades = Object.entries(json.libros)});
	}
	
	function buscarLibros (cri, novedades) {
		var busqueda = []
		console.log(cri)
		console.log(novedades)
		let re = new RegExp(cri);
		for (let n in novedades) {
			for (let c in novedades[n][1].cdu){
				if (re.test(novedades[n][1].cdu[c])) {
					busqueda.push(novedades[n][1])
					break
				}
			}
		}
	return busqueda
	}
	
	
	function getFiltro(l){
			const datosFiltro = [{'tipo': 'materias', 'datos': []}, 
    										 {'tipo': 'personas', 'datos': []},
    										 {'tipo': 'lugares', 'datos': []},
    										 {'tipo': 'periodos', 'datos': []},
    										 {'tipo': 'obras', 'datos': []},
    										 {'tipo': 'instituciones', 'datos': []}
    										 ]
			datosFiltro.map(filtro => {
			console.log(filtro)
			let f = filtro.tipo;
			l.map(libro => {
				libro[f].map(dato => {
				console.log(dato)
				filtro.datos.push(dato)
				})
			})
		filtro.datos = filtro.datos.sort()
		filtro.datos = Array.from(new Set(filtro.datos))
		})
	return datosFiltro
	}

	
    function mostrarResultados(e) {
    if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {

		menu.innerHTML = '';
		//filtro.innerHTML = '';
		//datosFiltro.map(objFiltro => objFiltro.datos.length = 0); //vacia el array de datos

		menu.insertAdjacentHTML('afterbegin', htmlNav);
        let mat = e.target.id;
        let co = e.target.name;
        resultados.innerHTML = '';
		const libros = buscarLibros(mat, novedades)
		console.log(libros)
		const listaFiltro = getFiltro(libros)
		console.log(listaFiltro)

 
        if(typeof libros !== 'undefined' && libros.length > 0) {
            var htmlContent = '';
            htmlContent = '<ul>' + libros.map(libro =>
						TemplateArticulo(libro)
						).join('')+'</ul>';
						
        
        htmlFil = '<div class="topnav" id="myTopnav">' + listaFiltro.map(filtro => 
                    `<div class="dropdown"><button class="dropbtn">${filtro.tipo}<i class="fa fa-caret-down"></i></button>
                        <div class="dropdown-content">` + filtro.datos.map(dato =>
                            `<a id="${dato}" name="${dato}" href="#">${dato}</a>`).join('')+
                        '</div></div>' 
                    ).join('')+'<a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="myFunction()">&#9776;</a></div>';
        filtro.insertAdjacentHTML('afterbegin', htmlFil); 
        filtro.addEventListener("click", mostrarResultados, false);                               
        } else {
            var htmlContent = '';
            htmlContent = '<div class="mensaje">Ningún libro adquirido sobre esa materia en este mes</div>';
        }
        resultados.insertAdjacentHTML('beforeend', htmlContent);       
        }
     e.stopPropagation();
    }
})();
