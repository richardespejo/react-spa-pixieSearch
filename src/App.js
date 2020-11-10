import React , { useState , useEffect } from 'react';
import Formulario from './components/formulario.js'
import ListadoImagenes from './components/listadoImagenes.js'

function App() {

  const [ busqueda , guardarBusqueda ] = useState('');
  const [ imagenes , guardarImagenes ] = useState([]);
  const [ paginaActual , guardarPaginaActual ] = useState(1);
  const [ totalPaginas , guardarTotalPaginas ] = useState(1);


  useEffect( () => {
    const consultarApi = async() => {
      if(busqueda === '') return;

      const imagenesPaginas = 20;
      const apiKey = '17225110-54cfc909e3f02557aece78380';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenesPaginas}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPaginas);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }

    consultarApi();


  },[busqueda ,paginaActual])

  //definiendo la paginacion
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0 ) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaSiguiente = paginaActual + 1;
    if(nuevaPaginaSiguiente > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaSiguiente);
  }

  return (
    <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Formulario
            guardarBusqueda={guardarBusqueda}
          />
        </div>

        <div className="row justify-content-center">
          <ListadoImagenes imagenes={imagenes} />

          { (paginaActual === 1) ? null : (
            <button type="button" className="bbtn btn-info mr-1" onClick={paginaAnterior} >&laquo; Anterior</button>
          )}

          { (paginaActual === totalPaginas) ? null : (
            <button type="button" className="bbtn btn-info" onClick={paginaSiguiente} >Siguiente &raquo;</button>
          )}

        </div>
    </div>
  );
}

export default App;
