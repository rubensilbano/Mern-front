// ESTE OBJETO VA A TENER CODIGO RELACIONADO A LOS ITEMS DE TIPO Video, DE FORMA INDIVIDUAL.
// SOSPECHO QUE QUIERE CARGAR POR SEPARADO CADA VIDEO DE LA LISTA, A FIN DE PRESENTARLOS.
import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import {useNavigate} from "react-router-dom"
import * as videoService from "./VideoService"

// REGULARMENTE NO SE IMPORTA UN CSS EN UN MODULO TSX, PERO CON REACT NO SOLO ES POSIBLE SINO NECESARIO
import "./VideoItem.css";

interface Props {
  video: Video;
  // AGREGADA LA IMPLEMENTACION DE LA FUNCION loadVideos. AQUI NO RETORNA NADA, PERO SE PODRA USAR EL LLAMADO.
  loadVideos: () => void;
}

// ESTA FUNCION ANONIMA SOLO RECIBE UN OBJETO Props(QUE ES LA RESPUESTA QUE REACT RECIBE POR DEFECTO)
// POR ESO SE DEBE CREAR LA INTERFACE Props, AHI SE DECLARA QUE TIENE UN ATRIBUTO DE TIPO Video,
// DEL MISMO TIPO QUE LA INTERFAZ Video.ts
// PARA ASI ACCEDER A .title, Y TAMBIEN A CUALQUIER ATRIBUTO DE LA INTERFAZ Video.ts
// LA FUNCION ANONIMA DE videoItem, RECIBE COMO PROP LA FUNCION loadVideos.
const VideoItem = ({ video, loadVideos }: Props) => {
  const navigate = useNavigate();
  // handDelete VA A REALIZAR EL LLAMADO AL SERVICIO deleteVideo.
			// SE INTERVINO LA EJECUCION CON ESTA FUNCION,
      // PARA PERMITIR AGREGAR UN BOTON DE CONFIRMACION ANTES DE PROCEDER A BORRAR EL REGISTRO.
      // DE OTRO MODO TRAS HACER CLICK EN EL SPAN PODRIA LLAMARSE DIRECTAMENTE AL SERVICIO deleteVideo.
  const handleDelete = async (id: String) => {
    await videoService.deleteVideo(id);
    // CUANDO LA FUNCION handleDelete BORRA UN REGISTRO, TAMBIEN EJECUTA LA FUNCION loadVideos
      // ES LA MISMA FUNCION DEL VideoList.tsx, USADA PARA MOSTRAR EL LISTADO COMPLETO DE VIDEOS.
    loadVideos();
  }
  return (
    // SIGNIFICA QUE HABRA 3 VIDEOS POR COLUMNA, TAMBIEN DIJO POR FILA.
    // 	AL HABER SOLO 8 REGISTROS, INTUYO QUE SE TRATA DE 3 COLUMNAS, PERO NO ESTOY SEGURO.
    // TAMPOCO ENTENDI PORQUE EL NUMERO ES 4, SIENDO QUE REPRESENTA 3 COLUMNAS
    <div className="col-md-4">
      {/* APLICA ESTILO DE TARJETAS INDIVIDUALES
        EL ESTILO CSS INCRUSTADO, DEBE IR ENTRE DOBLES {{}}
          PORQUE ES CODIGO JS QUE DEBE INTERPRETARSE DENTRO DE UN ELEMENTO HTML, Y POR SER UN OBJETO JSON */}
      <div
      className="card card-body video-card"
      style={{ cursor: "pointer" }}
      >
        {/* ES UNA CLASE DE BOOTSTRAP, PARA LOS DISPLAY FLEXBOX */}
        <div className="d-flex justify-content-between">
          {/* SE PUEDE USAR video CORRECTAMENTE, GRACIAS A LA INTERFAZ Props */}
          <h1
          // EVENTO CLICK DECLARADO EN LA CLASE TARJETAS.
          // EN ESTE CASO ABRE EL FORMULARIO NUEVO VIDEO, ENVIANDO SOLO EL ID DE VIDEO.
          // CON ESO EL FORMULARIO PODRA GUARDAR LOS NUEVOS ATRIBUTOS AL REGISTRO EXISTENTE.
            // EL EVENTO onClick SE MOVIO AQUI PARA QUE SOLO SE EJECUTE EN EL TITULO, NO EN TODA LA CARD
          onClick={()=> navigate(`/update/${video._id}`)}
          >{video.title}</h1>
          {/* ESTE EVENTO onClick, YA NO ES INTERRUMPIDO POR EL ANTERIOR, PARA MODIFICAR VIDEO
            LA FUNCION ANONIMA DENTRO DEL onClick, ES UNA SUERTE DE IF.
            SI video.id EXISTE, ENTONCES EJECUTARA handleDelete, YA QUE video.id FUE DECLARADO COMO OPCIONAL. */}
          <span className="text-danger" onClick={()=> video._id && handleDelete(video._id)}>
            X
          </span>
        </div>
        <p>{video.description}</p>
        {/* embed-responsive  ES UNA CLASE DE BOOTSTRAP PARA AJUSTAR LOS CONTENIDOS, DENTRO DE LAS TARJETAS
            AUN ASI QUEDAN LAS MINIATURAS RECORTADAS Y CENTRADAS. PUEDE QUE ESE SEA EL MEJOR ESCENARIO. */}
        <div className="embed-responsive embed-responsive-16by9">
          {/* USANDO EL REACT PLAYER, PARA MOSTRAR LA URL DEL VIDEO ACTUAL.
            AL PROBAR SE VEN MINIATURAS DE LOS VIDEOS, PERO ESTAS SOBRESALEN AL TAMAÑO DE LAS TARJETAS */}
          <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
