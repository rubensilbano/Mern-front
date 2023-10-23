// BOOTSTRAP TIENE UNA REGLA: TODO container DEBE ESTAR SEGUIDO DE UN row, Y DENTRO DE ESTE DEBE HABER COLUMNAS.
// 	YA QUE index.tsx TIENE UN container, AHORA DEBE CREARSE UN row.
import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {Video} from "./Video";
import * as videoService from "./VideoService"
import {toast} from "react-toastify"
// useHistory FUE REEMPLAZADO EN V6 POR useNavigate
import {useNavigate, useParams} from "react-router-dom"
// import { type } from "@testing-library/user-event/dist/type";
  // NO RECUERDO QUE FUNCION CUMPLIA

// MOVIO LA DECLARACION DE TIPOS, A UNA VARIABLE InputChange.
//   DIJO QUE ESTO SOLO ESTA PERMITIDO EN TYPESCRIPT, NO EN JS.
type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

// INTERFACE Params, CREADA UNICAMENTE PARA MANEJAR EL .id
// interface Params {
// TUVE QUE USAR type PORQUE NO FUNCIONA LA SENTENCIA interface
type Params = {
  id: string;
}

const VideoForm = () => {
  // NAVIGATE ES UN MODULO DE REACT ROUTER DOM, Y ESTE ANOTA LAS PAGINAS VISITADAS PARA REGRESAR.
  //   VA A SERVIR PARA PODER VOLVER AL LISTADO, TRAS AGREGAR UN NUEVO VIDEO/REGISTRO
  const navigate = useNavigate();
  // ASIGNA EL .id DE LA INTERFAZ Params A LA VARIABLE params.

  // useParams GUARDA EN FORMATO CLAVE VALOR, LOS PROPS ENVIADOS A LA DIRECCION
  const params = useParams<Params>();
  console.log("EJECUTANDO USEPARAMS")
  console.log(params)

  // ALTERNATIVA PARA REINICIAR LOS INPUT, SIN VOLVER A LA PAGINA INICIAL.
  const initialState = {
    url: "",
    description: "",
    title: "",
  }
  // ESTE useState ES PARA GUARDAR UNA INSTANCIA DE VIDEO.
	// AQUI MARCARA ERROR, HASTA COMPLETAR LOS CAMPOS. SE DEBE ELEGIR CUALES SON REQUERIDOS DE CARA AL FRONTEND.
  const [video, setVideo] = useState<Video>(initialState)

  // e ES UN EVENTO
  // any INDICA QUE PUEDE RECIBIR CUALQUIER TIPO DE VALOR
  // setVideo ES LA FUNCION DECLARADA EN EL useState
  // handleInputChange OBTIENE EL VALOR DEL PRIMER INPUT, Y LO ASIGNA EN LA VARIABLE video
    // COMO EL ULTIMO INPUT NO ES TEXT, SINO AREA. SE ESPECIFICA QUE PUEDA RECIBIR AMBOS TIPOS DE INPUT HTML
  const handleInputChange = (e: InputChange)=> {
    // ...video	SIGNIFICA QUE SE HARA UNA COPIA AL OBJETO video
    // ESTO DEBIDO A QUE CADA INPUT MODIFICA UN ATRIBUTO POR SEPARADO,
    // DE OTRO MODO SOLO SE GUARDARIA EL ULTIMO ATRIBUTO MODIFICADO.

    // ESTO ESPECIFICA QUE, COMO CADA ATRIBUTO name DE LOS INPUT, CONTIENE EL NOMBRE DEL ATRIBUTO DE LA CLASE video
		// ES ESE MISMO VALOR EL QUE INDICA EL ATRIBUTO QUE VA A ASIGNARSE EN LA EJECUCION DEL EVENTO DE CADA INPUT, MEDIANTE handleInputChange
    setVideo({...video, [e.target.name]: e.target.value})
  }

  // SEGUN DIJO, SE ELIGIO UN EVENTO FormEvent, PORQUE ASI LO PEDIA EL EVENTO onSubmit EN EL form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
    // PRIMERO CANCELA LOS ELEMENTOS POR DEFECTO
      // PARA DESPUES MOSTRAR EN CONSOLA, LOS VALORES INGRESADOS POR EL USUARIO.
    e.preventDefault();

    // ANTES DE EJECUTAR EL BOTON SUBMIT, EVALUA SI EL .id ESTA VACIO O NO.
		// 	SI ESTA VACIO, CREA UN NUEVO REGISTRO TAL COMO ESTABA PLANEADO.
		// 	EN CAMBIO SI TIENE UN STRING,
      // ENTONCES LLAMA A LA FUNCION updateVideo PARA MODIFICAR EL REGISTRO EXISTENTE
    if (!params.id) {
      // LLAMA A LA RUTA createVideo, PARA ENVIAR EL OBJETO video AL BACKEND CON UNA PETICION POST.
      await videoService.createVideo(video);
      // AQUI SE EJECUTA LA ETIQUETA ToastContainer DEL index.tsx
      toast.success("Nuevo video agregado");
      // REINICIA LOS INPUT A SU ESTADO INICIAL
        // ESTO SOLO APLICA PARA LOS VALORES DEL useState, LOS INPUT CONSERVAN SUS VALORES POR SEPARADO.
      setVideo(initialState);
    } else {
      await videoService.updateVideo(params.id, video);
    }

    // LLAMA A navigate DICIENDOLE QUE EL ROUTER REGRESE A LA DIRECCION INICIAL, ANTES DE MOSTRAR EL MENSAJE.
      // NO ME QUEDO CLARO SI EL MENSAJE TOASTIFY ES EL ENLACE PARA REGRESAR, O REGRESA AUTOMATICAMENTE ANTES DE MOSTRAR EL MENSAJE TOASTIFY
    navigate('/');
  };

  // FUNCION getVideo. OBTIENE EL OBJETO VIDEO, CON EL .id OBTENIDO.
  // AHORA AL OBTENER LOS DATOS DEL BACKEND, MUESTRA EL REGISTRO DE ESE VIDEO EXISTENTE EN EL FORMULARIO UPDATE.
  // ESTO CON EL FIN DE MODIFICAR UN ATRIBUTO DEL REGISTRO EN LUGAR DE TODOS
  const getVideo = async (id: String) => {
    const res = await videoService.getVideo(id);
    const {title, description, url} = res.data;
    setVideo({title, description, url})
  }

  // SI params.id NO ESTA VACIO, ENTONCES LLAMA A LA NUEVA FUNCION getVideo
  // DEBIDO AL , []) ESTA FUNCION SOLO SE LLAMA UNA VEZ CON CADA SUBMIT.
  useEffect(() => {
    if (params.id) getVideo(params.id);
  })
  // PUEDE SER LA CAUSA DEL FALLO
  // }, [])

  return (
    <div className="row">
      {/* DIJO QUE ES UNA COLUMNA DE 4, Y UN ESPACIADO DE 4 */}
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>Nuevo Video</h3>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Escriba un titulo para este video"
                  className="form-control"
                  // onChange ES UNA VARIABLE RESERVADA AL OBJETO e DE TIPO ChangeEvent<HTMLInputElement>
                  // CUANDO SE MODIFIQUE EL CONTENIDO DEL INPUT, SE LLAMARA A LA FUNCION handleInputChange
                  onChange={handleInputChange}
                  // PARA REINICIAR EL VALOR DEL INPUT, SIMPLEMENTE ASIGNO EL VALOR DEL useState EL CUAL YA FUE REINICIADO
                  value={video.title}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="http://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Escriba una descripcion"
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>

              {
                // CONSULTA SI params.id EXISTE. DEPENDIENDO DE ESO, MUESTRA UN BOTON O EL OTRO.
                params.id ?
                <button className="btn btn-info">Modificar Video</button>
                :
                <button className="btn btn-primary">Crear Video</button>
              }

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
