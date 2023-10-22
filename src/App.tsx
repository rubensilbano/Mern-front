import React from 'react';
import ReactDOM from "react-dom";
import {ToastContainer} from "react-toastify"
import './App.css';
// import logo from './logo.svg';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ShowBookList from './components/Videos/Prueba';
import VideoList from './components/Videos/VideoList';
import VideoForm from './components/Videos/VideoForm';
// FALTA IMPLEMENTAR ESTOS COMPONENTES
import Navbar from './components/Navbar/Navbar';

// AGREGANDO ESTILOS AL MENSAJE TOASTIFY.
// AL AGREGAR UN NUEVO VIDEO, DEBERIA APARECER UN CUADRO VERDE CON UNA BARRA DE DURACION, NOTIFICANDO QUE SE CREO EXITOSAMENTE EL NUEVO REGISTRO.
import 'react-toastify/dist/ReactToastify.css'
// bootswatch   EN ESTE CASO EL MODELO ELEGIDO FUE "PULSE".
import 'bootswatch/dist/pulse/bootstrap.min.css'
// SE MOVIO EL IMPORT INDEX.CSS
import './index.css';

function App() {
  return (
    <BrowserRouter>

      {/* SE DEBE IMPLEMENTAR EL ELEMENTO NAVBAR DESDE EL index.
      PARA QUE LAS DEMAS PAGINAS PUEDAN ACCEDER AL MISMO ELEMENTO.
      AL ESCRIBIR LA SENTENCIA DE ETIQUETADO, EL ARCHIVO SE IMPORTA AUTOMATICAMENTE. */}
      <Navbar/>
      {/* SOLO SE CREO ESTE DIV PARA CENTRAR Switch CON LA className container
              EN react-router-dom v6 LA BIBLIOTECA Switch FUE REEMPLAZADA POR Routes
          p-4 AGREGA UN PADDING DE 4 A TODOS LOS COMPONENTES */}
      {/* DESCOMENTAR ESTO JUNTO CON LA IMPLEMENTACION DE LA NAVBAR, Y TAMBIEN ELIMINAR LA DIV DE ABAJO
        ESTA DEBE REEMPLAZARLA */}
      <div className="container p-4"></div>

      <div>
        <Routes>
          {/* ASI ESTABA DECLARADO EN EL EJEMPLO SIN TYPESCRIPT
            USARLO COMO EJEMPLO PARA ENRUTAR, Y DESPUES ELIMINAR */}
          {/* <Route path='/create-book' element={<CreateBook />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} /> */}

          {/* exact   DECLARA QUE LA RUTA DEBE ESPECIFICAMENTE SER "/", DE OTRO MODO INTERPRETA QUE 
              CUALQUIER RUTA QUE INCLUYA "/" AL INICIO, CUMPLE CON ESTA RUTA */}
          {/* <Route exact path="/" component={VideoList} />
              ESTE ERA EL VIEJO METODO, CAMBIO EN LA V6, YA NO SE NECESITA EL COMANDO exact,
              AHORA TODAS LAS RUTAS SON EXACTAS POR DEFECTO.
              PARA DECLARAR RUTAS AMBIGUAS SE AGREGA UN * AL FINAL: <Route path="users/*"> */}
          <Route path='/' element={<VideoList/>} />
          <Route path='/new-video' element={<VideoForm/>} />
          <Route path='/update/:id' element={<VideoForm/>} />
        </Routes>
        {/* SIRVE PARA CREAR MENSAJES DE RESPUESTA EN EL FRONTEND.
        POR AHORA SE AGREGA PERO NO SE VERA HASTA QUE RECIBA LA ORDEN DE MOSTRARSE EN VideoForm.tsx */}
        <ToastContainer/>
      </div>
    </BrowserRouter>

    // ESTO VINO EN LA PLANTILLA
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
