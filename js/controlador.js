import { vistaMaterias, vistaInicio, vistaResultados} from './vistas.js';
import { materias, novedades} from '../app.js';

let datosMaterias = {};
let datosLibros = {};
const datosFiltroTipos = [{"va":"Book", "la":"Libros", "num":0}, {"va":"Pamphlet", "la":"Folletos", "num":0}, {"va":"Issue", "la":"Revistas", "num":0}, {"va":"Digital", "la":"Digital", "num":0} ]
let filtroActivo = [];

function mostrarMaterias (e) {

  if (e.target !== e.currentTarget && e.target.id !=='' && e.target.id !=='myTopnav') {
  	let tit = e.target.getAttribute('data-tipo');
  	let mat = e.target.id;
  	let resultado = materias[0].find( m => m.nu === mat );
  	datosMaterias.titulo = resultado.no;
  	if (tit != "menuD") {
  		let grupo = buscarLibros(mat, "cdu");
  		datosMaterias.lMaterias = buscarMaterias(datosLibros.lLibros, "materias", mat);
  		datosMaterias.tipo = "materias";
  		datosMaterias.botones ="menos";		
		  	} else {
  		if (resultado.sub) {
  			datosMaterias.lMaterias = resultado;
  			datosMaterias.tipo = resultado.sub[0].campoB
  			datosMaterias.botones = "mas";
  		} else {
  			datosMaterias.lMaterias = buscarMaterias(novedades[0].libros, mat, "0");
  			datosMaterias.tipo = resultado.campoB;
  			datosMaterias.botones = "ninguno"
  		}
  	} 
		vistaMaterias();
  }
	e.stopPropagation();
}

function buscarMaterias (arr, mat, num) {
	let nMateria = [];
	let obj
	arr.map(libro => {
  	libro[mat].map(dato => {
      if (!nMateria.find(e => e.no === dato)) {
        nMateria.push({"no":dato, "campoB":mat, "num":num})
        }
    })
  })
	/* Ordena alfabéticamente el listado de materias */
  nMateria  = nMateria.sort((a, b) => a.no.localeCompare(b.no));
  return nMateria;
}

function mostrarResultados(e) {

	


	if (e.target.id == "Book" || e.target.id == "Issue" || e.target.id == "Digital") {
		
		let documentos = [];

		if (e.target.id == "Issue") {
			datosLibros.titulo = "revista";
			novedades[0].libros.map(n => {
			if (n.holding[0].mat == e.target.id) {
				documentos.push(n)
			}
		});
		} else if (e.target.id == "Digital") {
			datosLibros.titulo = "digital";
			novedades[0].libros.map(n => {
			if (n.holding[0].mat == e.target.id) {
				documentos.push(n)
			}
		});
		} else {
			datosLibros.titulo = "impreso";
			novedades[0].libros.map(n => {
			if (n.holding[0].mat !== "Issue" && n.holding[0].mat !== "Digital") {
				documentos.push(n)
			}
		});
	}
		datosLibros.lLibros = documentos;
		vistaResultados("listado");
	}
  if (e.target !== e.currentTarget && e.target.id !=='') {
  	let mat = e.target.id;
  	datosLibros.lLibros = buscarLibros(mat, datosMaterias.tipo);
  	datosLibros.titulo = e.target.textContent;
		vistaResultados("busqueda");
		filtroActivo = [];
		for (let d in datosFiltroTipos) {
  		filtroActivo.push(Object.assign({}, datosFiltroTipos[d]))
		}
		datosLibros.lLibros.map(l => {
			l.holding.map(h => {
				filtroActivo.find(m => {
					if (m.va === h.mat) {m.num = m.num + 1}
				})
			})
		})
	filtroActivo = filtroActivo.filter(f => f.num !== 0);   
  }
   e.stopPropagation();
}

function buscarLibros (cri, fil) {

	let busqueda = []
	/* "Escapa" los paréntesis de las palabras de las búsquedas con letras para que funcionen correctamente*/
	if (/\W/.test(cri)) {
		cri = cri.replace(/(?=[() ])/g, '\\');
	}
	if (/^\d/.test(cri)) {
		cri = `^${cri}|:${cri}`;
	}
	let reg = new RegExp(cri);
	for (let n in novedades[0].libros) {
		for (let c in novedades[0].libros[n][fil]){
			if (reg.test(novedades[0].libros[n][fil][c])) {
				busqueda.push(novedades[0].libros[n])
			}
		}
	}
	/* Elimina los registros que se han recuperado más de una vez en la búsqueda */
	busqueda = busqueda.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id
  ))
	)
	/* Ordena alfabéticamente el listado de búsqueda */
	busqueda = busqueda.sort((a, b) => a.titulo.localeCompare(b.titulo));
	datosLibros.lLibros = busqueda;
	return busqueda
}

function filtrar() {

	let seleccionados = [];
	let datosFiltro = [];
	
	//contenedorFiltro.style.display = "none";
  var cheks = FiltroTipos.getElementsByTagName("input");

  for (var i = 0; i < cheks.length; i++) {
      if (cheks[i].checked) {
          seleccionados.push(cheks[i].value);
      }
  }

  datosLibros.lLibros.map(n => {
		if (seleccionados.includes(n.holding[0].mat)) {
			datosFiltro.push(n)
		}
	}
);
		/* Elimina los registros que se han recuperado más de una vez en la búsqueda */
	datosFiltro = datosFiltro.filter((value, index, self) =>
		index === self.findIndex((t) => (
  		t.id === value.id
			)
		)
	)
	vistaResultados("filtro", datosFiltro);
	datosFiltro = [];
	seleccionados = [];
        
};

function limpiarFiltro() {
	filtroActivo.length = 0
}

export { mostrarMaterias, mostrarResultados, datosMaterias, datosLibros, filtroActivo, filtrar, limpiarFiltro};
