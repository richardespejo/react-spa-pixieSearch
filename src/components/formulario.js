import React , { useState } from 'react';
import Error from './error.js';

const Formulario = ({guardarBusqueda}) => {

    const [ termino , guardarTermino ] = useState(''); 
    const [ error , guardarError ] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        guardarBusqueda(termino);

    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        name="termino"
                        className="form-control form-contro-lg"
                        placeholder="Busca una imagen, ejemplo: futbol"
                        onChange={ e => guardarTermino(e.target.value)} 
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-success btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Debe Agregar un termino de Busqueda"/> : null}
        </form>
     );
}
 
export default Formulario;